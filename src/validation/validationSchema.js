import * as Yup from 'yup';

export const studentSchema = Yup.object().shape({
  fullname: Yup.string().required("Fullname is required").min(3, "Fullname must be at least 3 characters"),
  city: Yup.string().required("City is required"),
});

export const courseSchema = Yup.object().shape({
  name: Yup.string().required("Course name is required").min(3, "Course name must be at least 3 characters"),
  description: Yup.string().required("Description is required").min(10, "Description must be at least 3 characters"),
  startDate: Yup.date().required("Start date is required").typeError("Invalid date format"),
})