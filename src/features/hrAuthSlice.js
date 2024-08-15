import {createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// request routers 

export const loginAuth = createAsyncThunk(
    'hr/login',
    async(userData,{rejectWithValue})=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/hr/login`,userData);
            const {token} = response.data;
            localStorage.setItem('token',token)
            return response.data    
        } catch (error) {
            if(error.response && error.response.data){
                return rejectWithValue(error.response.data)
            }else{
                return rejectWithValue({message:'An error occurred'})
            }
        }
    }
)



// reducers
const hrAuthSlice = createSlice({
    name:'Hrauth',
    initialState:{
        hr:null,
        loading:false,
        error:null,
        isAuthenticated:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(loginAuth.pending,(state)=>{
            state.loading = true
        })
        .addCase(loginAuth.fulfilled,(state,action)=>{
            state.loading = false;
            state.hr = action.payload;
            state.isAuthenticated = true
        })
        .addCase(loginAuth.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message || 'An error occurred'
        })
    }
})

export const hrAuth = hrAuthSlice.reducer;