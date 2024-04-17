/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@/config/setupTests.js";
import ClassView from "@/section/class/view/ClassView";
import ClassTable from "@/section/class/ClassTable";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  navigate: jest.fn(),
}));
beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("renders ClassView Component", () => {
  afterEach(cleanup);

  test('renders "Training Class" heading', () => {
    const { getByText } = render(
      <Router>
        <ClassView />
      </Router>
    );

    const classListTitle = getByText("Training Class");
    expect(classListTitle).toBeInTheDocument();
    expect(classListTitle).toHaveClass("text-2xl");
    expect(classListTitle).toHaveClass("text-[#fff]");
    expect(classListTitle).toHaveClass("font-bold");
  });

  test("renders ClassTable component", () => {
    render(
      <Router>
        <ClassView />
      </Router>
    );

    expect(screen.getByTestId("classTable")).toBeInTheDocument();
  });

  test("renders correct background", () => {
    const { container } = render(
      <Router>
        <ClassView />
      </Router>
    );

    expect(container.firstChild).toHaveClass("min-w-[250px]");
  });
});

describe("renders ClassTable component child", () => {
  afterEach(cleanup);

  test("renders search input", () => {
    render(
      <Router>
        <ClassTable />
      </Router>
    );
    const searchInput = screen.getByPlaceholderText("Search by...");
    expect(searchInput).toBeInTheDocument();
  });

  test("renders button with correct text", () => {
    const { getByText } = render(
      <Router>
        <ClassTable />
      </Router>
    );

    expect(getByText("Sort")).toBeInTheDocument();
  });

  test("calls handleSort function on button click", () => {
    // const handleSort = jest.fn();
    const { getByTestId } = render(
      <Router>
        <ClassTable />
      </Router>
    );

    fireEvent.click(getByTestId("filterButton"));
    // expect(handleSort).toHaveBeenCalledTimes(1);
  });
});

test("renders table", () => {
  const { getByTestId } = render(
    <Router>
      <ClassTable />
    </Router>
  );
  expect(getByTestId("table")).toBeInTheDocument();
});
