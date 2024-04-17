/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { Modal, Button } from "antd";
import useAuth from "@/hooks/useAuth";
import { SendOutlined } from "@ant-design/icons";
import useEmailStore from "@/hooks/useEmailStore";
import { useTranslation } from "react-i18next";

export default function ModalSEPreview({
  visible,
  setVisible,
  onCancel,
  emailData,
  ccUsers,
  recipient,
  templateName,
}) {
  const handleBack = () => {
    setVisible(false);
  };
  const { t } = useTranslation("translation");
  // Loading state
  const [loading, setLoading] = useState(false);

  const { sendEmailtoTrainers } = useEmailStore();
  const handleSend = () => {
    setLoading(true); // Set loading to true when send button is clicked
    const to = [recipient.userId, ...ccUsers.map((user) => user.userId)];
    sendEmailtoTrainers(to, selectedTemplate.templateId, t)
      .then((response) => {
        setLoading(false); // Set loading to false when email has been sent
      })
      .catch((error) => {
        setLoading(false); // Set loading to false when email failed to send
      });
  };

  // Find the selected template and user
  const selectedTemplate = emailData.find(
    (template) => template.name === templateName
  );

  // Replace \n with <br /> in the selectedTemplate.description
  const formattedDescription = selectedTemplate?.description
    ? selectedTemplate.description.replace(/\n/g, "<br />")
    : "";

  // Get the currently logged in user's details
  const { infoUser } = useAuth();

  return (
    <Modal
      title={<div className="text-center">{t("Email Preview")}</div>}
      visible={visible}
      onCancel={onCancel}
      centered
      width={"70%"} // Adjust this value as needed
      height={"100%"} // Adjust this value as needed
      footer={[
        <div className="flex justify-center space-x-4">
          <Button key="back" onClick={handleBack}>
            {t("Back")}
          </Button>
          <Button
            key="submit"
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            loading={loading}
          >
            {t("Send")}
          </Button>
        </div>,
      ]}
    >
      <React.Fragment>
        <div
          className="grid grid-cols-2 gap-4 mb-4"
          style={{ gridTemplateColumns: "auto 1fr" }}
        >
          <p className="font-bold">{t("Template name")}</p>
          <p>
            {selectedTemplate?.name}{" "}
            <span className="hidden">({selectedTemplate?.templateId})</span>
          </p>
          <p className="font-bold">{t("From")}</p>
          <p>{infoUser?.fullName}</p>
          <p className="font-bold">{t("To")}</p>
          <p>
            {recipient?.fullName}{" "}
            <span className="hidden">({recipient?.userId})</span>
          </p>
          <p className="font-bold">CC</p>
          <p>
            {ccUsers.map((user, index) => (
              <React.Fragment key={index}>
                {user.fullName} <span className="hidden">({user.userId})</span>
                {index < ccUsers.length - 1 && ", "}
              </React.Fragment>
            ))}
          </p>
          <p className="font-bold">{t("Subject")}</p>
          <p>{selectedTemplate?.type}</p>
          <p className="font-bold"> {t("Body")}</p>
          <p dangerouslySetInnerHTML={{ __html: formattedDescription }}></p>
          <p className="font-bold"></p>
          <p>
            -----------------------------------------------
            <br />
            {infoUser?.fullName} - {infoUser?.roleName}
          </p>
        </div>
      </React.Fragment>
    </Modal>
  );
}
