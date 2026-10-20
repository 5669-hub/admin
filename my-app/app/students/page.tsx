import ManagedTable from "@/components/ManagedTable";
import students from "@/lib/studentList.json";

const columns = [
  { key: "name", label: "Name" },
  { key: "grade", label: "Grade" },
  { key: "subject", label: "Subject" },
  { key: "parentContact", label: "Parent Contact" },
];

export default function StudentsPage() {
  return (
    <ManagedTable
      title="Students"
      description="Manage all registered students."
      actionLabel="Create Student"
      columns={columns}
      fields={columns}
      initialRows={students}
    />
  );
}
