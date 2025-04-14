import { Button, DatePicker, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, saveCourseAsync, updatedCourseAsync } from "../../store/features/coursesSlice";
import { selectById } from "../../store/selectors/coursesSelectors";
import { useState, useEffect } from "react";
import { yupSync } from "../../validation/yupSync";
import { courseSchema } from "../../validation/validationSchema";
import dayjs from "dayjs";

export default function CourseForm({ onSave, courseId }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [date, setDate] = useState("");

  const currentCourse = useSelector((state) => selectById(state, courseId));


  useEffect(() => {
    if (courseId && currentCourse) {
      form.setFieldValue({
        ...currentCourse,
        startDate: dayjs(currentCourse.startDate),
      });
      setDate(currentCourse.startDate);
    }
  }, [courseId, currentCourse, form]);

  const handleCourseSaveNew = (values) => {
    const newCourse = { ...values, startDate: date };
    dispatch(addItem(newCourse));
    dispatch(saveCourseAsync(newCourse));
    onSave();
  };

  const onChange = (dateObj, dateString) => {
    setDate(dateString);
  };

  const handleCourseSaveEdit = (values) => {
    const updatedCourse = {
      ...values,
      startDate: date,
      id: courseId,
    }
    dispatch(updatedCourseAsync(updatedCourse)).then(() => {
      dispatch(editItem(updatedCourse));
    onSave();
    });
  };

  return (
    <Form
    form={form}
      name="course"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={!courseId ? handleCourseSaveNew : handleCourseSaveEdit}
      autoComplete="off"
      className="course-form"
      initialValues={
        courseId && currentCourse
          ? {
              name: currentCourse.name,
              description: currentCourse.description,
              startDate:  dayjs(currentCourse.startDate),
            }
          : {}
      }
    >
      <h3>Create Course Form</h3>
      <Form.Item
        label="Name"
        name="name"
        rules={[yupSync(courseSchema, "name")]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[yupSync(courseSchema, "description")]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        label="Start date"
        name="startDate"
        rules={[yupSync(courseSchema, "startDate")]}
      >
        <DatePicker onChange={onChange} />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  );
}
