import { BrowserRouter } from "react-router-dom";
import { RegisterArticle } from "../components/RegisterArticle";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";

const mockAddArticles = jest.fn().mockResolvedValue({
  articleID: "1",
  author: "AK",
  contents: "This is a test article",
  categoryID: "1",
});

const mockAddArticleCategories = jest.fn().mockResolvedValue({
  articleID: "1",
  categoryID: "1",
});

jest.mock("../utils/supabaseFuntions", () => {
  return {
    addArticle: () => mockAddArticles(),
    addCategory: (article_id: string, category_id: string) =>
      mockAddArticleCategories(article_id, category_id),
  };
});

const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

//setArticlesモック化
const mockSetArticles = jest.fn();

test("タイトルが表示されること", async () => {
  render(
    <BrowserRouter>
      <RegisterArticle setArticles={mockSetArticles} />
    </BrowserRouter>
  );

  await waitFor(() => {
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });
});

test("著者名が未入力の場合にエラーメッセージが表示されること", async () => {
  render(<RegisterArticle setArticles={mockSetArticles} />);

  // 新規登録ボタンをクリック
  const registerButton = screen.getByTestId("register-button");
  fireEvent.click(registerButton);

  // エラーメッセージが表示されるのを待機
  await waitFor(() => {
    // エラーメッセージが表示されていることを確認
    const errorMessage = screen.queryByText("著者名の入力は必須です");
    expect(errorMessage).toBeInTheDocument();
  });
});

test("投稿内容が未入力の場合にエラーメッセージが表示されること", async () => {
  render(<RegisterArticle setArticles={mockSetArticles} />);

  // 新規登録ボタンをクリック
  const registerButton = screen.getByTestId("register-button");
  fireEvent.click(registerButton);

  // エラーメッセージが表示されるのを待機
  await waitFor(() => {
    // エラーメッセージが表示されていることを確認
    const errorMessage = screen.queryByText("投稿内容の入力は必須です");
    expect(errorMessage).toBeInTheDocument();
  });
});

test("カテゴリが未選択の場合にエラーメッセージが表示されること", async () => {
  render(<RegisterArticle setArticles={mockSetArticles} />);

  // 新規登録ボタンをクリック
  const registerButton = screen.getByTestId("register-button");
  fireEvent.click(registerButton);

  // エラーメッセージが表示されるのを待機
  await waitFor(() => {
    // エラーメッセージが表示されていることを確認
    const errorMessage = screen.queryByText("選択は必須です");
    expect(errorMessage).toBeInTheDocument();
  });
});

test("登録ボタン押下後/に遷移すること", async () => {
  render(
    <BrowserRouter>
      <RegisterArticle setArticles={mockSetArticles} />
    </BrowserRouter>
  );

  await waitFor(() => {
    const author = screen.getByTestId("author");
    fireEvent.change(author, { target: { value: "AK" } });

    const contents = screen.getByTestId("contents");
    fireEvent.change(contents, { target: { value: "This is a test article" } });

    const categoryID = screen.getByTestId("categoryID");
    fireEvent.change(categoryID, { target: { value: "1" } });

    // 新規登録ボタンをクリック
    const registerButton = screen.getByTestId("register-button");
    fireEvent.click(registerButton);
  });

  await waitFor(() => {
    expect(mockAddArticles).toHaveBeenCalled();
    console.log(mockAddArticles.mock.calls);
  });

  expect(mockedNavigator).toHaveBeenCalledWith("/");
});
