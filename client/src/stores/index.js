import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // publicKey: publicKeySlice.reducer,
    // serverSetting: serverSettingSlice.reducer,
    // user: userSlice.reducer
  }
});


// Export store
export default store; 