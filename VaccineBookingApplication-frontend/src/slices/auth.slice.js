import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../services/auth.service";

const user = JSON.parse(sessionStorage.getItem("user"));
const admin = JSON.parse(sessionStorage.getItem("admin"));

export const register = createAsyncThunk(
    "auth/register",
    async ({ username, email, password }, thunkAPI) => {
      try {
        const response = await AuthService.register(username, email, password);
        return response.data;
      } catch (error) {
        const message = error.response.data.toString();
       thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
      }
    }
  );
  export const adminRegister = createAsyncThunk(
    "auth/adminRegister",
    async ({ username, email, password }, thunkAPI) => {
      try {
        const response = await AuthService.adminRegister(username, email, password);
        return response.data;
      } catch (error) {
        const message = error.response.data.toString();
       thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
      }
    }
  );
  export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }, thunkAPI) => {
      try {
        const data = await AuthService.login(username, password);
        return { user: data };
      } catch (error) {
        const message = error.response.data.toString();
        console.log(error.response.data.toString());
      thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
      }
    }
  );
  export const adminLogin = createAsyncThunk(
    "auth/adminLogin",
    async ({ username, password }, thunkAPI) => {
      try {
        const data = await AuthService.adminLogin(username, password);
        return { admin: data };
      } catch (error) {
        const message = error.response.data.toString();
        console.log(error.response.data.toString());
      thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
      }
    }
  );
  export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
  });

  const initialState = {
    isLoggedIn: user || admin ? true : false,
    user: user || null,
    admin: admin || null,
  };

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      [register.fulfilled]: (state, action) => {
        state.isLoggedIn = false;
      },
      [register.rejected]: (state, action) => {
        state.isLoggedIn = false;
      },
      [login.fulfilled]: (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      },
      [login.rejected]: (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      },
      [adminRegister.fulfilled]: (state, action) => {
        state.isLoggedIn = false;
      },
      [adminRegister.rejected]: (state, action) => {
        state.isLoggedIn = false;
      },
      [adminLogin.fulfilled]: (state, action) => {
        state.isLoggedIn = true;
        state.admin = action.payload.admin;
      },
      [adminLogin.rejected]: (state, action) => {
        state.isLoggedIn = false;
        state.admin = null;
      },
      [logout.fulfilled]: (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.admin = null;
      },
    },
  });
  
  const { reducer } = authSlice;
  export default reducer;