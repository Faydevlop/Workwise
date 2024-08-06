import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// requests 

export const addNewUser = createAsyncThunk(
    'admin/addUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/admin/add-user', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// reducers
const AdminSlice = createSlice({
    name: 'adminSlice',
    initialState: {
        user: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user.push(action.payload)
            })
            .addCase(addNewUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || 'An error occurred';
            });
    }
});

export const AdminCrud = AdminSlice.reducer;
