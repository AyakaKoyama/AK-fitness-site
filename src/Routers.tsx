import { Route, Routes } from "react-router-dom";
import { memo } from "react";
import { ViewArticle } from "./ViewArticle";
import { AddArticle } from "./AddArticle";

export const Routers = memo(() => {
  console.log("Router component is rendering");
  return (
    <Routes>
      <Route path="*" element={<ViewArticle />} />
      <Route path="/register" element={<AddArticle />} />
    </Routes>
  );
});
