import { BrowserRouter } from "react-router-dom";
import { ViewArticleByCategory } from "../components/ViewArticleByCategory";
import { Article } from "../domain/Article";
import { render, waitFor, screen } from "@testing-library/react";

const loading = false;

const mockedArticles = [
  new Article("1", "AK", "This is a test article", { id: 1, name: "食事" }),
];
const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
  useParams: () => ({ id: "1" }),
}));

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
