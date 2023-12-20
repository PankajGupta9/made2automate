// src/redux/checkoutSlice.js
import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    isCheckingOut: false,
  },
  reducers: {
    startCheckout: (state) => {
      state.isCheckingOut = true;
    },
    completeCheckout: (state) => {
      state.isCheckingOut = false;
    },
    clearCheckout: (state) => {
      state.isCheckingOut = false;
    },
  },
});

export const { startCheckout, completeCheckout, clearCheckout } = checkoutSlice.actions;
export const selectIsCheckingOut = (state) => state.checkout.isCheckingOut;
export default checkoutSlice.reducer;
