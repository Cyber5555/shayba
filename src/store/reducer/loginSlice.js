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
    builder
      .addCase(loginRequest.pending, (state) => {
        state.loading = true;
        state.password_error = "";
        state.phone_error = "";
      })

      .addCase(loginRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          localStorage.setItem("userToken", action.payload.token);
          state.loading = false;
          state.success = true;
        }
      })

      .addCase(loginRequest.rejected, (state, action) => {
        if (!action.payload.status) {
          if (action.payload?.message?.hasOwnProperty("phone")) {
            state.phone_error = action.payload.message.phone;
          }
          // else if (action.payload?.hasOwnProperty('message')) {
          //   console.log(action.payload.message);
          //   state.phone_error = action.payload?.message;
          // }
          if (action.payload?.message?.hasOwnProperty("password")) {
            state.password_error = action.payload?.message?.password;
          }
          if (
            !action.payload?.message.hasOwnProperty("phone") &&
            !action.payload?.message.hasOwnProperty("password")
          ) {
            state.password_error = action.payload?.message;
            state.phone_error = action.payload?.message;
          }
          state.loading = false;
        }
      });
  },
});

export default loginSlice.reducer;
