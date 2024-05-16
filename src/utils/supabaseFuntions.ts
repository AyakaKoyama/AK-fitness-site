import { supabase } from "./supabase";

export const getInfo = async () => {
  const article = await supabase.from("article").select("*");
  console.log(article.data);
  return article.data;
};
export const addArticle = async (
  id: string,
  author: string,
  contents: string
) => {
  const response = await supabase
    .from("article")
    .insert([
      {
        id,
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
