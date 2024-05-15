/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Title Test", () => {
  it("タイトルがHello Jestであること", () => {
    render(<App />);
    const title = screen.getByTestId("title");
    expect(title).toHaveTextContent("Hello Jest");
  });
});
