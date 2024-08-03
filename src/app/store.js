import {configureStore} from '@reduxjs/toolkit'
import { authadmin  } from '../features/adminAuthSlice'
import { AdminCrud } from '../features/AdminSlice'

const store = configureStore({
    reducer:{
        auth:authadmin ,
        adminSlice:AdminCrud,
    }
})

export default store