import ManagedTable from "@/components/ManagedTable";

const columns = [
  { key: "name", label: "Name" },
  { key: "subject", label: "Subject" },
  { key: "experience", label: "Experience" },
  { key: "status", label: "Status" },
];

const initialRows = [
  {
    name: "Abel Mekonnen",
    subject: "Mathematics",
    experience: "4 years",
    status: "Active",
  },
  {
    name: "Meron Alemu",
    subject: "English",
    experience: "3 years",
    status: "Active",
  },
  {
    name: "Daniel Girma",
    subject: "Physics",
    experience: "5 years",
    status: "Pending",
  },
];

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
