import StudentCard from "./StudentCard";

export default function StudentsList({ items, onEdit, onDelete, showActions = true }) {
  return (
    <div>
      {items.map((student) => (
        student && (
          <StudentCard
            key={student.id}
            {...student}
            onEdit={showActions ? onEdit : undefined}
            onDelete={showActions ? onDelete : undefined}
            showActions={showActions}
          />
        )
      ))}
    </div>
  );
}