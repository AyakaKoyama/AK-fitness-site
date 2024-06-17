import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Category, Article } from "../domain/Article";
import { updateArticle, updateCategory } from "../utils/supabaseFuntions";
export type Inputs = {
  id: string;
  author: string;
  contents: string;
  categoryID: string;
};

type EditArticleProps = {
  articles: {
    id: string;
    author: string;
    contents: string;
    category: Category | null;
  }[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
};

export const EditArticle = ({ setArticles, articles }: EditArticleProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<Inputs | null>(null);
  console.log(id);
  console.log(articles);
  //編集対象の記事を検索し、initialValuesステートに設定
  useEffect(() => {
    const existingArticle = articles.find(
      (article) => article.id.toString() === id
    );
    console.log("existingArticle:", existingArticle);
    if (existingArticle) {
      setInitialValues({
        id: existingArticle.id,
        author: existingArticle.author,
        contents: existingArticle.contents,
        categoryID: existingArticle.category
          ? String(existingArticle.category.id)
          : "",
      });
    }
    console.log("existingArticle:", existingArticle);
  }, [id, articles]);

  //nullになる
  console.log(initialValues);

  //フォームが初期化される際に、defaultValuesとしてinitialValuesを渡す
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: initialValues || {
      id: "",
      author: "",
      contents: "",
      categoryID: "",
    },
  });
  //reset関数を使ってフォームの値を更新
  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    try {
      const existingArticle = articles.find(
        (article) => article.id === data.id
      );
      console.log(existingArticle);

      if (existingArticle) {
        const UpdateArticleData = await updateArticle(
          data.id,
          data.author,
          data.contents
        );
        const UpdateArticleCategoryData = await updateCategory(
          data.id,
          data.categoryID
        );
        if (!UpdateArticleData || !UpdateArticleCategoryData) {
          console.error("Failed to update article or category");
          return;
        }
        const updatedArticles = articles.map((article) =>
          article.id === data.id
            ? {
                ...article,
                author: UpdateArticleData.author,
                contents: UpdateArticleData.contents,
                category: new Category(
                  UpdateArticleCategoryData.id,
                  UpdateArticleCategoryData.name
                ),
              }
            : article
        );

        setArticles(updatedArticles);
        console.log(updatedArticles);
        navigate(`/`);
      }
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  };
  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      {initialValues ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading data-testid="title" color="gray.700">
            記事の編集
          </Heading>
          <Box p={3}>
            <FormControl isInvalid={!!errors.author}>
              <FormLabel>著者</FormLabel>
              <Input
                data-testid="author"
                placeholder="著者"
                size="sm"
                {...register("author", { required: "著者名の入力は必須です" })}
              />
              <FormErrorMessage>
                {errors.author && errors.author.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box p={3}>
            <FormControl isInvalid={!!errors.contents}>
              <FormLabel>記事</FormLabel>
              <Textarea
                data-testid="contents"
                size="lg"
                placeholder="投稿内容を入力してください"
                {...register("contents", {
                  required: "投稿内容の入力は必須です",
                })}
              />
              <FormErrorMessage>
                {errors.contents && errors.contents.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box p={3}>
            <FormControl isInvalid={!!errors.categoryID}>
              <FormLabel>カテゴリ</FormLabel>
              <Select
                data-testid="categoryID"
                placeholder="カテゴリ選択"
                size="sm"
                {...register("categoryID", { required: "選択は必須です" })}
              >
                <option value="1">食事</option>
                <option value="2">運動</option>
                <option value="3">メンタルヘルス</option>
                <option value="4">美容</option>
                <option value="5">アドバイス</option>
              </Select>
              {errors.categoryID && (
                <FormErrorMessage>
                  {errors.categoryID && errors.categoryID.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              data-testid="register-button"
              type="submit"
              colorScheme="gray.600"
              variant="outline"
            >
              投稿
            </Button>
          </Box>
          <Button data-testid="back-button" onClick={handleBack}>
            戻る
          </Button>
        </form>
      ) : (
        <p>記事を読み込んでいます...</p>
      )}
    </>
  );
};
