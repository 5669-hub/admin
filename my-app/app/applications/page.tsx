import ManagedTable from "@/components/ManagedTable";

const columns = [
  { key: "student", label: "Student" },
  { key: "subject", label: "Subject" },
  { key: "grade", label: "Grade" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];

const initialRows = [
  {
    student: "Sarah Alemu",
    subject: "Mathematics",
    grade: "Grade 8",
    status: "Pending",
    action: "Review",
  },
  {
    student: "Michael Abebe",
    subject: "Programming",
    grade: "Grade 11",
    status: "Approved",
    action: "View",
  },
];

export default function ApplicationsPage() {
  return (
    <ManagedTable
      title="Applications"
      description="Review student tutoring applications."
      actionLabel="Create Application"
      columns={columns}
      fields={[
        { key: "student", label: "Student" },
        { key: "subject", label: "Subject" },
        { key: "grade", label: "Grade" },
        {
          key: "status",
          label: "Status",
          options: ["Pending", "Approved"],
        },
        { key: "action", label: "Action" },
      ]}
      initialRows={initialRows}
    />
  );
}
