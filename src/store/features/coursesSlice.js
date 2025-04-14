import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export const coursesAdapter = createEntityAdapter();

const initialState = coursesAdapter.getInitialState();

const serverUrl = "http://localhost:3000";

export const saveCourseAsync = createAsyncThunk(
  "courses/saveCourse",
  async (data) => {
    const response = await fetch(`${serverUrl}/courses/`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
);

export const assignStudentToCourse = createAsyncThunk(
  "courses/assignStudentToCourse",
  async ({ courseId, studentId }) => {
    const response = await fetch(
      `${serverUrl}/courses/assign-student/${courseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId }),
      }
    );
    const result = await response.json();
    return result; // Возвращаем обновленный курс
  }
);

export const getAllCourses = createAsyncThunk(
  "courses/getCourses",
  async () => {
    const response = await fetch(`${serverUrl}/courses`);
    const result = await response.json();
    return result;
  }
);

export const deleteCourseAsync = createAsyncThunk(
  "courses/deleteCourse",
  async (id) => {
    await fetch(`${serverUrl}/courses/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const updatedCourseAsync = createAsyncThunk(
  "courses/updateCourse",
  async (data) => {
    const response = await fetch(`${serverUrl}/courses/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    deleteItem: coursesAdapter.removeOne,
    addItem: coursesAdapter.addOne,
    editItem: coursesAdapter.upsertOne,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      // console.log(action);
      coursesAdapter.addMany(state, action.payload);
    });
    builder.addCase(deleteCourseAsync.fulfilled, (state, action) => {
      coursesAdapter.removeOne(state, action.payload);
    });
    builder.addCase(updatedCourseAsync.fulfilled, (state, action) => {
      coursesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    });
    builder.addCase(assignStudentToCourse.fulfilled, (state, action) => {
      const updatedCourse = action.payload;
      state.entities[updatedCourse.id] = updatedCourse; 
    });
  },
});

export const { addItem, deleteItem, editItem } = coursesSlice.actions;

export default coursesSlice.reducer;
