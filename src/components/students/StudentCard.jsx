import { Button } from "antd";

export default function StudentCard({ onEdit, onDelete, showActions, ...student }) {
  return (
    <div>
      <p>{student.fullname}</p>
      {showActions && (
        <>
          <Button type="primary" onClick={() => onEdit(student.id)}>
            Edit
          </Button>
          <Button type="default" danger onClick={() => onDelete(student.id)}>
            Delete
          </Button>
        </>
      )}
    </div>
  );
}