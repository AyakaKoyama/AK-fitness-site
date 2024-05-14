import { supabase } from "./supabase";

export const getInfo = async () => {
  const article = await supabase.from("article").select("*");
  console.log(article.data);
  return article.data;
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

export const addCategory = async (category: string) => {
  const response = await supabase
    .from("category")
    .insert([{ category }])
    .select();
  if (response.data !== null) {
    return response.data[0];
  }
};
