import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Spinner,
  Text,
  chakra,
} from "@chakra-ui/react";
import { Category } from "../domain/Article";
import { useNavigate, useParams } from "react-router-dom";
import { deleteArticle } from "../utils/supabaseFuntions";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

type ViewArticleByCategoryProps = {
  articles: {
    id: string;
    author: string;
    contents: string;
    category: Category | null;
  }[];
  loading: boolean;
};

export const ViewArticleByCategory = ({
  articles,
  loading,
}: ViewArticleByCategoryProps) => {
  const navigate = useNavigate();
  const { categoryName } = useParams<{ categoryName: string }>();
  console.log(categoryName);

  const filteredArticles = articles.filter(
    (article) => article.category?.name.toString() === categoryName
  );

  const handleBack = () => {
    navigate("/");
  };

  const deleteItem = async (articleId: string) => {
    await deleteArticle(articleId);
  };

  return (
    <>
      <Heading data-testid="title">カテゴリ: {categoryName}</Heading>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Box key={article.id} p={5}>
                <Flex
                  bg="#edf3f8"
                  _dark={{ bg: "#3e3e3e" }}
                  p={50}
                  w="full"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    data-testid="view-article"
                    mx="auto"
                    px={50}
                    py={4}
                    rounded="lg"
                    shadow="lg"
                    bg="white"
                    _dark={{ bg: "gray.800" }}
                    maxW="2xl"
                    minH="200px"
                    minW="300px"
                  >
                    <Flex justifyContent="flex-start" alignItems="center">
                      <Link
                        data-testid="category"
                        px={3}
                        py={1}
                        bg="gray.600"
                        color="gray.100"
                        fontSize="sm"
                        fontWeight="700"
                        rounded="md"
                        _hover={{ bg: "gray.500" }}
                        mb={5}
                      >
                        {article.category?.name}
                      </Link>
                    </Flex>

                    <Box mt={2} data-testid="contents">
                      <chakra.p
                        mt={2}
                        color="gray.600"
                        _dark={{ color: "gray.300" }}
                      >
                        {article.contents.slice(0, 10)}...
                      </chakra.p>
                    </Box>

                    <Flex justifyContent="flex-end" alignItems="center" mt={4}>
                      <Flex alignItems="center">
                        <Image
                          mx={4}
                          w={10}
                          h={10}
                          mb={5}
                          rounded="full"
                          fit="cover"
                          display={{ base: "none", sm: "block" }}
                          src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=2185&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="avatar"
                        />
                        <Link
                          data-testid="author"
                          color="gray.700"
                          _dark={{ color: "gray.200" }}
                          fontWeight="700"
                          cursor="pointer"
                        >
                          {article.author}
                        </Link>
                      </Flex>
                    </Flex>
                    <ButtonGroup variant="solid" size="sm" spacing={3}>
                      <IconButton
                        data-testid="view-button"
                        colorScheme="gray"
                        icon={<BsBoxArrowUpRight />}
                        aria-label="Up"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/${article.id}`);
                        }}
                      />
                      <IconButton
                        data-testid="edit-button"
                        colorScheme="gray"
                        icon={<AiFillEdit />}
                        aria-label="Edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/edit/${article.id}`);
                        }}
                      />
                      <IconButton
                        data-testid="delete-button"
                        colorScheme="gray"
                        variant="outline"
                        icon={<BsFillTrashFill />}
                        aria-label="Delete"
                        onClick={() => deleteItem(article.id)}
                      />
                    </ButtonGroup>
                  </Box>
                </Flex>
              </Box>
            ))
          ) : (
            <Text color="red">該当する記事がありません</Text>
          )}
        </>
      )}
      <Button data-testid="back-button" onClick={handleBack}>
        戻る
      </Button>
    </>
  );
};
