import { BrowserRouter } from "react-router-dom";
import { Article } from "../domain/Article";
import { ViewArticle } from "../components/ViewArticle";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";

const mockgetArticle = jest
  .fn()
  .mockResolvedValue(
    new Article("1", "AK", "This is a test article", { id: 1, name: "食事" })
  );

const mockgetCategory = jest.fn().mockResolvedValue({ id: 1, name: "食事" });

jest.mock("../utils/supabaseFuntions", () => {
  return {
    getArticle: () => mockgetArticle(),
    getCategory: (articleId: string) => mockgetCategory(articleId),
  };
});

// useNavigate＆useParamsモック
const mockedNavigator = jest.fn();
const mockeduseParams = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
  useParams: () => mockeduseParams,
}));

const loading = false;

const mockedArticles = [
  new Article("1", "AK", "This is a test article", { id: 1, name: "食事" }),
];

test("タイトルが表示されること", async () => {
  render(
    <BrowserRouter>
      <ViewArticle articles={mockedArticles} loading={loading} />
    </BrowserRouter>
  );

  await waitFor(() => {
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });
});

test("記事の表示が正しいこと", async () => {
  render(
    <BrowserRouter>
      <ViewArticle articles={mockedArticles} loading={loading} />
    </BrowserRouter>
  );

  await waitFor(() => {
    const author = screen.getByTestId("author");
    const contents = screen.getByTestId("contents");
    const category = screen.getByTestId("category");
    //著者名
    expect(author).toBeInTheDocument();
    //記事
    expect(contents).toBeInTheDocument();
    //カテゴリ
    expect(category).toBeInTheDocument();
  });
});

test("記事を見るボタン押下後/:idに遷移すること", async () => {
  // useParamsのモックを設定
  mockeduseParams.mockReturnValue({ id: "1" });

  render(
    <BrowserRouter>
      <ViewArticle articles={mockedArticles} loading={loading} />
    </BrowserRouter>
  );

  await waitFor(() => {
    // 記事を見るボタンをクリック
    const viewButton = screen.getByTestId("view-button");
    fireEvent.click(viewButton);
  });
  await waitFor(() => {
    expect(mockedNavigator).toHaveBeenCalledWith("/1");
  });

  // ログを出力する
  console.log("Navigation complete!");
});

test("記事押下後/:idに遷移すること", async () => {
  // useParamsのモックを設定
  mockeduseParams.mockReturnValue({ id: "1" });

  render(
    <BrowserRouter>
      <ViewArticle articles={mockedArticles} loading={loading} />
    </BrowserRouter>
  );

  await waitFor(() => {
    // 記事をクリック
    const article = screen.getByTestId("view-article");
    fireEvent.click(article);
  });
  await waitFor(() => {
    expect(mockedNavigator).toHaveBeenCalledWith("/1");
  });

  // ログを出力する
  console.log("Navigation complete!");
});
