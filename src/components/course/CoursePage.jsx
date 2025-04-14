import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getCourse, assignStudentToCourse } from "../../store/features/courseSlice";
import StudentsList from "../students/StudentsList";
import { selectAll as selectAllStudents } from "../../store/selectors/studentsSelectors";
import { getAllStudents, saveStudentAsync } from "../../store/features/studentsSlice";
import { Select, Button } from "antd";
import StudentsForm from "../students/StudentsForm";

export default function CoursePage() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const allStudents = useSelector(selectAllStudents);

  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isAddFormShown, setIsAddFormShown] = useState(false);

  useEffect(() => {
    if (courseId) {
      dispatch(getCourse(courseId));
      dispatch(getAllStudents());
    }
  }, [courseId, dispatch]);

  const handleAssignStudent = () => {
    if (selectedStudentId) {
      dispatch(assignStudentToCourse({ courseId, studentId: selectedStudentId }));
      setSelectedStudentId(null); 
    }
  };

  const handleStudentSave = (newStudent) => {
    dispatch(saveStudentAsync(newStudent)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        const savedStudent = action.payload;
        dispatch(assignStudentToCourse({ courseId, studentId: savedStudent.id }))
          .then(() => {
            dispatch(getCourse(courseId));
            dispatch(getAllStudents());
          });
      }
    });
    setIsAddFormShown(false);
  };

  const assignedStudents = course.students
    ? course.students.map((id) => allStudents.find((s) => s.id === id)).filter(Boolean)
    : [];

  const unassignedStudents = allStudents && course.students
    ? allStudents.filter((student) => !course.students.includes(student.id))
    : [];

  return (
    <div>
      <h3>CoursePage: "{course.name}"</h3>
      <p>Description: {course.description}</p>
      <p>Start date: {course.startDate}</p>

      <h4>Assigned Students:</h4>
      <StudentsList
        items={assignedStudents}
        onEdit={(id) => console.log("Edit student", id)}
        onDelete={(id) => console.log("Delete student", id)}
        showActions={false}
      />

      <h4>Assign a Student:</h4>
      <Select
        style={{ width: 200 }}
        placeholder="Select a student"
        value={selectedStudentId}
        onChange={(value) => setSelectedStudentId(value)}
        options={unassignedStudents.map((student) => ({
          value: student.id,
          label: student.fullname,
        }))}
      />
      <Button type="primary" style={{marginLeft: 20}} onClick={handleAssignStudent} disabled={!selectedStudentId}>
        Assign Student
      </Button>

      <Button type="primary" style={{marginLeft: 20}} onClick={() => setIsAddFormShown(true)}>
        Add New Student
      </Button>

      {isAddFormShown && (
        <StudentsForm
          onSave={handleStudentSave}
        />
      )}
    </div>
  );
}