import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import { JwtPayload, UserAccount } from "../../types";
import { jwtDecode } from "jwt-decode";

// Interface declair
interface UserState {
  userId: string;
  username: string;
  password: string;
  name: string;
  phone: string;
  email: string;
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
      // const decodedToken = jwtDecode(response.data.accessToken) as JwtPayload

      // const userId = decodedToken.user_id;

      // const userInfo = await axios.get(
      //   `${import.meta.env.VITE_API_URL}/user/${userId}`
      // )
      return response.data
      // return { ...response.data, ...userInfo.data, userId: userId }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //   if (error.name === "AxiosError") {
      //     return thunkAPI.rejectWithValue({ message: "Register account failed" });
      //   }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",

  async (account: UserAccount, thunkAPI) => {

    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/${account.userId}`,
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
          // withCredentials: true,
        }
      )
      return res.data
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(error)
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

export const handleRefreshToken = createAsyncThunk(
  "user/handle_refresh_token",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (_, thunkAPI) => {
    try {
      const refreshToken = sessionStorage
        .getItem("refreshToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      if (refreshToken) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {
            refreshToken: refreshToken,
          },
          // {
          //   headers: {
          //     Authorization: `Bearer ${refreshToken}`,
          //   },
          // }
        );

        return response.data;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const handleEditProfile = createAsyncThunk(
  "user/handle_edit_profile",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (account: UserAccount, thunkAPI) => {
    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      if (accessToken) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/${account.userId}`,
          {
            name: account.name,
            phone: account.phone,
            email: account.email,
          },
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );

        return response.data;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("fail edit")
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const logoutAccount = createAsyncThunk(
  "user/logoutAccount",

  async (account: UserAccount, thunkAPI) => {

    try {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");
      const refreshToken = sessionStorage
        .getItem("refreshToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout/${account.userId}`,
        {
          "refreshToken": refreshToken,
        },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
          // withCredentials: true,
        }
      )
      return res.data
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
);
// InitialState value
const initialState: UserState = {
  userId: "",
  username: "",
  password: "",
  name: "",
  phone: "",
  email: "",
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

        const decodedToken = jwtDecode(action.payload.accessToken) as JwtPayload
        state.userId = decodedToken.user_id;

        sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
        sessionStorage.setItem("refreshToken", JSON.stringify(refreshToken));

        state.isLogin = true;
      }
      state.isLoading = false;
    })
    .addCase(loginAccount.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getUserInfo.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getUserInfo.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getUserInfo.fulfilled, (state, action) => {
      if (action.payload) {
        state.username = action.payload.name;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
      }
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
    })
    .addCase(handleRefreshToken.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(handleRefreshToken.fulfilled, (state, action) => {
      if (action.payload) {
        const accessToken: string = action.payload.accessToken;
        const refreshToken: string = action.payload.refreshToken;

        state.accessToken = accessToken;
        state.refreshToken = refreshToken;

        sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
        sessionStorage.setItem("refreshToken", JSON.stringify(refreshToken));

        state.isLogin = true;
      }
      state.isLoading = false;
    })
    .addCase(handleRefreshToken.rejected, () => {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      return initialState;
    })
    .addCase(handleEditProfile.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(handleEditProfile.fulfilled, (state, action) => {
      if (action.payload) {
        const newName = action.payload.name;
        const newPhone = action.payload.phone;
        const newEmail = action.payload.email;

        state.name = newName;
        state.phone = newPhone;
        state.email = newEmail;
      }

      state.isLoading = false;
    })
    .addCase(handleEditProfile.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(logoutAccount.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(logoutAccount.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(logoutAccount.fulfilled, () => {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      return initialState;
    });
});

export default userReducer;
