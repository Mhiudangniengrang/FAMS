/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TopReverveDetail from "@/section/reverve/TopReverveDetail";
import BottomReverveDetail from "@/section/reverve/BottomReverveDetail";
import "@/config/setupTests.js";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

test("renders ButtonReverve component", () => {
  render(
    <Router>
      <TopReverveDetail />
    </Router>
  );
  expect(screen.getByTestId("devopsfoundation")).toBeInTheDocument();
  expect(screen.getByTestId("HCM22_FR_DevOps_01")).toBeInTheDocument();
  expect(screen.getByTestId("line")).toBeInTheDocument();
  expect(screen.getByTestId("studentscore")).toBeInTheDocument();
  expect(screen.getByTestId("currentmodule")).toBeInTheDocument();
  expect(screen.getByTestId("Loremipsummodule")).toBeInTheDocument();
  expect(screen.getByTestId("FEE")).toBeInTheDocument();
  expect(screen.getByTestId("scroll")).toBeInTheDocument();
  expect(screen.getByTestId("quiztable")).toBeInTheDocument();
  expect(screen.getByTestId("ASMtable")).toBeInTheDocument();
  expect(screen.getByTestId("quiztable1")).toBeInTheDocument();
  expect(screen.getByTestId("quiztable2")).toBeInTheDocument();
  expect(screen.getByTestId("quiztable3")).toBeInTheDocument();
  expect(screen.getByTestId("quiztable4")).toBeInTheDocument();
  expect(screen.getByTestId("quiztable5")).toBeInTheDocument();
  expect(screen.getByTestId("quiztable6")).toBeInTheDocument();
  expect(screen.getByTestId("Mocktitle")).toBeInTheDocument();
  expect(screen.getByTestId("Mocktable")).toBeInTheDocument();
  expect(screen.getByTestId("lineend")).toBeInTheDocument();
});

test("renders BottomButtonReverve component", () => {
  render(
    <Router>
      <BottomReverveDetail />
    </Router>
  );
  expect(screen.getByTestId("reservinginformation")).toBeInTheDocument();
  expect(screen.getByTestId("period")).toBeInTheDocument();
  expect(screen.getByTestId("reason")).toBeInTheDocument();
  expect(screen.getByTestId("reasonwhy")).toBeInTheDocument();
  expect(screen.getByTestId("conditions")).toBeInTheDocument();
  expect(screen.getByTestId("checkbox")).toBeInTheDocument();
});

test("renders Popup component", () => {
  render(
    <Router>
      <BottomReverveDetail />
    </Router>
  );
  expect(screen.getByTestId("reclasspossibilities")).toBeInTheDocument();
  expect(screen.getByTestId("classbox")).toBeInTheDocument();
  expect(screen.getByTestId("Modalpopup")).toBeInTheDocument();
  expect(screen.getByTestId("checkboxfull1")).toBeInTheDocument();
  expect(screen.getByTestId("checkbox1")).toBeInTheDocument();
  expect(screen.getByTestId("checkbox2")).toBeInTheDocument();
  expect(screen.getByTestId("checkbox3")).toBeInTheDocument();
  expect(screen.getByTestId("checkbox4")).toBeInTheDocument();
  expect(screen.getByTestId("checkbox5")).toBeInTheDocument();
  expect(screen.getByTestId("checkboxfull2")).toBeInTheDocument();
  expect(screen.getByTestId("linebotoomfinal")).toBeInTheDocument();
});
