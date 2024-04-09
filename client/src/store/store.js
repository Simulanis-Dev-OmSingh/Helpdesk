import {configureStore , combineReducers} from "@reduxjs/toolkit"
import adminReducer from './slice/adminSlice'
import userReducer from "./slice/userSlice"

const rootReducer = combineReducers({
    admin: adminReducer,
    user: userReducer
  });

  export const store = configureStore({
    reducer: rootReducer
  });


