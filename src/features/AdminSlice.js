import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import { build } from 'vite';

// requests 

export const addNewUser = createAsyncThunk(
    'admim/usermanagement/adduser',
    async(userData)=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/adduser`,userData);
            return response.data
        } catch (error) { //add error handling
            
        }
    }
)



// reducers
const adminSlice = createSlice({
    name:adminSlice,
    initialState:{
        user:null,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addNewUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(addNewUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
          })
          .addCase(addNewUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message || 'An error occurred';
          })
    }

})

export const AdminCrud = adminSlice.reducer