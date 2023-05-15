import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const changePasswordRequest = createAsyncThunk(
  "change_password",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    console.log(data);
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordRequest.pending, (state) => {
        state.loading = true;
        state.old_password_error = "";
        state.password_error = "";
        state.password_confirmation_error = "";
      })

      .addCase(changePasswordRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.password_changed = true;
        }
      })

      .addCase(changePasswordRequest.rejected, (state, action) => {
        if (!action.payload.status) {
          if (action.payload.message) {
            state.old_password_error = action.payload.message?.old_password;
            if (action.payload.message?.password.includes("Обезателное поле")) {
              state.password_error = action.payload.message?.password[1];
            } else if (
              action.payload.message?.password.includes(
                "Поле должно состоять минимально из 6-и символов"
              )
            ) {
              state.password_error = action.payload.message?.password;
            }
            state.password_confirmation_error =
              action.payload.message?.password_confirmation;
          }
        }
        state.loading = false;
        // localStorage.removeItem("userToken");
      });
  },
});

export default changePasswordSlice.reducer;
