import { Route, Routes } from "react-router-dom";
import { memo } from "react";
import { ViewArticle } from "./ViewArticle";
import { RegisterArticle } from "./RegisterArticle";

export const Routers = memo(() => {
  return (
    <Routes>
      <Route path="*" element={<ViewArticle />} />
      <Route path="/register" element={<RegisterArticle />} />
    </Routes>
  );
});
