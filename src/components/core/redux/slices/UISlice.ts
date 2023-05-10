import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "../../types/moviesType";
import { EnumModal } from "../../enums/EnumModal";

interface UIState {
  showModal?: EnumModal;
}

const initialState: UIState = {
  showModal: EnumModal.None,
};

const UISlice = createSlice({
  initialState,
  name: "sliceUI",
  reducers: {
    setModalView(state, action: PayloadAction<EnumModal>) {
      state.showModal = action.payload;
    },
  },
});
export const UIReducer = UISlice.reducer;
export const UIAction = UISlice.actions;
