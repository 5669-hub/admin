"use client";

import { useRef, useState, type FormEvent } from "react";
import { ChevronDown, ListFilter, Plus, Search } from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterColumn, setFilterColumn] = useState(
    () => columns.find((column) => column.key === "status")?.key ?? columns[0]?.key ?? "",
  );
  const [filterValue, setFilterValue] = useState("");
  const nextId = useRef(initialRows.length);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const selectedFilterColumn = columns.find(
    (column) => column.key === filterColumn,
  );
  const filterValues = Array.from(
    new Set([
      ...(fields.find((field) => field.key === filterColumn)?.options ?? []),
      ...rows.map(({ values }) => values[filterColumn]).filter(Boolean),
    ]),
  ).sort((first, second) => first.localeCompare(second));
  const filteredRows = rows.filter(({ values }) =>
    Object.values(values).some((value) =>
      value.toLowerCase().includes(normalizedSearchQuery),
    ) &&
    (!filterValue || values[filterColumn] === filterValue),
  );

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
            <p>
              {filteredRows.length}{" "}
              {filteredRows.length === 1 ? "record" : "records"}
            </p>
          </div>
        </div>

        <Card className="managed-table-card">
          <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
            <div className="managed-table-toolbar">
              <label className="managed-table-search">
                <Search aria-hidden="true" />
                <Input
                  type="search"
                  aria-label={`Search ${title.toLowerCase()}`}
                  placeholder={`Search ${title.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      className="managed-table-filter-trigger"
                    />
                  }
                >
                  <ListFilter aria-hidden="true" />
                  Filters
                  <ChevronDown aria-hidden="true" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="managed-table-filter-panel"
                >
                  <p className="managed-table-filter-heading">Filters</p>
                  {columns.length > 1 && (
                    <label className="managed-table-filter-label">
                      Filter by
                      <select
                        aria-label="Filter by column"
                        value={filterColumn}
                        onChange={(event) => {
                          setFilterColumn(event.target.value);
                          setFilterValue("");
                        }}
                      >
                        {columns.map((column) => (
                          <option key={column.key} value={column.key}>
                            {column.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                  <label className="managed-table-filter-label">
                    {selectedFilterColumn?.label ?? "Value"}
                    <select
                      aria-label={`Filter by ${selectedFilterColumn?.label.toLowerCase() ?? "value"}`}
                      value={filterValue}
                      onChange={(event) => setFilterValue(event.target.value)}
                    >
                      <option value="">All</option>
                      {filterValues.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </label>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogTrigger
                render={
                  <Button className="managed-table-create bg-[#553a11] text-white shadow-sm hover:bg-[#6b4a19]" />
                }
              >
                <Plus aria-hidden="true" />
                Create
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
              {filteredRows.map((row) => (
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
              {filteredRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No matching records.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </section>
    </main>
  );
}

