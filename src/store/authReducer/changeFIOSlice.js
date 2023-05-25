import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const changeFIORequest = createAsyncThunk(
  "change_fio",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let response = await axios(
        `${process.env.REACT_APP_API_URL}update_user_name`,
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

const changeFIOSlice = createSlice({
  name: "change_fio",
  initialState: {
    loading_fio: false,
    success_fio: false,
    name_error: "",
  },
  reducers: {
    closeSuccessModalFio(state) {
      state.success_fio = false;
      state.name_error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeFIORequest.pending, (state) => {
        state.loading_fio = true;
      })

      .addCase(changeFIORequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading_fio = false;
          state.success_fio = true;
        }
      })

      .addCase(changeFIORequest.rejected, (state, action) => {
        if (!action.payload.status) {
          if (action.payload.message?.name) {
            state.name_error = action.payload.message?.name;
          }

          state.loading_fio = false;
        }
        // localStorage.removeItem("userToken");
      });
  },
});

export default changeFIOSlice.reducer;
export const { closeSuccessModalFio } = changeFIOSlice.actions;
