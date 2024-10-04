import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  //   CalculatorT,
  CATEGORIES,
  EntryT,
  keyIsArrayCategory,
} from "../../types/calc";
import { v4 as uuidv4 } from "uuid";
import { transliterate as tr } from "transliteration";
import { initCalc } from "../../utils/initCalc";
import calcRemaining from "../../utils/calcRemaining";

// const initialState: CalculatorT = {
//   income: [],
//   fixedExpenses: [],
//   inflatingExpenses: [],
//   investments: [],
//   savings: [],
//   remaining: {
//     id: "remaining",
//     name: "Remaining",
//     value: 0,
//     type: "Остаток",
//   },
// };

export const calculatorSlice = createSlice({
  name: "counter",
  initialState: initCalc,
  reducers: {
    addEntry: (
      state,
      action: PayloadAction<{ category: string; type: string }>
    ) => {
      const { category, type } = action.payload;
      if (!keyIsArrayCategory(category)) return;
      state[category].push({
        id: uuidv4(),
        type,
        name: tr(type),
        value: 0,
      });
    },
    deleteEntry: (state, action: PayloadAction<EntryT["id"]>) => {
      for (const category of CATEGORIES) {
        const targetIndex = state[category].findIndex(
          (entry) => entry.id === action.payload
        );
        if (targetIndex !== -1) {
          state[category].splice(targetIndex, 1);
          break;
        }
      }
      state.remaining.value = calcRemaining(state);
    },
    changeEntryValue: (state, action: PayloadAction<EntryT>) => {
      const { id, value } = action.payload;
      for (const category of CATEGORIES) {
        const targetEntry = state[category].find((entry) => entry.id === id);
        if (targetEntry) {
          targetEntry.value = value;
          break;
        }
      }
      state.remaining.value = calcRemaining(state);
    },
    changeMonths: (state, action: PayloadAction<number>) => {
      state.months = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addEntry, deleteEntry, changeEntryValue, changeMonths } =
  calculatorSlice.actions;

export default calculatorSlice.reducer;
