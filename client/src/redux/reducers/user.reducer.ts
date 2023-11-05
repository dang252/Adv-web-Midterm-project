import { createReducer } from "@reduxjs/toolkit";

// Interface declair
interface UserState {
  username: string;
  password: string;
  name: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

// createAsyncThunk middleware

// InitialState value
const initialState: UserState = {
  username: "user1",
  password: "",
  name: "Cậu bé cô đơn",
  role: "",
  accessToken: "",
  refreshToken: "",
};

const userReducer = createReducer(initialState, (builder) => {
  builder;
});

export default userReducer;
