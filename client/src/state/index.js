import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, 
  token: null,
  carts: [],
  pageTitle:"",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // state.carts=[]
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.carts=[];
    },
    addToCart:(state, action) => {
      const foundItem = state.carts.find((item)=>item.id === action.payload.id)
      if(!foundItem){
        action.payload.quantity = 1;
        state.carts=[...state.carts, action.payload]
      } else {
        foundItem.quantity += 1;
        const cartItems = state.carts.filter((item)=>item.id !== action.payload.id)
        state.carts = [...cartItems,foundItem]
      }
    },
    emptyToCart:(state)=>{
      state.carts=[];
    },
    increaseCount:(state, action)=>{
      const foundItem = state.carts.find((item)=>item.id === action.payload.id)
      foundItem.quantity += 1;
    },
    decreaseCount:(state, action)=>{
      const foundItem = state.carts.find((item)=>item.id === action.payload.id)
      foundItem.quantity -= 1;
      
      if(foundItem.quantity <= 0){
        const filterItem = state.carts.filter((item)=>item.id !== foundItem.id)
        state.carts = [...filterItem]
      }
    },
    inputCount:(state, action)=>{
      const foundItem = state.carts.find((item)=>item.id == action.payload.item.id)
      foundItem.quantity = action.payload.value;
    },
    setPageTitle:(state, action)=>{
      state.pageTitle=action.payload
    }
  },
});

export const {  setLogin, setLogout, addToCart, increaseCount, decreaseCount,emptyToCart,inputCount,setPageTitle} =
  authSlice.actions;

  //공통으로 쓰이는 곳이 많기 때문에 rtk로 이동
export const selectorUser = (state)=>state.auth.user

export default authSlice.reducer;
