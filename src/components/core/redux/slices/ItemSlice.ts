import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemType } from "../../types/itemsType";

//Get all user action
export const getAllItem = createAsyncThunk(
  "getUsers",
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

// //delete single user
// export const deleteUser = createAsyncThunk(
//   "deleteUser",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         `https://629f5d82461f8173e4e7db69.mockapi.io/Crud/${id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       const result = await response.json();
//       return result;
//     } catch (err) {
//       console.log(err);
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// //update user
// export const updateUser = createAsyncThunk(
//   "updateUser",
//   async ({ id, name, email, age, gender }, { rejectWithValue }) => {

//     try {
//       const response = await fetch(
//         `https://629f5d82461f8173e4e7db69.mockapi.io/Crud/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ name, email, age, gender }),
//         }
//       );
//       const result = await response.json();
//       return result;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );

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
  //     // [deleteUser.pending]: (state) => {
  //     //   state.loading = true;
  //     // },
  //     // [deleteUser.fulfilled]: (state, action) => {
  //     //   state.loading = false;
  //     //   const { id } = action.payload;
  //     //   if (id) {
  //     //     state.users = state.users.filter((post) => post.id !== id);
  //     //   }
  //     // },
  //     // [deleteUser.rejected]: (state, action) => {
  //     //   state.loading = false;
  //     //   state.error = action.payload.message;
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
  //     // [updateUser.pending]: (state) => {
  //     //   state.loading = true;
  //     // },
  //     // [updateUser.fulfilled]: (state, action) => {
  //     //   console.log("updated user fulfilled", action.payload);
  //     //   state.loading = false;
  //     //   state.users = state.users.map((ele) =>
  //     //     ele.id === action.payload.id ? action.payload : ele
  //     //   );
  //     // },
  //     // [updateUser.rejected]: (state, action) => {
  //     //   state.loading = false;
  //     //   state.error = action.payload.message;
  //     // },
  //   },
});

export const itemsAPIReducer = itemSlice.reducer;
