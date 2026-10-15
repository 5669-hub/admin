import ManagedTable from "@/components/ManagedTable";

const columns = [
  { key: "name", label: "Name" },
  { key: "grade", label: "Grade" },
  { key: "subject", label: "Subject" },
  { key: "parentContact", label: "Parent Contact" },
];

const initialRows = [
  {
    name: "Samuel Abebe",
    grade: "Grade 8",
    subject: "Mathematics",
    parentContact: "0911 234 567",
  },
  {
    name: "Hana Tesfaye",
    grade: "Grade 6",
    subject: "English",
    parentContact: "0922 345 678",
  },
  {
    name: "Dawit Bekele",
    grade: "Grade 10",
    subject: "Physics",
    parentContact: "0933 456 789",
  },
];

export default function StudentsPage() {
  return (
    <ManagedTable
      title="Students"
      description="Manage all registered students."
      actionLabel="Create Student"
      columns={columns}
      fields={columns}
      initialRows={initialRows}
    />
  );
}
