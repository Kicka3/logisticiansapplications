import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  initialState: { isAdmin: false },
  name: 'auth',
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload
    },
  },
})

// export const authReducer = slice.reducer
export const { setIsAdmin } = slice.actions
