/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Button, Modal, Select, notification } from "antd";
import useEmailStore from "@/hooks/useEmailStore";
import ModalSEPreview from "@/section/setting/ModalSEPreview";
import useAuth from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
export default function ModalSendEmail({ visible, handleCancel, recipient }) {
  // Fetch data from the API
  const { fetchData, emailData, getUser } = useEmailStore();
  const [userData, setUserData] = useState([]);
  const { t } = useTranslation("translation");
  // Get the currently logged in user's details
  const { infoUser } = useAuth();

  // Add state for the inputs
  const [category, setCategory] = useState(null);
  const [ccUsers, setCcUsers] = useState([]);
  const [templateName, setTemplateName] = useState(null);
  const recipientUser = userData.find((user) => user.fullName === recipient);
  const ccUserObjects = ccUsers.map((ccUser) =>
    userData.find((user) => user.fullName === ccUser)
  );

  useEffect(() => {
    fetchData();
    getUser().then((data) => setUserData(data));
  }, [fetchData, getUser]);

  // Reset the inputs when the modal closes
  useEffect(() => {
    if (!visible) {
      setCategory(null);
      setCcUsers([]);
      setTemplateName(null);
    }
  }, [visible]);

  // Reset templateName when category changes
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setTemplateName(null); // reset templateName
  };

  // For Modal Send Email Preview
  const [previewVisible, setPreviewVisible] = useState(false);

  const handlePreview = () => {
    if (!category || !templateName) {
      notification.error({
        message: t("Missing Input!"),
        description: t("Please select a Category and a Template name!"),
      });
    } else {
      setPreviewVisible(true);
    }
  };

  const handlePreviewCancel = () => {
    setPreviewVisible(false);
  };

  return (
    <Modal
      title={<div className="text-center">{t("Select Email Template")}</div>}
      visible={visible}
      onOk={handlePreview}
      onCancel={handleCancel}
      width={"50%"} // Adjust this value as needed
      height={"100%"} // Adjust this value as needed
      footer={[
        // eslint-disable-next-line react/jsx-key
        <div className="flex justify-center space-x-4">
          <Button key="back" onClick={handleCancel}>
            {t("Cancel")}
          </Button>
          <Button key="submit" type="primary" onClick={handlePreview}>
            {t("Preview")}
          </Button>
        </div>,
      ]}
      className="max-w-fit"
    >
      <React.Fragment>
        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex flex-wrap gap-x-2">
            <p className="font-bold w-32 mt-1">{t("Categories")}</p>
            <Select
              placeholder={t("Select a Category")}
              value={category}
              onChange={handleCategoryChange}
              className="w-[450px]"
            >
              <Select.Option value="Inform">{t("Inform")}</Select.Option>
              <Select.Option value="Remind">{t("Remind")}</Select.Option>
              <Select.Option value="Other">{t("Other")}</Select.Option>
            </Select>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <p className="font-bold w-32">{t("Apply to")}</p>
            <p>{t("Trainer")}</p>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <p className="font-bold w-32">{t("Send to")}</p>
            <p>{recipient}</p>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <p className="font-bold w-32">CC</p>
            <Select
              mode="multiple"
              placeholder={t("Select users")}
              value={ccUsers}
              onChange={setCcUsers}
              className="w-[450px]"
            >
              {userData
                .filter(
                  (user) =>
                    user.fullName !== recipient &&
                    user.fullName !== infoUser.fullName
                )
                .map((user, index) => (
                  <Select.Option key={index} value={user.fullName}>
                    {user.fullName}
                  </Select.Option>
                ))}
            </Select>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <p className="font-bold w-32 mt-1">{t("Template name")}</p>
            <Select
              placeholder={t("Template name")}
              value={templateName}
              onChange={setTemplateName}
              className="w-[450px]"
              disabled={!category} // disable if no category is selected
            >
              {emailData
                .filter((template) => {
                  const translationMap = {
                    "Thông báo": "Inform",
                    "Nhắc nhở": "Remind",
                    Khác: "Other",
                  };
                  const templateType =
                    translationMap[template.type] || template.type;
                  return template.status === true && templateType === category;
                })
                .map((template) => (
                  <Select.Option key={template.id} value={template.name}>
                    {template.name}
                  </Select.Option>
                ))}
            </Select>
          </div>
        </div>
      </React.Fragment>
      <ModalSEPreview
        visible={previewVisible}
        setVisible={setPreviewVisible}
        onCancel={handlePreviewCancel}
        emailData={emailData}
        ccUsers={ccUserObjects}
        recipient={recipientUser}
        templateName={templateName}
      />
    </Modal>
  );
}
