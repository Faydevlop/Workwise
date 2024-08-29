import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login authentication
export const LoginAuth = createAsyncThunk(
  'employee/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/employee/login`, userData);
      const {token} = response.data;
      localStorage.setItem('token',token)
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  }
);

// Slice for employee authentication
const employeeAuthSlice = createSlice({
  name: 'employeeAuth',
  initialState: {
    employee: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      // Clear the localStorage token
      // localStorage.removeItem('token');
      // Reset the state to initial values
      state.employee = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(LoginAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'An error occurred';
      });
  },
});

export const { logout } = employeeAuthSlice.actions;
export const employeeAuth = employeeAuthSlice.reducer;
