import {
  Box,
  Button,
  ButtonGroup,
  Flex,
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
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

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

  const deleteItem = async (articleId: string) => {
    await deleteArticle(articleId);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Flex
            bg="#edf3f8"
            _dark={{ bg: "#3e3e3e" }}
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              mx="auto"
              px={50}
              py={4}
              rounded="lg"
              shadow="lg"
              bg="white"
              _dark={{ bg: "gray.800" }}
              maxW="2xl"
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                data-testid="category"
              >
                <Link
                  px={3}
                  py={1}
                  bg="gray.600"
                  color="gray.100"
                  fontSize="sm"
                  fontWeight="700"
                  rounded="md"
                  _hover={{ bg: "gray.500" }}
                >
                  {article.category?.name}
                </Link>
              </Flex>

              <Box data-testid="contents" mt={2}>
                <chakra.p mt={2} color="gray.600" _dark={{ color: "gray.300" }}>
                  {article.contents}
                </chakra.p>
              </Box>

              <Flex justifyContent="flex-end" alignItems="center" mt={4}>
                <Flex alignItems="center">
                  <Image
                    mx={4}
                    w={10}
                    h={10}
                    rounded="full"
                    fit="cover"
                    display={{ base: "none", sm: "block" }}
                    src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=2185&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="avatar"
                  />
                  <Link
                    color="gray.700"
                    _dark={{ color: "gray.200" }}
                    fontWeight="700"
                    cursor="pointer"
                    data-testid="author"
                  >
                    {article.author}
                  </Link>
                </Flex>
              </Flex>

              <ButtonGroup variant="solid" size="sm" spacing={3} mt={4}>
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

          <Button data-testid="back-button" onClick={handleBack}>
            戻る
          </Button>
        </>
      )}
    </>
  );
};
