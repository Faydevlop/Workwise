import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { data } from 'autoprefixer';
import axios from 'axios';

// Admin registration
export const registerAuth = createAsyncThunk(
  'admin/register',
  async (userData,{rejectWithValue} ) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/signup`, userData);
      console.log('response data is here', response);
      return response.data;
      
    } catch (error) {
      if(error.response && error.response.data){
        return rejectWithValue(error.response.data)
      }else{
        return rejectWithValue({ message: 'An error occurred' })
      } 
    }
  }
);
// Admin Login
export const LoginAuth = createAsyncThunk(
  'admin/login',
  async (userDate ,{rejectWithValue})=>{
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/login`,userDate)
      return response.data
      
    } catch (error) {
      if(error.response && error.response.data){
        return rejectWithValue(error.response.data)
      }else{
        return rejectWithValue({message:'An error occured'})
      }
      
    }
    
  }
)

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    admin: null,
    loading: false,
    error: null, 
    isAuthenticated :false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'An error occurred';
      })
      .addCase(LoginAuth.pending,(state)=>{
        state.loading = true
      })
      .addCase(LoginAuth.fulfilled,(state,action)=>{
        state.loading = false
        state.admin = action.payload
        state.isAuthenticated = true;
      })
      .addCase(LoginAuth.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload.message || 'An error occurred'
      })
  },
});

export const authadmin = adminAuthSlice.reducer;
