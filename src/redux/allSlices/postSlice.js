import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPost = createAsyncThunk("post/getPost", async () => {
  return fetch("https://blue-journalist-bbrpv.ineuron.app:4000/users").then(
    (res) => res.json()
  );
});

//     return fetch("https://blue-journalist-bbrpv.ineuron.app:4000/user/:id").then(
//       (res) => res.json()
//     );
//   });
export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  return fetch(`https://blue-journalist-bbrpv.ineuron.app:4000/user/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
});
export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ values }) => {
    return fetch("https://blue-journalist-bbrpv.ineuron.app:4000/user/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        age: values.age,
      }),
    }).then((res) => res.json());
  }
);
export const putPost = createAsyncThunk("post/putPost", async ({ values, id }) => {
  return fetch(`https://blue-journalist-bbrpv.ineuron.app:4000/user/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      age: values.age,
    }),
  }).then((res) => res.json());
});
export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    isLoading: false,
    error: null,
    flag: false,
    isDeleted: "",
    isCreated: false,
    isUpdated: false,
  },
  reducers: {
    reset: (state) => {
      state.isDeleted = "";
      state.isCreated = false;
      state.isUpdated = false;
    },
  },
  extraReducers: {
    [getPost.pending]: (state, action) => {
      state.isLoading = true;
      state.flag = false;
    },
    [getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload.data;
      state.flag = true;
    },
    [getPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.flag = true;
    },

    [deletePost.pending]: (state, action) => {
      state.isLoading = true;
      state.flag = false;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      //   state.post = action.payload;
      state.flag = true;
      state.isDeleted = "Deleted user";
    },
    [deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.flag = true;
    },

    [createPost.pending]: (state, action) => {
      state.isLoading = true;
      state.flag = false;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload.data;
      state.flag = true;
      state.isCreated = true;
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.flag = true;
    },

    [putPost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [putPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload.data;

      state.isUpdated = true;
    },
    [putPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { reset } = postSlice.actions;

export default postSlice.reducer;
