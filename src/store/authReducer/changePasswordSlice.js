import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const changePasswordRequest = createAsyncThunk(
  "change_password",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    try {
      let response = await axios({
        url: `${process.env.REACT_APP_API_URL}add_new_password2`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const changePasswordSlice = createSlice({
  name: "change_password",
  initialState: {
    old_password_error: "",
    password_error: "",
    password_confirmation_error: "",
    loading: false,
    password_changed: false,
    success_modal_password: false,
  },
  reducers: {
    closeSuccessModalPassword(state) {
      state.success_modal_password = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordRequest.pending, (state) => {
        state.loading = true;
        state.old_password_error = "";
        state.password_error = "";
        state.password_confirmation_error = "";
        state.success_modal_password = false;
      })

      .addCase(changePasswordRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.success_modal_password = true;
        }
      })

      .addCase(changePasswordRequest.rejected, (state, action) => {
        if (action.payload.message) {
          if (action.payload.message.hasOwnProperty("old_password")) {
            state.old_password_error = action.payload.message?.old_password;
          }
          if (!action.payload?.message.hasOwnProperty("passwowd")) {
            if (action.payload.message?.password?.length > 1) {
              state.password_error = action.payload.message?.password[1];
            } else if (action.payload.message?.password?.length == 1) {
              state.password_error = action.payload.message?.password;
            } else {
              state.old_password_error = action.payload?.message;
            }
          }

          state.password_confirmation_error =
            action.payload.message?.password_confirmation;
        }
        state.loading = false;
        // localStorage.removeItem("userToken");
      });
  },
});

export default changePasswordSlice.reducer;
export const { closeSuccessModalPassword } = changePasswordSlice.actions;
