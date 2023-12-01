import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: number
  name: string
  email: string
}
interface UserPayload {
  email: string
  name: string
}
const initialState: {
  listUser: User[]
  success: boolean
} = {
  listUser: [],
  success: false
}

export const fetchListUser = createAsyncThunk('users/fetchUser', async () => {
  try {
    const response = await fetch('http://localhost:8000/users')
    if (!response.ok) {
      throw new Error('Error fetching user data')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error during fetchListUser:', error)
    throw error // Rethrow the error to propagate it to the component.
  }
})

export const createNewUser = createAsyncThunk('users/createUser', async (payload: UserPayload, { dispatch }) => {
  try {
    const response = await fetch('http://localhost:8000/users', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        name: payload.name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (data.id) {
      dispatch(fetchListUser())
    }
    return data
  } catch (error) {
    console.error('Error during fetchListUser:', error)
    throw error // Rethrow the error to propagate it to the component.
  }
})

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    saveListUser: (state, action: PayloadAction<User[]>) => {
      state.listUser = action.payload
    },
    resetState: (state) => {
      state.success = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListUser.fulfilled, (state, action) => {
      state.listUser = action.payload
    }),
      builder.addCase(createNewUser.fulfilled, (state) => {
        state.success = true
      })
  }
})

export const { saveListUser, resetState } = userSlice.actions

export default userSlice.reducer
