import { createSlice } from '@reduxjs/toolkit'

const initialState: { isDarkMode: string } = {
  isDarkMode: 'light'
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsDarkMode: (state, action) => {
      state.isDarkMode = action.payload
    }
  }
})

export const { setIsDarkMode } = appSlice.actions

export default appSlice.reducer
