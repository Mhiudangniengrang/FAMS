/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import "@/config/setupTests.js";
import ClassName from "@/section/class/ClassName";
import GeneralCollapse from "@/section/class/GeneralCollapse";
import DateCollapse from "@/section/class/DateCollapse";
import AttendeeCollapse from "@/section/class/AttendeeCollapse";
import ScoreTable from "@/section/class/ScoreTable";
import TabList from "@/section/class/TabList";
import ClassDetailView from "@/section/class/view/ClassDetailView";
import ImportButton from "@/section/class/ImportButton";
import StudentList from "@/section/class/StudentList";

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("renders ClassDetailView Component", () => {
  afterEach(cleanup);
  test("renders ClassDetailView components", () => {
    render(
      <Router>
        <ClassDetailView />
      </Router>
    );
    expect(screen.queryByTestId("classNameComponent")).toBeInTheDocument();
    expect(
      screen.queryByTestId("generalCollapseComponent")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("dateCollapseComponent")).toBeInTheDocument();
    expect(
      screen.queryByTestId("attendeeCollapseComponent")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("tabListComponent")).toBeInTheDocument();
  });
});

test("renders ScoreTable components", async () => {
  render(
    <Router>
      <ScoreTable />
    </Router>
  );
  expect(screen.getByTestId("scoreTable")).toBeInTheDocument();
  expect(screen.getByTestId("searchButton")).toBeInTheDocument();
  expect(screen.getByTestId("filterButton")).toBeInTheDocument();
  expect(screen.getByTestId("ImportButton")).toBeInTheDocument();
  expect(screen.getByTestId("exportButton")).toBeInTheDocument();
  expect(screen.getByTestId("addNewButton")).toBeInTheDocument();
});

describe("renders GeneralCollapse component", () => {
  afterEach(cleanup);

  test("renders GeneralCollapse components", () => {
    render(
      <Router>
        <GeneralCollapse />
      </Router>
    );
    expect(screen.getByTestId("time")).toBeInTheDocument();
    expect(screen.getByTestId("timeDetail")).toBeInTheDocument();
    expect(screen.getByTestId("locationDetail")).toBeInTheDocument();
    expect(screen.getByTestId("trainerInfoDetail")).toBeInTheDocument();
    expect(screen.getByTestId("adminInfoDetail")).toBeInTheDocument();
    expect(screen.getByTestId("fsuDetail")).toBeInTheDocument();
    expect(screen.getByTestId("creator")).toBeInTheDocument();
    expect(screen.getByTestId("reviewer")).toBeInTheDocument();
    expect(screen.getByTestId("approver")).toBeInTheDocument();
    expect(screen.getByTestId("creator")).toBeInTheDocument();
    expect(screen.getByTestId("collapse")).toBeInTheDocument();
  });
});

describe("renders ClassName component", () => {
  afterEach(cleanup);

  test("renders ClassName component", () => {
    render(
      <Router>
        <ClassName />
      </Router>
    );
    expect(screen.getByTestId("class")).toBeInTheDocument();
    expect(screen.getByTestId("className")).toBeInTheDocument();
    expect(screen.getByTestId("classNameDetail")).toBeInTheDocument();
    expect(screen.getByTestId("classTime")).toBeInTheDocument();
    expect(screen.getByTestId("icons")).toBeInTheDocument();
  });
});

describe("renders DateCollapse component", () => {
  afterEach(cleanup);

  test("renders DateCollapse component", () => {
    render(
      <Router>
        <DateCollapse />
      </Router>
    );

    expect(screen.getByTestId("rangePicker")).toBeInTheDocument();
    expect(screen.getByTestId("dateStrings")).toBeInTheDocument();
    expect(screen.getByTestId("collapse")).toBeInTheDocument();
  });
});

describe("renders AttendeeCollapse component", () => {
  afterEach(cleanup);

  test("renders AttendeeCollapse component", () => {
    render(
      <Router>
        <AttendeeCollapse />
      </Router>
    );

    expect(screen.getByTestId("numberOfPlanneds")).toBeInTheDocument();
    expect(screen.getByTestId("numberOfAccepts")).toBeInTheDocument();
    expect(screen.getByTestId("collapse")).toBeInTheDocument();
  });
});

describe("renders TabList component", () => {
  afterEach(cleanup);

  test("renders TabList component", () => {
    render(
      <Router>
        <TabList />
      </Router>
    );
    expect(screen.getByTestId("training-program-tab")).toBeInTheDocument();
    expect(screen.getByTestId("student-list-tab")).toBeInTheDocument();
    expect(screen.getByTestId("budget-list-tab")).toBeInTheDocument();
    expect(screen.getByTestId("score-list-tab")).toBeInTheDocument();
    expect(screen.getByTestId("activities-log-tab")).toBeInTheDocument();
  });
});

describe("renders StudentTable component child", () => {
  afterEach(cleanup);

  test("renders search input", () => {
    render(
      <Router>
        <StudentList />
      </Router>
    );
    const searchInput = screen.getByPlaceholderText("Search by...");
    expect(searchInput).toBeInTheDocument();
  });

  test("add button", () => {
    const { getByTestId } = render(
      <Router>
        <StudentList />
      </Router>
    );
    expect(getByTestId("addNew")).toBeInTheDocument();
  });

  test("renders table", () => {
    const { getByTestId } = render(
      <Router>
        <StudentList />
      </Router>
    );
    expect(getByTestId("table")).toBeInTheDocument();
  });
});

describe("renders ImportButton component", () => {
  afterEach(cleanup);

  test('renders "Import" component', () => {
    render(<ImportButton />);
    expect(screen.getByTestId("importButton")).toBeInTheDocument();
    expect(screen.getByTestId("importModal")).toBeInTheDocument();
  });

  test("opens the modal when the button is clicked", () => {
    render(<ImportButton />);
    fireEvent.click(screen.getByTestId("importButton"));
    expect(screen.getByTestId("importModal")).toBeVisible();
  });

  test("renders Import button", () => {
    render(<ImportButton />);
    const importButton = screen.getByText("Import");
    expect(importButton).toBeInTheDocument();
  });

  test("opens modal when Import button is clicked", () => {
    render(<ImportButton />);
    const importButton = screen.getByText("Import");
    fireEvent.click(importButton);
    const importModal = screen.getByTestId("importModal");
    expect(importModal).toBeInTheDocument();
    expect(screen.getByTestId("footerButton")).toBeInTheDocument();
  });

  test("closes modal when Cancel button is clicked", () => {
    render(<ImportButton />);
    const importButton = screen.getByText("Import");
    fireEvent.click(importButton);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    const importModal = screen.queryByTestId("importModal");
    expect(importModal).toBeInTheDocument();
  });
});
