import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Select,
  Spinner,
  chakra,
  Image,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { Category } from "../domain/Article";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteArticle } from "../utils/supabaseFuntions";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

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

  const [selectedCategory, setSelectedCategory] = useState("");

  //画面遷移時にカテゴリデータの保持が必要
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleCategoryNavigate = () => {
    if (selectedCategory) {
      navigate(`/view/${selectedCategory}`);
    }
  };

  const deleteItem = async (articleId: string) => {
    await deleteArticle(articleId);
  };

  return (
    <>
      <Heading data-testid="title">記事一覧</Heading>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Button
          colorScheme="green"
          mb={5}
          mt={5}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/register`);
          }}
        >
          記事を新しく投稿
        </Button>
      </Box>
      <Box mb={4}>
        <Select
          placeholder="カテゴリを選択"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="食事">食事</option>
          <option value="運動">運動</option>
          <option value="メンタルヘルス">メンタルヘルス</option>
          <option value="美容">美容</option>
          <option value="アドバイス">アドバイス</option>
        </Select>
        <Button
          ml="auto"
          display="block"
          mt={2}
          onClick={handleCategoryNavigate}
        >
          カテゴリで絞り込み
        </Button>
      </Box>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {articles.map((article) => (
            <div key={article.id} data-testid="article-id">
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
                      onClick={handleCategoryNavigate}
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
            </div>
          ))}
        </div>
      )}
    </>
  );
};
