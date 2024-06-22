import {
  Box,
  Button,
  Flex,
  Link,
  Select,
  Spinner,
  chakra,
  Image,
  ButtonGroup,
  IconButton,
  CloseButton,
  VStack,
  Icon,
  useColorMode,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { Category } from "../domain/Article";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteArticle } from "../utils/supabaseFuntions";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit, AiFillGithub, AiOutlineMenu } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { FaHeart, FaMoon, FaSun } from "react-icons/fa";
import React from "react";
import { useViewportScroll } from "framer-motion";
import { useDisclosure } from "@chakra-ui/react";
import { Alert } from "./atoms/Alert";

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
  const { onOpen, onClose, isOpen } = useDisclosure();

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

  //ヘッダー
  const mobileNav = useDisclosure();

  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const bg = useColorModeValue("white", "gray.800");
  const ref = React.useRef<HTMLDivElement | null>(null);

  const [y, setY] = React.useState(0);
  console.log(y);
  // const height = ref.current ? ref.current.getBoundingClientRect() : 0;

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  const SponsorButton = (
    <Box
      display={{ base: "none", md: "flex" }}
      alignItems="center"
      as="a"
      aria-label="Sponsor Choc UI on Open Collective"
      href={""}
      target="_blank"
      rel="noopener noreferrer"
      bg="gray.50"
      borderWidth="1px"
      borderColor="gray.200"
      px="1em"
      minH="36px"
      rounded="md"
      fontSize="sm"
      color="gray.800"
      outline="0"
      transition="all 0.3s"
      _hover={{
        bg: "gray.100",
        borderColor: "gray.300",
      }}
      _active={{
        borderColor: "gray.200",
      }}
      _focus={{
        boxShadow: "outline",
      }}
      ml={5}
    >
      <Icon as={FaHeart} w="4" h="4" color="red.500" mr="2" />
      <Box as="strong" lineHeight="inherit" fontWeight="semibold">
        Sponsor
      </Box>
    </Box>
  );
  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
      zIndex={20}
      bgColor={useColorModeValue("whiteAlpha.900", "gray.900")}
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/register`);
        }}
        w="full"
        variant="ghost"
        leftIcon={<IoIosAddCircle />}
      >
        新規登録
      </Button>
    </VStack>
  );
  return (
    <>
      <Box pos="relative">
        <chakra.header
          ref={ref}
          // shadow={y > height ? "sm" : undefined}
          transition="box-shadow 0.2s"
          bg={bg}
          borderTop="6px solid"
          borderTopColor="brand.400"
          w="full"
          overflowY="hidden"
        >
          <chakra.div h="4.5rem" mx="auto" maxW="1200px">
            <Flex
              w="full"
              h="full"
              px="10"
              align="center"
              justify="space-between"
            >
              <Flex data-testid="title" align="center" minW="100">
                <Link href="/">記事一覧</Link>
              </Flex>

              <Flex
                justify="flex-end"
                w="full"
                maxW="824px"
                align="center"
                color="gray.400"
              >
                <HStack spacing="5" display={{ base: "none", md: "flex" }}>
                  <Link
                    isExternal
                    aria-label="Go to Choc UI GitHub page"
                    href="https://github.com/anubra266/choc-ui"
                  >
                    <Icon
                      as={AiFillGithub}
                      display="block"
                      transition="color 0.2s"
                      w="5"
                      h="5"
                      _hover={{ color: "gray.600" }}
                    />
                  </Link>
                </HStack>
                <IconButton
                  size="md"
                  fontSize="lg"
                  aria-label={`Switch to ${text} mode`}
                  variant="ghost"
                  color="current"
                  ml={{ base: "0", md: "3" }}
                  onClick={toggleMode}
                  icon={<SwitchIcon />}
                />
                {SponsorButton}
                <IconButton
                  display={{ base: "flex", md: "none" }}
                  aria-label="Open menu"
                  fontSize="20px"
                  color="gray.800"
                  _dark={{ color: "inherit" }}
                  variant="ghost"
                  icon={<AiOutlineMenu />}
                  onClick={mobileNav.onOpen}
                />
              </Flex>
            </Flex>
            {MobileNavContent}
          </chakra.div>
        </chakra.header>
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
                      onClick={onOpen}
                    />
                    <Alert
                      isOpen={isOpen}
                      onClose={onClose}
                      onDelete={() => deleteItem(article.id)}
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
