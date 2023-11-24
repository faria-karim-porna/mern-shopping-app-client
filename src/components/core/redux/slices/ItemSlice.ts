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

// //get single user
// export const getSingleUser = createAsyncThunk(
//   "getSingleUser",
//   async (id, { rejectWithValue }) => {
//     const response = await fetch(
//       `https://629f5d82461f8173e4e7db69.mockapi.io/Crud/${id}`
//     );

//     try {
//       const result = await response.json();
//       return result;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );
// //create action
// export const createUser = createAsyncThunk(
//   "createUser",
//   async (data, { rejectWithValue }) => {
//     const response = await fetch(
//       "https://629f5d82461f8173e4e7db69.mockapi.io/Crud",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );
//     const result = await response.json();
//     return result;
//   }
// );

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

//update user
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

        // const { id } = action.payload;
        // if (id) {
        //   state.items = state.items?.filter((item) => item.id !== id);
        // }
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
        //   state.items = state.items?.map((item) =>
        //   item.id === action.payload.items.id ? action.payload.items : item
        // );
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error";
      });
  },
  //   extraReducers: {
  //     [getAllItem.]: (state) => {
  //       state.loading = true;
  //     },
  //     [getAllItem.fulfilled]: (state, action) => {
  //       state.loading = false;
  //       state.singleUser = [];
  //       state.users = action.payload;
  //     },
  //     [getAllItem.rejected]: (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     },
  //     // [createUser.fulfilled]: (state, action) => {
  //     //   state.loading = false;
  //     //   state.users.push(action.payload);
  //     // },
  //     // [getSingleUser.pending]: (state) => {
  //     //   state.loading = true;
  //     // },
  //     // [getSingleUser.fulfilled]: (state, action) => {
  //     //   state.loading = false;
  //     //   state.singleUser = [action.payload];
  //     // },
  //     // [getSingleUser.rejected]: (state, action) => {
  //     //   state.loading = false;
  //     //   state.error = action.payload.message;
  //     // },
  //   },
});

export const itemsAPIReducer = itemSlice.reducer;
