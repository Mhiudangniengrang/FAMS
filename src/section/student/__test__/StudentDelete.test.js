/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@/config/setupTests.js";
import "@testing-library/jest-dom";
import StudentTableDelete from "../StudentTableDelete";

describe("StudentTableDelete Component", () => {
  const mockProps = {
    deleteStudent: "1",
    deletefullName: "John Doe",
    isModalOpenDelete: true,
    setIsModalOpenDelete: jest.fn(),
    page: 1,
  };

  test("renders modal with correct content", () => {
    const { getByText } = render(<StudentTableDelete {...mockProps} />);
    expect(getByText("Delete Student John Doe")).toBeInTheDocument();
    expect(
      getByText("Are you sure to delete student John Doe?")
    ).toBeInTheDocument();
  });

  test("cancel button works correctly", () => {
    const { getByText } = render(<StudentTableDelete {...mockProps} />);
    fireEvent.click(getByText("Cancel"));
    expect(mockProps.setIsModalOpenDelete).toHaveBeenCalledTimes(1);
    expect(mockProps.setIsModalOpenDelete).toHaveBeenCalledWith(false);
  });

  test("delete button works correctly", async () => {
    const { getByText } = render(<StudentTableDelete {...mockProps} />);
    fireEvent.click(getByText("Delete"));
    // Wait for the async operation to complete
    await waitFor(() => {
      expect(mockProps.setIsModalOpenDelete).toHaveBeenCalledTimes(1);
      expect(mockProps.setIsModalOpenDelete).toHaveBeenCalledWith(false);
    });
  });
});
