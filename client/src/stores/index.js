import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/user';

const store = configureStore({
  reducer: {
    user: userReducer
  }
});


// Export store
export default store; 