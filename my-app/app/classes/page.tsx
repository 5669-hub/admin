import ManagedTable from "@/components/ManagedTable";

const columns = [
  { key: "student", label: "Student" },
  { key: "tutor", label: "Tutor" },
  { key: "subject", label: "Subject" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
];

const initialRows = [
  {
    student: "Samuel Abebe",
    tutor: "Abel Mekonnen",
    subject: "Mathematics",
    date: "Monday",
    time: "4:00 PM",
  },
  {
    student: "Hana Tesfaye",
    tutor: "Meron Alemu",
    subject: "English",
    date: "Tuesday",
    time: "5:00 PM",
  },
];

export default function ClassesPage() {
  return (
    <ManagedTable
      title="Classes"
      description="Manage scheduled tutoring classes."
      actionLabel="Create Class"
      columns={columns}
      fields={[
        { key: "student", label: "Student" },
        { key: "tutor", label: "Tutor" },
        { key: "subject", label: "Subject" },
        { key: "date", label: "Date", type: "date" },
        { key: "time", label: "Time", type: "time" },
      ]}
      initialRows={initialRows}
    />
  );
}
