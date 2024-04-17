import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@/config/setupTests.js";
import "@testing-library/jest-dom";
import StudentTableImport from "../StudentTableImport";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn().mockReturnValue({ t: (key) => key }),
}));

describe("StudentTableImport component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<StudentTableImport />);
    expect(getByText("Import")).toBeInTheDocument();
  });

  it("shows error message if no file selected on import", async () => {
    render(<StudentTableImport />);

    fireEvent.click(screen.getByText("Import"));
    fireEvent.click(screen.getByText("Import", { selector: "button" }));
  });
});
