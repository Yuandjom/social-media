import { createSlice } from "@reduxjs/toolkit";

//this is a global state that can be accessed anywhere we want
const initialState = {
  mode: "light", //this is going to represent the light mode and dark mode
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  //this represent the auth workflow
  name: "auth",
  initialState,
  reducers: {
    // just note that reducers are basically functions that modify the global state (initialState)
    setMode: (state) => {
      //u have replace the object as u cannot directly modify the initialState
      //this is just to toggle between the light and dark mode
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      //action is just params
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      //we are going to grab each post and map through each one
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) {
          //we are only going to return the relevant post
          return action.payload.post;
        } else {
          return post;
        }
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
