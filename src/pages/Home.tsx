import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { useEffect } from "react";
import { fetchPosts } from "../features/posts/postsSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>

      {status === "loading" && <p>로딩중...</p>}
      {status === "failed" && <p className="text-red-500">오류 : {error}</p>}

      <h1>연습용</h1>
    </div>
  );
}
