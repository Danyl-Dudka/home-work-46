import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  course: {
    name: "",
    description: "",
    startDate: "",
    amountOfLessons: 0,
    students: [],
  },
};

const serverUrl = "http://localhost:3000";

export const getCourse = createAsyncThunk("course/getCourse", async (id) => {
  const response = await fetch(`${serverUrl}/courses/${id}`);
  const result = await response.json();
  return result;
});
export const assignStudentToCourse = createAsyncThunk(
  "course/assignStudentToCourse",
  async ({ courseId, studentId }) => {
    const response = await fetch(`${serverUrl}/courses/assign-student/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId }),
    });
    const result = await response.json();
    return result; 
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    assignStudent: (state, action) => {
      state.course.students.push(action.payload.studentId);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCourse.fulfilled, (state, action) => {
      // console.log(action);
      state.course = { ...action.payload };
    });
    builder.addCase(assignStudentToCourse.fulfilled, (state, action) => {
      state.course = { ...action.payload };
    });
  },
});

export const {assignStudent} = courseSlice.actions;

export default courseSlice.reducer;
