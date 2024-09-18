import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purchases: [],
};

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    addPurchases:(state, action) => {
      state.purchases = action.payload
    },
    updatePurchase:(state, action) => {
      const updatedPurchases = state.purchases.map((purchase) => {
        if (purchase._id === action.payload.purchaseId){
          return action.payload.purchase;
        } 
        return purchase; 
      });
      state.purchases = updatedPurchases;
    },

    deletePurchase:(state, action) => {
      // debugger;
      const deletedPurchases = state.purchases.filter(
        (purchase) => purchase._id !== action.payload
     )
      state.purchases = deletedPurchases;
    }
  },
});

export const {addPurchases, updatePurchase, deletePurchase } = purchaseSlice.actions;
export default purchaseSlice.reducer;
