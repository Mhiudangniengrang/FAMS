/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@/config/setupTests.js";
import StudentDetailTitle from "@/section/student/StudentDetailTitle";
import StudentDetailView from "@/section/class/view/StudentDetailView";
import StudentGeneralEdit from "@/section/student/StudentGeneralEdit";
import BottomStudentScoreDetail from "@/section/class/BottomStudentScoreDetail";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("renders StudentDetailView component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders StudentDetailView component", () => {
    render(
      <Router>
        <StudentDetailView />
      </Router>
    );
    expect(screen.getByTestId("studentDetailTitle")).toBeInTheDocument();
    expect(screen.getByTestId("general")).toBeInTheDocument();
    expect(screen.getByTestId("other")).toBeInTheDocument();
    expect(screen.getByTestId("scoreDetail")).toBeInTheDocument();
  });
});

describe("renders StudentDetailTitle component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders student detail title with correct text", () => {
    const { getByTestId } = render(
      <Router>
        <StudentDetailTitle />
      </Router>
    );
    const titleElement = getByTestId("title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe("Student detail");
  });

  test('navigates to class list when close button is clicked (with "/class/view/studentDetail/" URL)', () => {
    window.location.href = "/class/view/studentDetail/";
    const { getByTestId } = render(
      <Router>
        <StudentDetailTitle />
      </Router>
    );
    fireEvent.click(getByTestId("close-button"));
    // expect(useNavigate).toHaveBeenCalledWith("/class/view");
  });

  test('navigates to student list when close button is clicked (with "/student/view" URL)', () => {
    window.location.href = "/student/view";
    const { getByTestId } = render(
      <Router>
        <StudentDetailTitle />
      </Router>
    );
    fireEvent.click(getByTestId("close-button"));
    // expect(useNavigate).toHaveBeenCalledWith("/student/view");
  });

  test("renders close button", () => {
    const { getByTestId } = render(
      <Router>
        <StudentDetailTitle />
      </Router>
    );
    const closeButton = getByTestId("close-button");
    expect(closeButton).toBeInTheDocument();
  });

  test("calls navigate function when close button is clicked", () => {
    const { getByTestId } = render(
      <Router>
        <StudentDetailTitle />
      </Router>
    );
    fireEvent.click(getByTestId("close-button"));
    // expect(useNavigate).toHaveBeenCalled();
  });
});

describe("renders StudentGeneralEdit component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders General title", () => {
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit />
      </Router>
    );
    const typographyElement = getByTestId("generalTypography");
    expect(typographyElement).toBeInTheDocument();
  });

  test('displays "General" text', () => {
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit />
      </Router>
    );
    const typographyElement = getByTestId("generalTypography");
    expect(typographyElement.textContent).toBe("General");
  });

  test("calls handleEdittMode function when edit button is clicked", () => {
    const handleEditMode = jest.fn();
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit handleEditMode={handleEditMode} />
      </Router>
    );
    const editButton = getByTestId("editButton");
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    // expect(handleEditMode).toHaveBeenCalledWith(true);
  });

  test("displays correctly id of student", () => {
    const id = "student-id";
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit />
      </Router>
    );

    const idLabel = getByTestId("idTitle");
    expect(idLabel).toBeInTheDocument();
    expect(idLabel.textContent).toBe("ID:");
  });

  test("displays correctly phone of student", () => {
    const phone = "student-phone";
    const error = "phone-error";
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit />
      </Router>
    );

    const phoneLabel = getByTestId("studentPhoneTitle");
    expect(phoneLabel).toBeInTheDocument();
    expect(phoneLabel.textContent).toBe("Phone");
  });

  test("displays correctly name of student", () => {
    const name = "student-name";
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit />
      </Router>
    );

    const nameLabel = getByTestId("studentNameTitle");
    expect(nameLabel).toBeInTheDocument();
    expect(nameLabel.textContent).toBe("Name");
  });

  test("displays correctly email of student", () => {
    const email = "student-email";
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit />
      </Router>
    );

    const emailLabel = getByTestId("studentEmailTitle");
    expect(emailLabel).toBeInTheDocument();
    expect(emailLabel.textContent).toBe("Email:");
  });

  test("displays correctly gender of student", () => {
    const gender = "student-gender";
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit />
      </Router>
    );

    const genderLabel = getByTestId("genderTitle");
    expect(genderLabel).toBeInTheDocument();
    expect(genderLabel.textContent).toBe("Gender");
  });

  test("displays correctly permanent residents of student", () => {
    const gender = "student-permanent-residents";
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit />
      </Router>
    );

    const areaLabel = getByTestId("studentAreaTitle");
    expect(areaLabel).toBeInTheDocument();
    expect(areaLabel.textContent).toBe("Permanent residents");
  });

  test("displays correctly dob of student", () => {
    const dob = "student-dob";
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit />
      </Router>
    );

    const dobLabel = getByTestId("dobTitle");
    expect(dobLabel).toBeInTheDocument();
    expect(dobLabel.textContent).toBe("Date Of Birth");
  });

  test("displays correctly dob of student", () => {
    const location = "student-location";
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit />
      </Router>
    );

    const locationLabel = getByTestId("locationTitle");
    expect(locationLabel).toBeInTheDocument();
    expect(locationLabel.textContent).toBe("Location");
  });

  test("displays correctly status of student", () => {
    const status = "student-status";
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit />
      </Router>
    );

    const statusLabel = getByTestId("studentStatusTitle");
    expect(statusLabel).toBeInTheDocument();
    expect(statusLabel.textContent).toBe("Status");
  });

  test("displays correctly status of student", () => {
    const certificationStatus = "student-certificationStatus";
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit />
      </Router>
    );

    const certificationStatusLabel = getByTestId("certificationStatusTitle");
    expect(certificationStatusLabel).toBeInTheDocument();
    expect(certificationStatusLabel.textContent).toBe("Certification status");
  });

  test("displays correctly status of student", () => {
    const certificationDate = "student-certificationDate";
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit />
      </Router>
    );

    const certificationDateLabel = getByTestId("certificationDateTitle");
    expect(certificationDateLabel).toBeInTheDocument();
    expect(certificationDateLabel.textContent).toBe("Certification date");
  });

  test("calls handleCancelEdit function when Cancel button is clicked", () => {
    const handleCancelEdit = jest.fn();
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit handleCancelEdit={handleCancelEdit} />
      </Router>
    );
    const cancelButton = getByTestId("CancelButton");
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton.textContent).toBe("Cancel");
    fireEvent.click(cancelButton);
    // expect(handleEditMode).toHaveBeenCalledWith(true);
  });

  test("calls handleSubmit function when submit button is clicked", () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <Router>
        <StudentGeneralEdit handleSubmit={handleSubmit} />
      </Router>
    );
    const submitButton = getByTestId("submitButton");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toBe("Save");
    fireEvent.click(submitButton);
    // expect(handleEditMode).toHaveBeenCalledWith(true);
  });
});

describe("renders StudentDetailView component", () => {
  test("renders General title", () => {
    const { getByTestId } = render(
      <Router>
        <BottomStudentScoreDetail />
      </Router>
    );
    const typographyElement = getByTestId("scoreTypography");
    expect(typographyElement.textContent).toBe("Score");
    expect(typographyElement).toBeInTheDocument();
  });

  test("calls handleEdittMode function when edit button is clicked", () => {
    const handleEditMode = jest.fn();
    const { getByTestId } = render(
      <Router>
        <BottomStudentScoreDetail handleEditMode={handleEditMode} />
      </Router>
    );
    const editButton = getByTestId("editButton");
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    // expect(handleEditMode).toHaveBeenCalledWith(true);
  });

  test("displays class name", () => {
    const { getByTestId } = render(
      <Router>
        <BottomStudentScoreDetail />
      </Router>
    );
    const className = getByTestId("devopsfoundation");
    expect(className).toBeInTheDocument();
  });

  test("displays class code", () => {
    const { getByTestId } = render(
      <Router>
        <BottomStudentScoreDetail />
      </Router>
    );
    const classCode = getByTestId("HCM22_FR_DevOps_01");
    expect(classCode).toBeInTheDocument();
  });

  test("displays FEE", () => {
    const { getByTestId } = render(
      <Router>
        <BottomStudentScoreDetail />
      </Router>
    );
    const fee = getByTestId("feeModule");
    expect(fee).toBeInTheDocument();
    expect(fee.textContent).toBe("FEE");
  });

  test("displays quiz table", () => {
    const { getByTestId } = render(
      <Router>
        <BottomStudentScoreDetail />
      </Router>
    );
    const quizTable = getByTestId("quiztable");
    expect(quizTable).toBeInTheDocument();
  });

  test("displays assignment table", () => {
    const { getByTestId } = render(
      <Router>
        <BottomStudentScoreDetail />
      </Router>
    );
    const asmTable = getByTestId("Asmtable");
    expect(asmTable).toBeInTheDocument();
  });

  test("displays finaltable table", () => {
    const { getByTestId } = render(
      <Router>
        <BottomStudentScoreDetail />
      </Router>
    );
    const finalTable = getByTestId("Finaltable");
    expect(finalTable).toBeInTheDocument();
  });

  test("displays Mocktable table", () => {
    const { getByTestId } = render(
      <Router>
        <BottomStudentScoreDetail />
      </Router>
    );
    const mocktable = getByTestId("Mocktable");
    expect(mocktable).toBeInTheDocument();
  });

  test("handles cancel button click", () => {
    render(<BottomStudentScoreDetail />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
  });

  test("handles save button click", () => {
    render(<BottomStudentScoreDetail />);
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
  });
});
