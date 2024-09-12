import {createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// request routers 

export const loginAuth = createAsyncThunk(
    'manager/login',
    async(userData,{rejectWithValue})=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/manager/login`,userData);
            const {accessToken} = response.data;
            console.log('token is here',accessToken);
            
            localStorage.setItem('token',accessToken)
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
const managerAuthSlice = createSlice({
    name:'managerAuth',
    initialState:{
        manager:null,
        loading:false,
        error:null,
        isAuthenticated: !!localStorage.getItem('token')
    },
    reducers:{
        logout: (state) => {
            // Clear the localStorage token
            // localStorage.removeItem('token');
            // Reset the state to initial values
            state.manager = null;
            state.isAuthenticated = false;
            state.error = null;
            state.loading = false;
          }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginAuth.pending,(state)=>{
            state.loading = true
        })
        .addCase(loginAuth.fulfilled,(state,action)=>{
            state.loading = false;
            state.manager = action.payload;
            state.isAuthenticated = true
        })
        .addCase(loginAuth.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message || 'An error occurred'     
        })
    }
})

export const { logout } = managerAuthSlice.actions;
export const managerAuth = managerAuthSlice.reducer;