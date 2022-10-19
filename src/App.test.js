import { render, screen } from "@testing-library/react";
import App from "./App";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore(middlewares);
console.log(mockStore, "mockstore");
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
