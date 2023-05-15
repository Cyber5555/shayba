import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const changeEmailRequest = createAsyncThunk(
  "change_email",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    try {
      let response = await axios(
        `${process.env.REACT_APP_API_URL}add_new_email`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: data,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const changeEmailSlice = createSlice({
  name: "change_email",
  initialState: {
    email_error: "",
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeEmailRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(changeEmailRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.success = true;
        }
      })

      .addCase(changeEmailRequest.rejected, (state, action) => {
        if (!action.payload.status) {
          if (action.payload.message) {
            console.log(action.payload);
            state.email_error = action.payload?.message?.email;
          }
        }
        state.loading = false;
        // localStorage.removeItem("userToken");
      });
  },
});

export default changeEmailSlice.reducer;
