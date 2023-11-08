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
  isLogin: boolean;
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

export const loginAccount = createAsyncThunk(
  "user/login_account",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (account: UserAccount, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          // signal: thunkAPI.signal,
          username: account.username,
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

export const handleAccessToken = createAsyncThunk(
  "user/handle_access_token",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (_, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      if (accessToken) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          {
            // data
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        return response.data;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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
  isLogin: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerAccount.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerAccount.fulfilled, (state, action) => {
      if (action.payload) {
        // console.log("CHECK register from redux: ", action.payload);
      }
      state.isLoading = false;
    })
    .addCase(registerAccount.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(loginAccount.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginAccount.fulfilled, (state, action) => {
      if (action.payload) {
        // console.log("CHECK login from redux: ", action.payload);
        const accessToken: string = action.payload.accessToken;
        const refreshToken: string = action.payload.refreshToken;

        state.accessToken = accessToken;
        state.refreshToken = refreshToken;

        sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
        sessionStorage.setItem("refreshToken", JSON.stringify(refreshToken));
      }
      state.isLoading = false;
    })
    .addCase(loginAccount.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(handleAccessToken.fulfilled, (state, action) => {
      if (action.payload) {
        const accessToken: any = sessionStorage
          .getItem("accessToken")
          ?.toString()
          .replace(/^"(.*)"$/, "$1");

        // const refreshToken: any = sessionStorage
        //   .getItem("refreshToken")
        //   ?.toString()
        //   .replace(/^"(.*)"$/, "$1");

        state.accessToken = accessToken;
        // state.refreshToken = refreshToken;

        state.isLogin = true;
      }
    });
});

export default userReducer;
