import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './Reducers/AuthReducer'


export const store = configureStore({
  reducer: {
     auth: AuthSlice,
  },
})      


export default store;