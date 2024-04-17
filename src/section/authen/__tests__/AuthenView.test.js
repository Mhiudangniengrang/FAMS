/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import "@/config/setupTests.js";
import AuthenView from "@/section/authen/view/AuthenView";
import Carousel from "@/section/authen/Carousel";
import Authen from "@/section/authen/Authen";

jest.mock(
  "@/assets/images/slides/slider_fpt_1.webp",
  () => "mocked-image-path"
);
jest.mock(
  "@/assets/images/slides/slider_fpt_2.webp",
  () => "mocked-image-path"
);
jest.mock(
  "@/assets/images/slides/slider_fpt_3.webp",
  () => "mocked-image-path"
);

describe("renders AuthenView component", () => {
  afterEach(cleanup);

  test("renders login heading", () => {
    render(
      <Router>
        <AuthenView />
      </Router>
    );
    const headingElement = screen.getByTestId("authenTitle");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.textContent).toBe("Login");
    expect(headingElement).toHaveClass("text-4xl");
    expect(headingElement).toHaveClass("font-bold");
    expect(headingElement).toHaveClass("mb-5");
  });

  test("renders Authen component", () => {
    render(
      <Router>
        <AuthenView />
      </Router>
    );

    const authenComponent = screen.getByTestId("authen");
    expect(authenComponent).toBeInTheDocument();
  });

  test("renders login form", () => {
    render(
      <Router>
        <Authen />
      </Router>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("submit login form with valid credentials", () => {
    render(
      <Router>
        <Authen />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testusername" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testpassword" },
    });
    fireEvent.click(screen.getByText("Login"));

    expect(screen.getByPlaceholderText("Username").value).toBe("testusername");
    expect(screen.getByPlaceholderText("Password").value).toBe("testpassword");
  });

  test('displays "Forgot password" link', () => {
    render(
      <Router>
        <Authen />
      </Router>
    );

    expect(screen.getByText("Forgot password")).toBeInTheDocument();
    expect(screen.getByText("Forgot password")).toHaveClass("float-right");
    expect(screen.getByText("Forgot password")).toHaveClass("text-[#3094ff]");
    expect(screen.getByText("Forgot password")).toHaveClass("hover:underline");
  });

  test('displays "Register now" link', () => {
    render(
      <Router>
        <Authen />
      </Router>
    );

    expect(screen.getByText("Register now")).toBeInTheDocument();
    expect(screen.getByText("Register now")).toHaveClass("text-[#3094ff]");
    expect(screen.getByText("Register now")).toHaveClass("hover:underline");
  });

  test("renders Carousel component", () => {
    render(
      <Router>
        <AuthenView />
      </Router>
    );

    const carouselComponent = screen.getByTestId("carousel");
    expect(carouselComponent).toBeInTheDocument();
  });

  test("renders multiple slides", () => {
    render(<Carousel />);

    const slideElements = screen.getAllByRole("listitem");
    expect(slideElements.length).toBe(3);
  });
});
