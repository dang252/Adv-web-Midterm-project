import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import { UserAccount } from "../../types";

// Interface declair
interface UserState {
  username: string;
  password: string;
  name: string;
  phone: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  isLoading: boolean;
}

// createAsyncThunk middleware
export const registerAccount = createAsyncThunk(
  "user/register_account",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (account: UserAccount, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          // signal: thunkAPI.signal,
          name: account.name,
          phone: account.phone,
          email: account.email,
          password: account.password,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //   if (error.name === "AxiosError") {
      //     return thunkAPI.rejectWithValue({ message: "Register account failed" });
      //   }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// InitialState value
const initialState: UserState = {
  username: "",
  password: "",
  name: "",
  phone: "",
  role: "",
  accessToken: "",
  refreshToken: "",
  isLoading: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerAccount.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerAccount.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
      }
      state.isLoading = false;
    })
    .addCase(registerAccount.rejected, (state) => {
      state.isLoading = false;
    });
});

export default userReducer;
