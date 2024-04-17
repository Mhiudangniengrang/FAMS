/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModalSendEmail from "@/section/setting/ModalSendEmail";
import ModalSEPreview from "@/section/setting/ModalSEPreview";

test("renders ModalSendEmail component", () => {
  render(
    <ModalSendEmail visible={false} handleCancel={() => {}} recipient="" />
  );

  // Add your expect statements here, for example:
  // expect(screen.getByTestId("your-test-id")).toBeInTheDocument();
});

test("renders ModalSEPreview component", () => {
  render(
    <ModalSEPreview
      visible={false}
      setVisible={() => {}}
      onCancel={() => {}}
      emailData={[]}
      ccUsers={[]}
      recipient={{}}
      templateName=""
    />
  );

  // Add your expect statements here, for example:
  // expect(screen.getByTestId("your-test-id")).toBeInTheDocument();
});
