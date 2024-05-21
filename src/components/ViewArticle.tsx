import { useNavigate } from "react-router-dom";
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

type ViewArticleProps = {
  articles: {
    articleID: string;
    author: string;
    contents: string;
    category: Category | null;
  }[];
  loading: boolean;
};

export const ViewArticle = ({ articles, loading }: ViewArticleProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {articles.map((article) => (
            <div key={article.articleID}>
              <Card>
                <CardHeader>
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar
                        name={article.author}
                        src="https://bit.ly/sage-adebayo"
                      />
                      <Box>
                        <Heading size="sm">{article.author}</Heading>
                        <Text>カテゴリ名：{article.category?.name}</Text>
                      </Box>
                    </Flex>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text>{article.contents}</Text>
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
                  <Button flex="1" variant="ghost">
                    記事を見る
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}
      <Button data-testid="back-button" onClick={handleBack}>
        戻る
      </Button>
    </>
  );
};
