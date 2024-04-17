/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import "@/config/setupTests.js";
import "@testing-library/jest-dom";
import ReverveTable from "@/section/reverve/ReverveTable";
import EmailPreview from "@/section/reverve/EmailPreview";

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => { });
  jest.spyOn(console, "warn").mockImplementation(() => { });
  jest.spyOn(console, "error").mockImplementation(() => { });
});

describe("renders ButtonReverve component", () => {
  afterEach(cleanup);
  test("renders ButtonReverve components", () => {
    render(
      <Router>
        <ReverveTable />
      </Router>
    );
    expect(screen.getByTestId("AdvancedSearch")).toBeInTheDocument();
    expect(screen.getByTestId("importbutton")).toBeInTheDocument();
    expect(screen.getByTestId("addnewbutton")).toBeInTheDocument();
  });

  test("renders ReverveTable component", () => {
    render(
      <Router>
        <ReverveTable />
      </Router>
    );
    expect(screen.getByTestId("table")).toBeInTheDocument();
  });

  test("render EmailPreview component", () => {
    render(
      <Router>
        <EmailPreview />
      </Router>
    );
    expect(screen.getByTestId("button preview")).toBeInTheDocument();
  });
  test("opens the modal when the button is clicked", () => {
    render(<ReverveTable />);
    fireEvent.click(screen.getByTestId("addnewbutton"));
    expect(screen.getByTestId("addnewpopup")).toBeVisible();
    expect(screen.getByTestId("stdidpu")).toBeInTheDocument();
    expect(screen.getByTestId("clsidpu")).toBeInTheDocument();
    expect(screen.getByTestId("sdatepu")).toBeInTheDocument();
    expect(screen.getByTestId("edatepu")).toBeInTheDocument();
    expect(screen.getByTestId("reasonpu")).toBeInTheDocument();
  });
  test("renders Popup component", () => {
    render(
      <ReverveTable />
    );
    expect(screen.getByTestId("dropoutmodal")).toBeInTheDocument();
  });
});
