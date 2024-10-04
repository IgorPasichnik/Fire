import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CategoryT, keyIsArrayCategory } from "../../types/calc";

type ModalT = {
  open: boolean;
  category: CategoryT;
};

const initialState: ModalT = {
  open: false,
  category: "income",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      if (!keyIsArrayCategory(action.payload)) return;
      state.category = action.payload;
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
