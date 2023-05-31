import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../services/auth.service";

const admin = JSON.parse(sessionStorage.getItem("admin"));

export const register = createAsyncThunk(
    "adminauth/register",
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
    "adminauth/login",
    async ({ username, password }, thunkAPI) => {
      try {
        const data = await AuthService.adminLogin(username, password);
        return { user: data };
      } catch (error) {
        const message = error.response.data.toString();
        console.log(error.response.data.toString());
      thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
      }
    }
  );

  export const logout = createAsyncThunk("adminauth/logout", async () => {
    await AuthService.logout();
  });

  const initialState = admin
  ? { isLoggedIn: true, admin }
  : { isLoggedIn: false, admin: null };

  const authAdminSlice = createSlice({
    name: "adminauth",
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
        state.admin = action.payload.admin;
      },
      [login.rejected]: (state, action) => {
        state.isLoggedIn = false;
        state.admin = null;
      },
      [logout.fulfilled]: (state, action) => {
        state.isLoggedIn = false;
        state.admin = null;
      }
    },
  });
  
  const { reducer } = authAdminSlice;
  export default reducer;