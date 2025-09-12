import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  status: string;
  country?: string;
  profileImage?: string;
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
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, clearToken, setUser } = authSlice.actions;
export default authSlice.reducer;
