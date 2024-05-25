import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Category } from "../domain/Article";
import { useNavigate } from "react-router-dom";

type ViewArticleProps = {
  articles: {
    id: string;
    author: string;
    contents: string;
    category: Category | null;
  }[];
  loading: boolean;
};

export const ViewArticle = ({ articles, loading }: ViewArticleProps) => {
  const navigate = useNavigate();
  console.log(articles);

  return (
    <>
      <Heading data-testid="title">記事一覧</Heading>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {articles.map((article) => (
            <div key={article.id} data-testid="article-id">
              <Card
                data-testid="view-article"
                onClick={() => navigate(`/${article.id}`)}
                style={{ cursor: "pointer" }}
              >
                <CardHeader>
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar
                        name={article.author}
                        src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=2185&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      />
                      <Box>
                        <Heading data-testid="author" size="sm">
                          {article.author}
                        </Heading>
                        <Text data-testid="category">
                          カテゴリ名：{article.category?.name}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text data-testid="contents">
                    {article.contents.slice(0, 10)}...
                  </Text>
                </CardBody>
                <CardFooter
                  justify="space-between"
                  flexWrap="wrap"
                  sx={{
                    "& > button": {
                      minW: "136px",
                    },
                  }}
                >
                  <Button flex="1" variant="ghost">
                    削除
                  </Button>
                  <Button flex="1" variant="ghost">
                    編集
                  </Button>
                  <Button
                    data-testid="view-button"
                    flex="1"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/${article.id}`);
                    }}
                  >
                    記事を見る
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
