import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders, updateUser, fetchLoggedInUser } from './userAPI';

const initialState = {
  status: 'idle',
  userInfo: 0,
  userLoaded: false,
  userOrderLoaded: false
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async () => {
    const response = await fetchLoggedInUserOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.userInfo.orders = action.payload;
      state.userOrderLoaded = true;
    })
    .addCase(fetchLoggedInUserOrderAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.userOrderLoaded = true;
    })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
        state.userLoaded = true;
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userLoaded = true;
      })
  },
});

export const selectUserOrders = (state)=>state.user.userInfo.orders;
export const selectUserInfo = (state)=>state.user.userInfo;
export const selectUserLoaded = (state)=>state.user.userLoaded;
export const selectUserOrderLoaded = (state)=>state.user.userOrderLoaded;

export const { increment } = userSlice.actions;

export default userSlice.reducer;