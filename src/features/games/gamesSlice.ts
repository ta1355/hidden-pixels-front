import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./gamesAPI";
import type { Game } from "../../types/game";

// 전체 게임 목록을 가져옴
export const fetchGames = createAsyncThunk<Game[]>(
  "games/fetchGames",
  async () => {
    const response = await axiosInstance.get("/");
    return response.data.content ?? response.data;
  }
);

// id로 게임을 검색
export const searchGames = createAsyncThunk<Game[], string>(
  "games/searchGames",
  async (id) => {
    const response = await axiosInstance.get(`/${id}`);
    return response.data.content ?? response.data;
  }
);

interface GamesState {
  items: Game[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GamesState = {
  items: [],
  status: "idle",
  error: null,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "데이터 오류";
      })
      .addCase(searchGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchGames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(searchGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "검색 오류";
      });
  },
});

export default gamesSlice.reducer;
