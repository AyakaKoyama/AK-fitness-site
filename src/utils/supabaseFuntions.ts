import { supabase } from "./supabase";

export const getInfo = async () => {
  const article = await supabase.from("article").select("*");
  console.log(article.data);
  return article.data;
};
