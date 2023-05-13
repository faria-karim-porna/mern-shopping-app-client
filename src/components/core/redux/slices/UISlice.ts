import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "../../types/moviesType";
import { EnumModal } from "../../enums/EnumModal";
import { EnumView } from "../../enums/EnumView";

interface UIState {
  showModal?: EnumModal;
  view?: EnumView;
}

const initialState: UIState = {
  showModal: EnumModal.None,
  view: EnumView.ItemView,
};

const UISlice = createSlice({
  initialState,
  name: "sliceUI",
  reducers: {
    setModalView(state, action: PayloadAction<EnumModal>) {
      state.showModal = action.payload;
    },
    setView(state, action: PayloadAction<EnumView>) {
      state.view = action.payload;
    },
  },
});
export const UIReducer = UISlice.reducer;
export const UIAction = UISlice.actions;
