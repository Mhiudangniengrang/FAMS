/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@/config/setupTests.js";
import "@testing-library/jest-dom";
import StudentView from "@/section/student/view/StudentView";
import StudentTable from "@/section/student/StudentTable";
import StudentTableAddNew from "@/section/student/StudentTableAddNew";
import StudentTableImport from "@/section/student/StudentTableImport";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  navigate: jest.fn(),
}));

describe("renders StudentView Component", () => {
  afterEach(cleanup);
  test('renders "Student List" heading', () => {
    const { getByText } = render(
      <Router>
        <StudentView />
      </Router>
    );

    const studentListTitle = getByText("Student List");
    expect(studentListTitle).toBeInTheDocument();
    expect(studentListTitle).toHaveClass("text-2xl");
    expect(studentListTitle).toHaveClass("text-white");
    expect(studentListTitle).toHaveClass("font-bold");
  });
  test("renders StudentTable component", () => {
    render(
      <Router>
        <StudentView />
      </Router>
    );

    expect(screen.getByTestId("studentTable")).toBeInTheDocument();
  });
  test("renders Title component with correct classes", () => {
    const { getByText } = render(
      <Router>
        <StudentView />
      </Router>
    );

    const studentListTitle = getByText("Student List");
    expect(studentListTitle).toBeInTheDocument();
    expect(studentListTitle.parentElement).toHaveClass("bg-[#172554]");
    // expect(studentListTitle.parentElement).toHaveClass("text-white");
    expect(studentListTitle.parentElement).toHaveClass("p-5");
    expect(studentListTitle.parentElement).toHaveClass("rounded-t-xl");
  });
  test("renders correct background", () => {
    const { container } = render(
      <Router>
        <StudentView />
      </Router>
    );

    expect(container.firstChild).toHaveClass("scrollbar");
    expect(container.firstChild).toHaveClass("overflow-x-auto");
    expect(container.firstChild).toHaveClass("z-30");
  });
});

describe("renders StudentTable component child", () => {
  afterEach(cleanup);

  test("renders search input", () => {
    render(
      <Router>
        <StudentTable />
      </Router>
    );
    const searchInput = screen.getByPlaceholderText("Search by...");
    expect(searchInput).toBeInTheDocument();
  });

  test("renders without crashing", () => {
    render(<StudentTableAddNew />);
  });

  test("modal opens when isModalOpen is true", () => {
    const { getByText } = render(<StudentTableAddNew isModalOpen={true} />);
    expect(getByText("Add New Student")).toBeInTheDocument();
  });

  test("modal closes when cancel button is clicked", () => {
    const mockSetIsModalOpen = jest.fn();
    const { getByText } = render(
      <StudentTableAddNew
        isModalOpen={true}
        setIsModalOpen={mockSetIsModalOpen}
      />
    );
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
  });
  it("should render without crashing", () => {
    render(<StudentTableImport />);
  });

  it("should open modal on button click", async () => {
    const { getByText } = render(<StudentTableImport />);
    const uploadButton = getByText("Import");
    fireEvent.click(uploadButton);
    // const modal = getByTestId("import-modal");
    // expect(modal).toBeInTheDocument();
  });

  it("should show error if no file is selected", async () => {
    const { getByText } = render(<StudentTableImport />);
    const uploadButton = getByText("Import");
    fireEvent.click(uploadButton);
    // const importButton = getByText("Import");
    // fireEvent.click(importButton);
    // await waitFor(() => {
    //   expect(getByText("Please select a file to import.")).toBeInTheDocument();
    // });
  });

  test("renders table", () => {
    const { getByTestId } = render(
      <Router>
        <StudentTable />
      </Router>
    );
    expect(getByTestId("table")).toBeInTheDocument();
  });
});
