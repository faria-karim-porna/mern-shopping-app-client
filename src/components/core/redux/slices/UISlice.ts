import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/usersType";
import { EnumModal } from "../../enums/EnumModal";
import { EnumView } from "../../enums/EnumView";
import { ItemType } from "../../types/itemsType";

interface UIState {
  showModal?: EnumModal;
  view?: EnumView;
  itemsData?: ItemType[];
  usersData?: UserType[];
  editingUserData?: UserType;
  editingItemData?: ItemType;
  personalData?: UserType;
  token?: string;
  isDrawerOpen?: boolean;
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
    setItemData(state, action: PayloadAction<ItemType[]>) {
      state.itemsData = action.payload;
    },
    setUserData(state, action: PayloadAction<UserType[]>) {
      state.usersData = action.payload;
    },
    setPersonalData(state, action: PayloadAction<UserType>) {
      state.personalData = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setEditingItemData(state, action: PayloadAction<ItemType | undefined>) {
      state.editingItemData = action.payload;
    },
    setEditingUserData(state, action: PayloadAction<UserType | undefined>) {
      state.editingUserData = action.payload;
    },
    setIsDrawerOpen(state, action: PayloadAction<boolean | undefined>) {
      state.isDrawerOpen = action.payload;
    },
  },
});
export const UIReducer = UISlice.reducer;
export const UIAction = UISlice.actions;
