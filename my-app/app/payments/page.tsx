"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Plus,
  Search,
  WalletCards,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Payment {
  id: string;
  student: string;
  amount: number;
  dueDate: string;
  paymentDate: string | null;
  method: string;
  status: string;
}

interface PaymentFormValues {
  student: string;
  amount: string;
  method: string;
  paymentDate: string;
}

const paymentMethods = ["Bank transfer", "Cash"];
const paymentStatuses = ["Paid", "Pending", "Overdue", "Failed"];

async function getResponseError(response: Response, fallback: string) {
  const body: unknown = await response.json().catch(() => null);
  if (
    typeof body === "object" &&
    body !== null &&
    "error" in body &&
    typeof body.error === "string"
  ) {
    return body.error;
  }

  return fallback;
}

function getLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(date: string | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function paymentStatusClass(status: string) {
  switch (status.toLowerCase()) {
    case "paid":
      return "payment-status--paid";
    case "pending":
      return "payment-status--pending";
    case "overdue":
      return "payment-status--overdue";
    case "failed":
      return "payment-status--failed";
    default:
      return "payment-status--default";
  }
}

function createEmptyForm(): PaymentFormValues {
  return {
    student: "",
    amount: "",
    method: "",
    paymentDate: getLocalDateString(new Date()),
  };
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [confirmPayment, setConfirmPayment] = useState<Payment | null>(null);
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [formValues, setFormValues] = useState<PaymentFormValues>(createEmptyForm);

  useEffect(() => {
    let cancelled = false;

    async function loadPayments() {
      try {
        const response = await fetch("/api/payments");
        if (!response.ok) {
          throw new Error(
            await getResponseError(response, "Could not load payment records."),
          );
        }

        const records: Payment[] = await response.json();
        if (!cancelled) setPayments(records);
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred while loading payments.",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadPayments();
    return () => {
      cancelled = true;
    };
  }, []);

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredPayments = useMemo(
    () =>
      payments.filter((payment) => {
        const matchesSearch = [
          payment.id,
          payment.student,
          payment.method,
        ].some((value) => value.toLowerCase().includes(normalizedSearch));
        const matchesStatus = !statusFilter || payment.status === statusFilter;
        const matchesMethod = !methodFilter || payment.method === methodFilter;
        const matchesStartDate = !dateFrom || payment.dueDate >= dateFrom;
        const matchesEndDate = !dateTo || payment.dueDate <= dateTo;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesMethod &&
          matchesStartDate &&
          matchesEndDate
        );
      }),
    [payments, normalizedSearch, statusFilter, methodFilter, dateFrom, dateTo],
  );

  const summary = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const paidPayments = payments.filter((payment) => payment.status === "Paid");

    return {
      collected: paidPayments.reduce((total, payment) => total + payment.amount, 0),
      pending: payments
        .filter((payment) => payment.status === "Pending")
        .reduce((total, payment) => total + payment.amount, 0),
      overdue: payments
        .filter((payment) => payment.status === "Overdue")
        .reduce((total, payment) => total + payment.amount, 0),
      thisMonth: paidPayments
        .filter((payment) => {
          if (!payment.paymentDate) return false;
          const paymentDate = new Date(`${payment.paymentDate}T00:00:00`);
          return (
            paymentDate.getMonth() === currentMonth &&
            paymentDate.getFullYear() === currentYear
          );
        })
        .reduce((total, payment) => total + payment.amount, 0),
      pendingCount: payments.filter((payment) => payment.status === "Pending")
        .length,
      overdueCount: payments.filter((payment) => payment.status === "Overdue")
        .length,
    };
  }, [payments]);

  async function handleCreatePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const amount = Number(formValues.amount);
    if (!formValues.student.trim()) {
      setFormError("Enter a student name.");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError("Enter an amount greater than zero.");
      return;
    }

    setFormError("");
    setIsSaving(true);
    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student: formValues.student.trim(),
          amount,
          method: formValues.method,
          paymentDate: formValues.paymentDate,
        }),
      });
      if (!response.ok) {
        throw new Error(
          await getResponseError(response, "Could not save the payment."),
        );
      }

      const newPayment: Payment = await response.json();
      setPayments((currentPayments) => [newPayment, ...currentPayments]);
      setFormValues(createEmptyForm());
      setCreateDialogOpen(false);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while saving the payment.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleMarkAsPaid() {
    if (!confirmPayment) return;

    setUpdateError("");
    setIsUpdatingPayment(true);
    try {
      const response = await fetch("/api/payments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: confirmPayment.id }),
      });
      if (!response.ok) {
        throw new Error(
          await getResponseError(response, "Could not update the payment."),
        );
      }

      const updatedPayment: Payment = await response.json();
      setPayments((currentPayments) =>
        currentPayments.map((payment) =>
          payment.id === updatedPayment.id ? updatedPayment : payment,
        ),
      );
      setConfirmPayment(null);
    } catch (error) {
      setUpdateError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while updating the payment.",
      );
    } finally {
      setIsUpdatingPayment(false);
    }
  }

  function clearFilters() {
    setSearchQuery("");
    setStatusFilter("");
    setMethodFilter("");
    setDateFrom("");
    setDateTo("");
  }

  const hasFilters =
    searchQuery !== "" ||
    statusFilter !== "" ||
    methodFilter !== "" ||
    dateFrom !== "" ||
    dateTo !== "";

  return (
    <main className="content payments-page">
      <div className="payments-page-heading">
        <div>
          <h1>Payments</h1>
          <p className="dashboard-subtitle">
            Track tutoring payments, outstanding balances, and transactions.
          </p>
        </div>

        <Dialog
          open={createDialogOpen}
          onOpenChange={(open) => {
            setCreateDialogOpen(open);
            if (open) {
              setFormError("");
            } else {
              setFormValues(createEmptyForm());
              setFormError("");
            }
          }}
        >
          <DialogTrigger
            render={
              <Button
                disabled={isLoading || isSaving}
                className="payments-create-button bg-[#553a11] text-white shadow-sm hover:bg-[#6b4a19]"
              />
            }
          >
            <Plus aria-hidden="true" />
            Record payment
          </DialogTrigger>
          <DialogContent className="payments-dialog">
            <form onSubmit={handleCreatePayment}>
              <DialogHeader>
                <DialogTitle>Record a payment</DialogTitle>
                <DialogDescription>
                  Add a completed tutoring payment to the transaction list.
                </DialogDescription>
              </DialogHeader>

              <div className="payments-form-fields">
                <label>
                  Student
                  <Input
                    required
                    value={formValues.student}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        student: event.target.value,
                      }))
                    }
                    placeholder="Enter student name"
                  />
                </label>
                <label>
                  Amount (ETB)
                  <Input
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={formValues.amount}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        amount: event.target.value,
                      }))
                    }
                    placeholder="0.00"
                  />
                </label>
                <label>
                  Payment method
                  <select
                    required
                    value={formValues.method}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        method: event.target.value,
                      }))
                    }
                  >
                    <option value="" disabled>
                      Select a method
                    </option>
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Payment date
                  <Input
                    required
                    type="date"
                    value={formValues.paymentDate}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        paymentDate: event.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              {formError && (
                <p className="payments-form-error" role="alert">
                  {formError}
                </p>
              )}

              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#553a11] text-white"
                >
                  {isSaving ? "Saving..." : "Save payment"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loadError && (
        <p className="payments-page-error" role="alert">
          {loadError}
        </p>
      )}

      <section className="payments-summary" aria-label="Payment summaries">
        <SummaryCard
          title="Total collected"
          value={formatCurrency(summary.collected)}
          detail={`${payments.filter((payment) => payment.status === "Paid").length} completed payments`}
          icon={<WalletCards aria-hidden="true" />}
          tone="brown"
        />
        <SummaryCard
          title="Pending payments"
          value={formatCurrency(summary.pending)}
          detail={`${summary.pendingCount} awaiting payment`}
          icon={<Clock3 aria-hidden="true" />}
          tone="amber"
        />
        <SummaryCard
          title="Overdue amount"
          value={formatCurrency(summary.overdue)}
          detail={`${summary.overdueCount} past due`}
          icon={<AlertCircle aria-hidden="true" />}
          tone="red"
        />
        <SummaryCard
          title="Received this month"
          value={formatCurrency(summary.thisMonth)}
          detail={new Intl.DateTimeFormat("en", {
            month: "long",
            year: "numeric",
          }).format(new Date())}
          icon={<CalendarDays aria-hidden="true" />}
          tone="green"
        />
      </section>

      <section className="payments-table-section" aria-labelledby="payments-table-title">
        <div className="payments-table-heading">
          <div>
            <h2 id="payments-table-title">Transactions</h2>
            <p>Payment history and outstanding balances</p>
          </div>
          <span className="payments-result-count">
            {filteredPayments.length}{" "}
            {filteredPayments.length === 1 ? "transaction" : "transactions"}
          </span>
        </div>

        <Card className="payments-table-card">
          <div className="payments-filters">
            <label className="payments-search">
              <Search aria-hidden="true" />
              <Input
                type="search"
                aria-label="Search payments"
                placeholder="Search student, payment ID, or method..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </label>
            <label className="payments-filter-control">
              <span>Status</span>
              <select
                aria-label="Filter by status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="">All statuses</option>
                {paymentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <label className="payments-filter-control">
              <span>Method</span>
              <select
                aria-label="Filter by payment method"
                value={methodFilter}
                onChange={(event) => setMethodFilter(event.target.value)}
              >
                <option value="">All methods</option>
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </label>
            <label className="payments-filter-control payments-date-filter">
              <span>From due date</span>
              <Input
                type="date"
                aria-label="Filter from due date"
                value={dateFrom}
                onChange={(event) => setDateFrom(event.target.value)}
              />
            </label>
            <label className="payments-filter-control payments-date-filter">
              <span>To due date</span>
              <Input
                type="date"
                aria-label="Filter to due date"
                value={dateTo}
                onChange={(event) => setDateTo(event.target.value)}
              />
            </label>
            {hasFilters && (
              <Button
                type="button"
                variant="ghost"
                className="payments-clear-filters"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            )}
          </div>

          <Table className="payments-data-table">
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due date</TableHead>
                <TableHead>Payment date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="payments-id">{payment.id}</TableCell>
                  <TableCell className="payments-student">
                    {payment.student}
                  </TableCell>
                  <TableCell className="payments-amount">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell>{formatDate(payment.dueDate)}</TableCell>
                  <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <span
                      className={`payment-status ${paymentStatusClass(payment.status)}`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {payment.status === "Pending" ||
                    payment.status === "Overdue" ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setConfirmPayment(payment)}
                      >
                        Mark paid
                      </Button>
                    ) : (
                      <span className="payments-no-action">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="payments-empty-state">
                    <CheckCircle2 aria-hidden="true" />
                    <span>
                      {isLoading
                        ? "Loading payment records..."
                        : payments.length === 0
                          ? "No payment records yet."
                        : "No payments match these filters. Try changing or clearing them."}
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </section>

      <Dialog
        open={confirmPayment !== null}
        onOpenChange={(open) => {
          if (!open) setConfirmPayment(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark payment as paid?</DialogTitle>
            <DialogDescription>
              {confirmPayment
                ? `This will mark ${confirmPayment.id} for ${confirmPayment.student} as paid and set its payment date to today.`
                : ""}
            </DialogDescription>
          </DialogHeader>
          {updateError && (
            <p className="payments-form-error" role="alert">
              {updateError}
            </p>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isUpdatingPayment}
              onClick={() => setConfirmPayment(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={isUpdatingPayment}
              className="bg-[#553a11] text-white"
              onClick={handleMarkAsPaid}
            >
              {isUpdatingPayment ? "Updating..." : "Confirm payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
  detail: string;
  icon: ReactNode;
  tone: "brown" | "amber" | "red" | "green";
}

function SummaryCard({ title, value, detail, icon, tone }: SummaryCardProps) {
  return (
    <Card className="payment-summary-card">
      <div className="payment-summary-copy">
        <p>{title}</p>
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
      <span className={`payment-summary-icon payment-summary-icon--${tone}`}>
        {icon}
      </span>
    </Card>
  );
}
