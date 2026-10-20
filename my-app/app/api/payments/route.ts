import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

interface PaymentRecord {
  id: string;
  student: string;
  amount: number;
  dueDate: string;
  paymentDate: string | null;
  method: string;
  status: string;
}

const paymentsFilePath = join(process.cwd(), "lib", "paymentlist.json");
const paymentMethods = ["Bank transfer", "Cash", "Mobile money", "Card"];
const paymentStatuses = ["Paid", "Pending", "Overdue", "Failed"];

function isDateString(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function isPaymentRecord(value: unknown): value is PaymentRecord {
  if (typeof value !== "object" || value === null) return false;

  const record = value as Record<string, unknown>;
  return (
    typeof record.id === "string" &&
    typeof record.student === "string" &&
    typeof record.amount === "number" &&
    Number.isFinite(record.amount) &&
    isDateString(record.dueDate) &&
    (record.paymentDate === null || isDateString(record.paymentDate)) &&
    typeof record.method === "string" &&
    typeof record.status === "string" &&
    paymentStatuses.includes(record.status)
  );
}

async function readPayments(): Promise<PaymentRecord[]> {
  const contents = await readFile(paymentsFilePath, "utf8");
  const parsed: unknown = JSON.parse(contents);

  if (!Array.isArray(parsed) || !parsed.every(isPaymentRecord)) {
    throw new Error("Payment JSON must contain an array of valid payment records.");
  }

  return parsed;
}

async function writePayments(payments: PaymentRecord[]) {
  await writeFile(paymentsFilePath, `${JSON.stringify(payments, null, 2)}\n`, "utf8");
}

function getLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function GET() {
  try {
    return Response.json(await readPayments());
  } catch (error) {
    console.error("Failed to read payment records.", error);
    return Response.json(
      { error: "Could not load payment records. Check lib/paymentlist.json." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "Payment details are required." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const student = typeof input.student === "string" ? input.student.trim() : "";
  const amount = input.amount;
  const method = input.method;
  const paymentDate = input.paymentDate;

  if (!student) {
    return Response.json({ error: "Student name is required." }, { status: 400 });
  }
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    return Response.json({ error: "Amount must be greater than zero." }, { status: 400 });
  }
  if (typeof method !== "string" || !paymentMethods.includes(method)) {
    return Response.json({ error: "Choose a valid payment method." }, { status: 400 });
  }
  if (!isDateString(paymentDate)) {
    return Response.json({ error: "Choose a valid payment date." }, { status: 400 });
  }

  try {
    const payments = await readPayments();
    const nextNumber =
      payments.reduce((maximum, payment) => {
        const idNumber = Number(payment.id.match(/^PAY-(\d+)$/)?.[1] ?? 0);
        return Math.max(maximum, idNumber);
      }, 0) + 1;
    const newPayment: PaymentRecord = {
      id: `PAY-${String(nextNumber).padStart(4, "0")}`,
      student,
      amount,
      dueDate: paymentDate,
      paymentDate,
      method,
      status: "Paid",
    };

    await writePayments([newPayment, ...payments]);
    return Response.json(newPayment, { status: 201 });
  } catch (error) {
    console.error("Failed to save payment record.", error);
    return Response.json(
      { error: "Could not save payment. Check that lib/paymentlist.json is writable and valid." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "A payment ID is required." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  if (typeof input.id !== "string") {
    return Response.json({ error: "A payment ID is required." }, { status: 400 });
  }

  try {
    const payments = await readPayments();
    const paymentIndex = payments.findIndex((payment) => payment.id === input.id);

    if (paymentIndex === -1) {
      return Response.json({ error: "Payment was not found." }, { status: 404 });
    }

    const payment = payments[paymentIndex];
    if (payment.status !== "Pending" && payment.status !== "Overdue") {
      return Response.json(
        { error: "Only pending or overdue payments can be marked as paid." },
        { status: 409 },
      );
    }

    const updatedPayment = {
      ...payment,
      status: "Paid",
      paymentDate: getLocalDateString(new Date()),
    };
    payments[paymentIndex] = updatedPayment;

    await writePayments(payments);
    return Response.json(updatedPayment);
  } catch (error) {
    console.error("Failed to update payment record.", error);
    return Response.json(
      { error: "Could not update payment. Check that lib/paymentlist.json is writable and valid." },
      { status: 500 },
    );
  }
}
