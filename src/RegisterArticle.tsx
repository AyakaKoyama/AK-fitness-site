import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Article } from "./domain/Article";
import { addArticle, addCategory } from "./utils/supabaseFuntions";

export type Inputs = {
  articleID: string;
  author: string;
  contents: string;
  categoryID: string;
};
export const RegisterArticle = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    try {
      const addArticleData = await addArticle(
        data.articleID,
        data.author,
        data.contents
      );
      console.log(data.articleID, data.author, data.contents);

      const addCategoryData = await addCategory(
        data.articleID,
        data.categoryID
      );
      console.log(data.articleID, data.categoryID);

      setArticles([
        {
          articleID: addArticleData.articleID,
          author: addArticleData.author,
          contents: addArticleData.contents,
          category: addCategoryData.categoryID,
        },
      ]);
      console.log(articles);
      navigate(`/`);
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading data-testid="title" color="gray.700">
          新規投稿
        </Heading>
        <Box p={3}>
          <FormControl isInvalid={!!errors.articleID}>
            <FormLabel>記事ID(英字のみ可)</FormLabel>
            <Input
              data-testid="articleID"
              placeholder="好きな英単語を入力"
              {...register("articleID", {
                required: "記事IDの入力は必須です",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "英字で入力してください",
                },
              })}
            />
            <FormErrorMessage>
              {errors.articleID && errors.articleID.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl isInvalid={!!errors.author}>
            <FormLabel>著者</FormLabel>
            <Input
              data-testid="author"
              placeholder="著者"
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
            <Input
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
            colorScheme="green"
            variant="outline"
          >
            投稿
          </Button>
        </Box>
      </form>
    </>
  );
};
