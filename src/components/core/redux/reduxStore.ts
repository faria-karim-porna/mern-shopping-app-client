import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  createSelectorHook,
  TypedUseSelectorHook,
  useDispatch,
} from "react-redux";
import { UIReducer } from "./slices/UISlice";
import { itemsAPIReducer } from "./slices/ItemSlice";

const RootReducer = combineReducers({
  UI: UIReducer,
  ItemsAPI: itemsAPIReducer,
});

const ActionAppTypeResetStore = "RESET_APP_REDUX_STORE";

export const ActionApp = {
  ResetStore: (): AnyAction => ({ type: ActionAppTypeResetStore }),
};

const AppReducer: (
  ...param: Parameters<typeof RootReducer>
) => ReturnType<typeof RootReducer> = (state, action) => {
  if (action.type === ActionAppTypeResetStore) {
    state = undefined;
  }
  return RootReducer(state, action);
};

export const AppStore = configureStore({
  reducer: AppReducer as typeof RootReducer,
  // Enalbe Dev Tools only on development environment
  // devTools: process.env.NODE_ENV === "development",
});

export type ShoppingAppState = ReturnType<typeof RootReducer>;
export type ShoppingAppDispatch = typeof AppStore.dispatch;
export const useAppDispatch = () => useDispatch<ShoppingAppDispatch>();
export const useAppSelector =
  createSelectorHook() as TypedUseSelectorHook<ShoppingAppState>;
