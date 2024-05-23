import { supabase } from "./supabase";

export const getArticle = async () => {
  const article = await supabase.from("article").select("*");
  console.log(article.data);
  if (article.error || !article.data) {
    console.error("Failed to get article data", article.error);
    return null;
  }
  return article.data;
};

export const getCategory = async (article_id: string) => {
  try {
    //article_idを元に中間テーブルからcategoryIdを取得
    const categoryId = await supabase
      .from("article_category")
      .select("category_id")
      .eq("article_id", article_id)
      .single();
    console.log("articleId:", article_id);
    console.log("CategoryId:", categoryId);
    if (categoryId.error || !categoryId.data) {
      console.error("Failed to get article`s category:", categoryId.error);
      return null;
    }
    const category = await supabase
      .from("category")
      .select("*")
      .eq("id", categoryId.data.category_id)
      .single();
    console.log(category);
    return category.data;
  } catch (error) {
    console.error("Failed to get category :", error);
  }
};

export const addArticle = async (author: string, contents: string) => {
  const response = await supabase
    .from("article")
    .insert([
      {
        author,
        contents,
      },
    ])
    .select();
  if (response.data !== null) {
    return response.data[0];
  }
};

export const addCategory = async (article_id: string, category_id: string) => {
  //取得したcategoryIdを中間テーブルに追加
  const addCategoryId = await supabase
    .from("article_category")
    .insert([
      {
        article_id,
        category_id,
      },
    ])
    .select();
  console.log(addCategoryId);
  if (addCategoryId.error || !addCategoryId.data) {
    console.error("Failed to get article`s category:", addCategoryId.error);
    return null;
  }

  //中間テーブルに追加したcategoryIdを元にcategoryテーブルからカテゴリ情報を取得
  const category = await supabase
    .from("category")
    .select("*")
    .eq("id", category_id)
    .single();
  console.log(category);
  if (!category.data) {
    console.error("Failed to get category:", category.error);
    return null;
  }

  return category.data;
};
