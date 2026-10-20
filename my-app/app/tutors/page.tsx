import ManagedTable from "@/components/ManagedTable";
import tutors from "@/lib/tutorlist.json";
const columns = [
  { key: "name", label: "Name" },
  { key: "subject", label: "Subject" },
  { key: "experience", label: "Experience" },
  { key: "status", label: "Status" },
];

const initialRows = tutors;

export default function TutorsPage() {
  return (
    <ManagedTable
      title="Tutors"
      description="Manage tutors working with Excellence Tutor."
      actionLabel="Create Tutor"
      columns={columns}
      fields={[
        ...columns.slice(0, 3),
        { key: "status", label: "Status", options: ["Active", "Pending"] },
      ]}
      initialRows={initialRows}
    />
  );
}
