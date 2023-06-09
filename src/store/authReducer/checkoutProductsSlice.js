import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const checkoutProductRequest = createAsyncThunk(
  "add_new_order",
  async (data, { rejectWithValue }) => {
    try {
      let token = await localStorage.getItem("userToken");
      let response = await axios(
        `${process.env.REACT_APP_API_URL}add_new_order`,
        {
          method: "post",
          headers: { Authorization: `Bearer ${token}` },
          data: data,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const checkoutProductsSlice = createSlice({
  name: "add_new_order",
  initialState: {
    loading: false,
    email_error: "",
    phone_error: "",
    order_type_error: "",
    name_error: "",
    success_message: "",
    order_is_added: false,
    empty_error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkoutProductRequest.pending, (state) => {
        state.loading = true;
        state.email_error = "";
        state.phone_error = "";
        state.order_type_error = "";
        state.name_error = "";
        state.empty_error = "";
      })
      .addCase(checkoutProductRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.success_message = action.payload.message;
          state.order_is_added = true;
          // if (window.location.pathname !== "/order-is-generated") {
          //   state.success_message = "";
          //   state.order_is_added = false;
          // }
        } else {
          state.loading = false;
          state.email_error = action.payload?.message?.email;
          state.phone_error = action.payload?.message?.phone;
          state.order_type_error = action.payload?.message?.order_type;
          state.name_error = action.payload?.message?.name;
          // state.success_message = "";
          state.order_is_added = false;
        }
      })
      .addCase(checkoutProductRequest.rejected, (state, action) => {
        state.loading = false;
        state.email_error = action.payload.message.email;
        state.phone_error = action.payload.message.phone;
        state.order_type_error = action.payload.message.order_type;
        state.name_error = action.payload.message.name;
        if (action.payload?.message == "Ваша карзина пустая") {
          state.empty_error = action.payload.message;
        }
      });
  },
});

export default checkoutProductsSlice.reducer;
