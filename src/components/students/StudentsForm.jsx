import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, saveStudentAsync, updateStudentAsync } from "../../store/features/studentsSlice";
import { selectById } from "../../store/selectors/studentsSelectors";
import { useState } from "react";
import { studentSchema } from "../../validation/validationSchema"
import { yupSync } from "../../validation/yupSync";


export default function StudentsForm({onSave, studentId}) {
  const dispatch = useDispatch();

  const currentStudent = useSelector(state => selectById(state, studentId));

  const handleStudentSaveNew = values => {
    onSave(values); 
  };

  const handleStudentSaveEdit = values => {
    onSave({ ...currentStudent, ...values, id: studentId });
  };

  return (
    <Form
      name="student"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={!studentId ? handleStudentSaveNew : handleStudentSaveEdit}
      autoComplete="off"
      className="student-form"
    >
      <h3>Create Student Form</h3>
      <Form.Item
        label="Fullname"
        name="fullname"
        initialValue={studentId && currentStudent.fullname}
        rules={[yupSync(studentSchema, "fullname")]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="City"
        name="city"
        initialValue={studentId && currentStudent.city}
        rules={[yupSync(studentSchema, "city")]}
      >
        <Select>
          <Select.Option value="Kyiv">Kyiv</Select.Option>
          <Select.Option value="Odessa">Odessa</Select.Option>
          <Select.Option value="NYC">New York</Select.Option>
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">Save</Button>
    </Form>
  )
}