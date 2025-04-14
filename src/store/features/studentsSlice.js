import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export const studentsAdapter = createEntityAdapter();

const initialState = studentsAdapter.getInitialState();

const serverUrl = "http://localhost:3000";

export const saveStudentAsync = createAsyncThunk(
  "students/saveStudent",
  async (data) => {
    const response = await fetch(`${serverUrl}/students/`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  }
);

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudent",
  async (data) => {
    const response = await fetch(`${serverUrl}/students/${data.id}`, {
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

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await fetch(`${serverUrl}/students/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const getAllStudents = createAsyncThunk(
  "students/getStudents",
  async () => {
    const response = await fetch(`${serverUrl}/students`);
    const result = await response.json();
    return result;
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    deleteItem: studentsAdapter.removeOne,
    addItem: studentsAdapter.addOne,
    editItem: studentsAdapter.upsertOne,
  },
  extraReducers: (builder) => {
    builder.addCase(saveStudentAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      studentsAdapter.addOne(state, action.payload);
    });
    builder.addCase(getAllStudents.fulfilled, (state, action) => {
      // console.log(action);
      studentsAdapter.addMany(state, action.payload);
    });
    builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
      studentsAdapter.removeOne(state, action.payload);
    });
    builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
      studentsAdapter.upsertOne(state, action.payload);
    });
  },
});

export const { addItem, deleteItem, editItem } = studentsSlice.actions;

export default studentsSlice.reducer;
