// import { createReducer } from "@reduxjs/toolkit";



// export const cartReducer =  createReducer({

//     cartItems:[],
//     subTotal: 0,
//     shipping: 0,
//     tax: 0,
//     total: 0,
// },
// {
//     addToCart: (state, action)=> {
//         const item = action.payload;
//         const isItemExist = state.cartItems.find((i) => i.id === item.id);

//         if (isItemExist) {
//             state.cartItems.forEach((i) => {
//                 if(i.id === item.id) 
//                 i.quantity += 1;
//             });
//         } else {
//             state.cartItems.push(item);
//         }
//     },

//     decrement:(state, action) => {
//         const item = state.cartItems.find((i) => i.id === action.payload);
//         if(item.quantity > 1){
//             state.cartItems.forEach((i)=>{
//                 if(i.id === item.id) 
//                 i.quantity -= 1;
//             })
//         }

//     },

//     deleteFromCart:(state,action)=>{
//         state.cartItems = state.cartItems.filter((i) => i.id !== action.payload); 
//     },

//     calculatePrice:(state)=>{
//         let sum=0;
//         state.cartItems.forEach((i) => (sum += i.price * i.quantity));
//         state.subTotal = sum;
//         state.shipping = state.subTotal > 1000 ? 0 : 200;
//         state.tax = +(state.subTotal * 0.18).toFixed();
//         state.total = state.subTotal + state.tax + state.shipping;
//     },
// }


// );



// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { clearCheckout } from './checkoutSlice'; // Import the clearCheckout action

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const selectedProduct = action.payload;
      state.items.push(selectedProduct);
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      state.items = state.items.filter((product) => product.productId !== productIdToRemove);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Clear the checkout state when clearing the cart
export const clearCartAndCheckout = () => (dispatch) => {
  dispatch(clearCart());
  dispatch(clearCheckout());
};

export const selectCart = (state) => state.cart.items; // Adjust selector to get the 'items' array

export default cartSlice.reducer;
