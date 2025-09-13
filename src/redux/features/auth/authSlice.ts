import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  status: string;
  country?: string;
  profileImage?: string;
  token?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      Cookies.set("token", action.payload, { expires: 7 });
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAuthData: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      Cookies.set("token", action.payload.token, { expires: 7 });
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      Cookies.remove("token");
    },
  },
});

export const { setToken, setUser, setAuthData, logout } = authSlice.actions;
export default authSlice.reducer;
