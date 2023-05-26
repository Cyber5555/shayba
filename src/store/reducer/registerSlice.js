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
    registerSuccess: false,
    popup_register: false,
  },
  reducers: {
    resetState(state) {
      state.name_error = "";
      state.password_error = "";
      state.password_confirmation_error = "";
      state.phone_error = "";
      state.loading = false;
      state.registerSuccess = false;
    },
    setPopupRegister(state) {
      state.popup_register = !state.popup_register;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerRequest.pending, (state) => {
        state.loading = true;
        state.name_error = "";
        state.password_error = "";
        state.password_confirmation_error = "";
        state.phone_error = "";
        state.loading = false;
        state.registerSuccess = false;
      })

      .addCase(registerRequest.fulfilled, (state, action) => {
        if (
          action.payload.message === "user creted code sended yor phone number"
        ) {
          state.loading = false;
          state.registerSuccess = true;
        }
      })

      .addCase(registerRequest.rejected, (state, action) => {
        if (!action.payload.status) {
          state.phone_error = action.payload.message.phone;
          if (action.payload.message === "Такой акаунт уже сушествует") {
            state.phone_error = action.payload.message;
          } else if (action.payload.message === "Попробуйте через минуту") {
            state.phone_error = action.payload.message;
          }
          state.name_error = action.payload.message.name;

          if (action.payload.message.password.length > 1) {
            state.password_error = action.payload.message.password[1];
          } else if (action.payload.message.password.length === 1) {
            state.password_error = action.payload.message.password[0];
          }
          state.password_confirmation_error =
            action.payload.message.password_confirmation;
          state.loading = false;
        }
      });
  },
});

export default registerSlice.reducer;
export const { resetState, setPopupRegister } = registerSlice.actions;
