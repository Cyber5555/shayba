import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginRequest = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}login`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    password_error: "",
    phone_error: "",
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginRequest.fulfilled, (state, action) => {
      if (action.payload.status) {
        localStorage.setItem("userToken", action.payload.token);
        state.loading = false;
        state.success = true;
      }
    });

    builder.addCase(loginRequest.rejected, (state, action) => {
      if (!action.payload.status) {
        state.phone_error = action.payload.message.phone;
        state.password_error = action.payload.message.password;
        state.loading = false;
      }
    });
  },
});

export default loginSlice.reducer;
