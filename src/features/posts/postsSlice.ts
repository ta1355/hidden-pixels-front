import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./postsAPI";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axiosInstance.get("/posts");
  return response.data;
});

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostState {
  items: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  } as PostState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "오류 발생";
      });
  },
});

export default postsSlice.reducer;
