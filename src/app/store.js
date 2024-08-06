import {configureStore} from '@reduxjs/toolkit'
import { authadmin  } from '../features/adminAuthSlice'
import { AdminCrud } from '../features/AdminSlice'
import { employeeAuth } from '../features/employeeAuth'

const store = configureStore({
    reducer:{
        auth:authadmin ,
        adminSlice:AdminCrud,
        employeeAuth:employeeAuth
    }
})

export default store