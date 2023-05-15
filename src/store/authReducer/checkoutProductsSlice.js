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
    email_error: false,
    phone_error: false,
    order_type_error: false,
    name_error: false,
    success_message: "",
    order_is_added: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkoutProductRequest.pending, (state) => {
        state.loading = true;
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
      });
  },
});

export default checkoutProductsSlice.reducer;
