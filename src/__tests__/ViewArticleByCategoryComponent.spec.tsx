import { BrowserRouter } from "react-router-dom";
import { ViewArticleByCategory } from "../components/ViewArticleByCategory";
import { Article } from "../domain/Article";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";

const loading = false;

const mockedArticles = [
  new Article("1", "AK", "This is a test article", { id: 1, name: "食事" }),
];
const mockedNavigator = jest.fn();
const mockeduseParams = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
  useParams: () => ({ categoryName: "食事" }),
}));

test("タイトルがカテゴリ名で表示されること", async () => {
  render(
    <BrowserRouter>
      <ViewArticleByCategory articles={mockedArticles} loading={loading} />
    </BrowserRouter>
  );
  await waitFor(() => {
    const title = screen.queryByText("カテゴリ: 食事");
    expect(title).toBeInTheDocument();
  });
});

test("記事の表示が正しいこと", async () => {
  render(
    <BrowserRouter>
      <ViewArticleByCategory articles={mockedArticles} loading={loading} />
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

test("戻るボタンをクリックすると、/に遷移すること", async () => {
  render(
    <BrowserRouter>
      <ViewArticleByCategory articles={mockedArticles} loading={loading} />
    </BrowserRouter>
  );

  await waitFor(() => {
    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);
  });
  console.log(mockedNavigator.mock.calls);
  expect(mockedNavigator).toHaveBeenCalledWith("/");
});

test("記事押下後/:idに遷移すること", async () => {
  // useParamsのモックを設定
  mockeduseParams.mockReturnValue({ id: "1" });

  render(
    <BrowserRouter>
      <ViewArticleByCategory articles={mockedArticles} loading={loading} />
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
