import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemType } from "../../types/itemsType";

export const getAllItem = createAsyncThunk(
  "getAllItem",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://mern-shopping-app-server-p7bccw89z-faria-karim-porna.vercel.app/api/getItems",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      return result.allItems;
    } catch (err) {
      return rejectWithValue("Opps found an error");
    }
  }
);

export const createItem = createAsyncThunk(
  "createItem",
  async (newItem: ItemType, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://mern-shopping-app-server-p7bccw89z-faria-karim-porna.vercel.app/api/addItems",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newItem),
        }
      );
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue("Opps found an error");
    }
  }
);

export const deleteItem = createAsyncThunk(
  "deleteItem",
  async (id: number, { rejectWithValue }) => {
    try {
      const deletedItem = { id: id };
      const response = await fetch(
        "https://mern-shopping-app-server-p7bccw89z-faria-karim-porna.vercel.app/api/deleteItems",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(deletedItem),
        }
      );
      const result = await response.json();
      return result.items;
    } catch (err) {
      return rejectWithValue("Opps found an error");
    }
  }
);

export const updateItem = createAsyncThunk(
  "updateItem",
  async (editedItem: ItemType, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://mern-shopping-app-server-p7bccw89z-faria-karim-porna.vercel.app/api/updateItems",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(editedItem),
        }
      );
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

type ItemState = {
  items?: ItemType[];
  loading?: boolean;
  error?: string;
  searchData?: [];
  singleItem?: ItemType;
};

const initialState: ItemState = {
  items: [],
  loading: false,
  error: "",
  searchData: [],
};

export const itemSlice = createSlice({
  name: "itemSlice",
  initialState,
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllItem.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error";
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error";
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error";
      })
      .addCase(createItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export const itemsAPIReducer = itemSlice.reducer;
