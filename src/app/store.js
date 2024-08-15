import {configureStore} from '@reduxjs/toolkit'
import { authadmin  } from '../features/adminAuthSlice'
import { employeeAuth } from '../features/employeeAuth'
import { managerAuth } from '../features/managerAuth'
import { hrAuth } from '../features/hrAuthSlice'

const store = configureStore({
    reducer:{
        auth:authadmin ,
        employeeAuth:employeeAuth,  
        managerAuth,
        hrAuth
    }
})

export default store