import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import { authadmin } from '../features/adminAuthSlice';
import { employeeAuth } from '../features/employeeAuth';
import { managerAuth } from '../features/managerAuth';
import { hrAuth } from '../features/hrAuthSlice';

// Define the persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'employeeAuth', 'managerAuth', 'hrAuth'] // Make sure this matches the key in rootReducer
};

// Combine your reducers into one root reducer
const rootReducer = combineReducers({
    auth: authadmin,
    employeeAuth,
    managerAuth,
    hrAuth
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false // Disable serializable check for redux-persist
        })
});

export const persistor = persistStore(store);
export default store;
