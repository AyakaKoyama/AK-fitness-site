import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Category } from "../domain/Article";
import { useNavigate, useParams } from "react-router-dom";

type ViewArticleDetailProps = {
  articles: {
    id: string;
    author: string;
    contents: string;
    category: Category | null;
  }[];
  loading: boolean;
};

export const ViewArticleDetail = ({
  articles,
  loading,
}: ViewArticleDetailProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  console.log(id);
  //id を文字列として比較するために、toString() メソッドを使用
  const article = articles.find((a) => a.id.toString() === id);

  if (!article) {
    return <Text color="red">記事が見つかりません</Text>;
  }

  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Box p={5}>
            <Flex mb={5}>
              <Avatar
                name={article.author}
                src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=2185&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <Box ml={3}>
                <Heading size="lg" data-testid="author">
                  {article.author}
                </Heading>
                <Text data-testid="category">{article.category?.name}</Text>
              </Box>
            </Flex>
            <Text data-testid="contents">{article.contents}</Text>
          </Box>
          <Button data-testid="back-button" onClick={handleBack}>
            戻る
          </Button>
        </>
      )}
    </>
  );
};
