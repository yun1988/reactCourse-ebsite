import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
}


export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    cleanUser: (state) => {
      console.log ('state',state)
      state.value = null
    },
    setUserInfo: (state, action) => {
      console.log ('state',state)
      console.log ('action',action)
      state.userInfo = action.payload
    }
  },
})







export const { cleanUser, setUserInfo } = userSlice.actions
export const selectUser = (state) => state.userInfo

export default userSlice.reducer;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = (state) => state.counter.value


