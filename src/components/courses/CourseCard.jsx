import { Button } from "antd";
import { useNavigate } from "react-router";

export default function CourseCard({ onEdit, onDelete, ...course }) {
    const navigate = useNavigate();
    const handleCourseNavigate = () => {
      navigate(`/course/${course.id}`)
    }
  return (
    <div>
      <p className="course_element" onClick={handleCourseNavigate}>{course.name}</p>
      <Button type="primary" onClick={() => onEdit(course.id)}>Edit</Button>
      <Button color="danger" onClick={() => onDelete(course.id)}>Delete</Button>
    </div>
  )
}