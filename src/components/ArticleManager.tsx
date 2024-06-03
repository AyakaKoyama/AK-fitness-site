import { useEffect, useState } from "react";
import { Article, Category } from "../domain/Article";
import { Route, Routes } from "react-router-dom";
import { ViewArticle } from "./ViewArticle";
import { RegisterArticle } from "./RegisterArticle";
import { getArticle, getCategory } from "../utils/supabaseFuntions";
import { ViewArticleDetail } from "./ViewArticleDetail";
import { ViewArticleByCategory } from "./ViewArticleByCategory";

export const ArticleManager = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const articleData = await getArticle();
        if (!articleData) {
          console.error("Failed to fetch article data");
          setLoading(false);
          return;
        }
        console.log(articleData);
        setLoading(false);
        //記事とカテゴリーを結合
        const articlesWithCategory = await Promise.all(
          articleData.map(async (article) => {
            const categoryData = await getCategory(article.id);
            console.log("Article:", article, "CategoryData:", categoryData);
            return {
              ...article,
              category: categoryData
                ? new Category(categoryData.id, categoryData.name)
                : null,
            };
          })
        );
        setArticles(articlesWithCategory);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <Routes>
      <Route
        path="*"
        element={<ViewArticle articles={articles} loading={loading} />}
      />
      <Route
        path="/register"
        element={<RegisterArticle setArticles={setArticles} />}
      />
      <Route
        path="/:id"
        element={<ViewArticleDetail articles={articles} loading={loading} />}
      />
      <Route
        path="/category/:categoryName"
        element={
          <ViewArticleByCategory articles={articles} loading={loading} />
        }
      />
    </Routes>
  );
};
