import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerRequest = createAsyncThunk(
  "register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}registration`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    name_error: "",
    password_error: "",
    password_confirmation_error: "",
    phone_error: "",
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(registerRequest.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.loading = false;
        state.success = true;
      }
    });

    builder.addCase(registerRequest.rejected, (state, action) => {
      if (!action.payload.status) {
        state.phone_error = action.payload.message.phone;
        state.name_error = action.payload.message.name;
        state.password_error = action.payload.message.password;
        state.password_confirmation_error =
          action.payload.message.password_confirmation;
        state.loading = false;
      }
    });
  },
});

export default registerSlice.reducer;
