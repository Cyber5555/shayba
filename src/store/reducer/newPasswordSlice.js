import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const newPasswordRequest = createAsyncThunk(
  "new_password",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}add_new_password`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const newPasswordSlice = createSlice({
  name: "new_password",
  initialState: {
    password_error: "",
    password_confirmation_error: "",
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newPasswordRequest.pending, (state) => {
        state.loading = true;
        state.password_error = "";
        state.password_confirmation_error = "";
      })

      .addCase(newPasswordRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.success = true;
        }
      })

      .addCase(newPasswordRequest.rejected, (state, action) => {
        if (!action.payload.status) {
          if (action.payload.message?.password) {
            state.password_error =
              action.payload.message?.password[1] ||
              action.payload.message?.password[0];
          }
          state.password_confirmation_error =
            action.payload.message.password_confirmation;
          state.loading = false;
        }
        // localStorage.removeItem("userToken");
      });
  },
});

export default newPasswordSlice.reducer;
