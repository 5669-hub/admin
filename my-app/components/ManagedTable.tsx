"use client";

import { useRef, useState, type FormEvent } from "react";
import { Plus } from "lucide-react";

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

interface TableColumn {
  key: string;
  label: string;
}

interface FormField extends TableColumn {
  type?: "text" | "date" | "time";
  options?: string[];
}

interface ManagedTableProps {
  title: string;
  description: string;
  actionLabel: string;
  columns: TableColumn[];
  fields: FormField[];
  initialRows: Record<string, string>[];
}

export default function ManagedTable({
  title,
  description,
  actionLabel,
  columns,
  fields,
  initialRows,
}: ManagedTableProps) {
  const [rows, setRows] = useState(() =>
    initialRows.map((values, id) => ({ id, values })),
  );
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const nextId = useRef(initialRows.length);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRows((currentRows) => [
      ...currentRows,
      { id: nextId.current++, values: formValues },
    ]);
    setFormValues({});
    setDialogOpen(false);
  }

  function handleDialogOpenChange(open: boolean) {
    setDialogOpen(open);
    if (!open) {
      setFormValues({});
    }
  }

  return (
    <main className="content">
      <h1>{title}</h1>
      <p className="dashboard-subtitle">{description}</p>

      <section className="managed-table-section">
        <div className="page-header">
          <div>
            <h2>{title} directory</h2>
            <p>{rows.length} records</p>
          </div>
        </div>

        <Card className="managed-table-card">
          <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
            <div className="managed-table-toolbar">
              <DialogTrigger
                render={
                  <Button className="gap-2 bg-[#553a11] text-white shadow-sm hover:bg-[#6b4a19]" />
                }
              >
                <Plus aria-hidden="true" />
                {actionLabel}
              </DialogTrigger>
            </div>
            <DialogContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <DialogHeader>
                  <DialogTitle>{actionLabel}</DialogTitle>
                  <DialogDescription>
                    Enter the details below to add a row to the {title.toLowerCase()} table.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                  {fields.map((field) => (
                    <label key={field.key} className="grid gap-2 text-sm font-medium">
                      {field.label}
                      {field.options ? (
                        <select
                          required
                          value={formValues[field.key] ?? ""}
                          onChange={(event) =>
                            setFormValues((current) => ({
                              ...current,
                              [field.key]: event.target.value,
                            }))
                          }
                          className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm font-normal"
                        >
                          <option value="" disabled>
                            Select {field.label.toLowerCase()}
                          </option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          required
                          type={field.type ?? "text"}
                          value={formValues[field.key] ?? ""}
                          onChange={(event) =>
                            setFormValues((current) => ({
                              ...current,
                              [field.key]: event.target.value,
                            }))
                          }
                        />
                      )}
                    </label>
                  ))}
                </div>

                <DialogFooter>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Table className="managed-data-table">
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => {
                    const value = row.values[column.key];
                    const isStatus = column.key === "status";

                    return (
                      <TableCell key={column.key}>
                        {isStatus ? (
                          <span
                            className={`managed-status ${value.toLowerCase()}`}
                          >
                            {value}
                          </span>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </main>
  );
}
