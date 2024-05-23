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
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Article } from "../domain/Article";
import { addArticle, addCategory } from "../utils/supabaseFuntions";

export type Inputs = {
  author: string;
  contents: string;
  categoryID: string;
};

type RegisterArticleProps = {
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
};

export const RegisterArticle = ({ setArticles }: RegisterArticleProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    try {
      const addArticleData = await addArticle(data.author, data.contents);
      console.log(addArticleData);

      const addCategoryData = await addCategory(
        addArticleData.id,
        data.categoryID
      );
      console.log(addArticleData.id, data.categoryID);

      setArticles([
        {
          articleID: addArticleData.id,
          author: addArticleData.author,
          contents: addArticleData.contents,
          category: addCategoryData.id,
        },
      ]);
      console.log(addArticleData);
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
