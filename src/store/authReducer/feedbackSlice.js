import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const feedbackRequest = createAsyncThunk(
  "feedback",
  async (data, { rejectWithValue }) => {
    try {
      let token = await localStorage.getItem("userToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}user_feedback`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    loading: false,
    name_error: "",
    address_error: "",
    phone_error: "",
    email_error: "",
    success_feedback: false,
  },
  reducers: {
    closeSuccessModalFeedback(state) {
      state.success_feedback = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(feedbackRequest.pending, (state) => {
        state.loading = true;
        state.name_error = "";
        state.address_error = "";
        state.phone_error = "";
        state.email_error = "";
        state.success_feedback = false;
      })
      .addCase(feedbackRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.success_feedback = true;
        }
      })
      .addCase(feedbackRequest.rejected, (state, action) => {
        state.loading = false;
        state.name_error = action.payload.message?.name;
        state.address_error = action.payload.message?.address;
        state.phone_error = action.payload.message?.phone;

        if (action.payload.message?.email?.length > 1) {
          state.email_error = action.payload.message?.email[1];
        } else if (action.payload.message?.email?.length == 1) {
          state.email_error = action.payload.message?.email[0];
        }
      });
  },
});

export default feedbackSlice.reducer;
export const { closeSuccessModalFeedback } = feedbackSlice.actions;
