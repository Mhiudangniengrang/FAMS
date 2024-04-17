/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Maill from "@/section/setting/Email";
import { BrowserRouter as Router } from "react-router-dom";
import "@/config/setupTests.js";
import "@testing-library/jest-dom";

describe("Email component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Maill />
      </Router>
    );
  });

  test("renders Email component and checks if elements are present", () => {
    expect(screen.getByTestId("filterbutton")).toBeInTheDocument();
    expect(screen.getByTestId("createbutton")).toBeInTheDocument();
    expect(screen.getByTestId("editbutton")).toBeInTheDocument();
    expect(screen.getByTestId("table")).toBeInTheDocument();
    expect(screen.getByTestId("input")).toBeInTheDocument();
    expect(screen.getByTestId("modalemail")).toBeInTheDocument();
    expect(screen.getByTestId("modalcreate")).toBeInTheDocument();
    expect(screen.getByTestId("modaldescription")).toBeInTheDocument();
  });

  test("simulates user interactions", () => {
    const filterButton = screen.getByTestId("filterbutton");
    fireEvent.click(filterButton);
    // Add your expectations here. For example:
    // expect(someFunction).toHaveBeenCalled();
  });

  test("simulates click on Create button and checks if modal is visible", () => {
    const createButton = screen.getByTestId("createbutton");
    fireEvent.click(createButton);
    const modalCreate = screen.getByTestId("modalcreate");
    expect(modalCreate).toBeVisible();
  });

  test("simulates click on Edit button and checks if modal is visible", async () => {
    const editButton = await screen.findAllByTestId("editbutton");
    fireEvent.click(editButton[0]); // Clicks the Edit button of the first row
    const modalEmail = screen.getByTestId("modalemail");
    expect(modalEmail).toBeVisible();
  });
});
