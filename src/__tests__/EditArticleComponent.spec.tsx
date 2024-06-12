import { BrowserRouter } from "react-router-dom";
import { EditArticle } from "../components/EditArticle";
import { waitFor, screen, render, fireEvent } from "@testing-library/react";
import { Article } from "../domain/Article";

const mockEditArticles = jest.fn().mockResolvedValue({
  articleID: "1",
  author: "AK",
  contents: "This is a test article",
  categoryID: "1",
});

const mockEditArticleCategories = jest.fn().mockResolvedValue({
  articleID: "1",
  categoryID: "1",
});

const mockedArticles = [
  new Article("1", "AK", "This is a test article", { id: 1, name: "食事" }),
];

jest.mock("../utils/supabaseFuntions", () => {
  return {
    updateArticle: () => mockEditArticles(),
    updateCategory: (article_id: string, category_id: string) =>
      mockEditArticleCategories(article_id, category_id),
  };
});

const mockedNavigator = jest.fn();
const mockeduseParams = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
  useParams: () => ({ id: "1" }),
}));

//setArticlesモック化
const mockSetArticles = jest.fn();

test("タイトルが表示されること", async () => {
  mockeduseParams.mockReturnValue({ id: "1" });
  render(
    <BrowserRouter>
      <EditArticle setArticles={mockSetArticles} articles={mockedArticles} />
    </BrowserRouter>
  );

  await waitFor(() => {
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });
});

test("登録ボタン押下後/に遷移すること", async () => {
  render(
    <BrowserRouter>
      <EditArticle setArticles={mockSetArticles} articles={mockedArticles} />
    </BrowserRouter>
  );
  await waitFor(() => {
    const author = screen.getByTestId("author");
    fireEvent.change(author, { target: { value: "AK" } });

    const contents = screen.getByTestId("contents");
    fireEvent.change(contents, { target: { value: "This is a test article" } });

    const categoryID = screen.getByTestId("categoryID");
    fireEvent.change(categoryID, { target: { value: "1" } });

    // 投稿ボタンをクリック
    const registerButton = screen.getByTestId("register-button");
    fireEvent.click(registerButton);
  });

  await waitFor(() => {
    expect(mockEditArticles).toHaveBeenCalled();
    console.log(mockEditArticles.mock.calls);
  });

  expect(mockedNavigator).toHaveBeenCalledWith("/");
});

test("戻るボタンをクリックすると、/に遷移すること", async () => {
  render(
    <BrowserRouter>
      <EditArticle setArticles={mockSetArticles} articles={mockedArticles} />
    </BrowserRouter>
  );

  await waitFor(() => {
    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);
  });
  console.log(mockedNavigator.mock.calls);
  expect(mockedNavigator).toHaveBeenCalledWith("/");
});
