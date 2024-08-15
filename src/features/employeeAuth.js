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
  reducers: {},
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

export const employeeAuth = employeeAuthSlice.reducer;
