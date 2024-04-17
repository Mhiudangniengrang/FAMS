/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Modal,
  Descriptions,
  Input,
  Tag,
  Button,
  Switch,
  Select,
  notification,
} from "antd";
import { SaveFilled } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useEmailStore from "@/hooks/useEmailStore";

export default function ModalEmail({
  isModalVisible,
  setIsModalVisible,
  modalData,
  setModalData,
  fetchData,
}) {
  const { t } = useTranslation("translation");

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (id, value) => {
    setModalData({ ...modalData, [id]: value });
  };

  const [categories, setCategories] = useState(modalData?.type);

  useEffect(() => {
    setCategories(modalData?.type);
  }, [modalData]);

  const handleCategoryChange = (value) => {
    setCategories(value);
    handleInputChange("type", value);
  };

  const getCategoryOptions = () => {
    return [t("Inform"), t("Remind"), t("Other")];
  };

  const updateEmailTemplate = useEmailStore(
    (state) => state.updateEmailTemplate
  );

  const handleSave = async () => {
    enterLoading(1);
    try {
      const response = await updateEmailTemplate(modalData, t);
      if (response) {
        handleOk();
        fetchData();
      }
    } catch (error) {
      console.error(">>> Error updating", error);
      notification.error({ message: "Failed to update" });
    } finally {
      exitLoading(1);
    }
  };

  const onChange = (checked) => {
    setModalData({ ...modalData, status: checked });
  };

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };

  const exitLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  };

  return (
    <>
      <Modal
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width={"80%"}
        height={"100%"}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("Close")}
          </Button>,
          <Button
            key="submit"
            type=""
            icon={<SaveFilled />}
            loading={loadings[1]}
            onClick={() => {
              handleSave();
              enterLoading(1);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white"
          >
            {t("Save")}
          </Button>,
        ]}
      >
        <Descriptions
          title={t("Edit Email Template")}
          bordered
          layout="vertical"
          column={2}
        >
          <Descriptions.Item label={t("Name")}>
            <Input
              value={modalData?.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </Descriptions.Item>

          <Descriptions.Item label={t("Status")}>
            <div>
              <Tag
                className={`inline-block w-25 text-center py-1 rounded ${
                  modalData?.status
                    ? "bg-green-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {modalData?.status ? t("Active") : t("Inactive")}
              </Tag>
              <Switch
                checked={modalData?.status}
                onChange={onChange}
                style={{
                  backgroundColor: modalData?.status ? "green" : "grey",
                }}
              />
            </div>
          </Descriptions.Item>

          <Descriptions.Item label={t("Description")} span={3}>
            <Input.TextArea
              value={modalData?.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              autoSize={true}
            />
          </Descriptions.Item>

          <Descriptions.Item label={t("Categories")} className="w-50">
            <Select
              value={categories}
              onChange={handleCategoryChange}
              placeholder={"Please select a category"}
              style={{
                width: 200,
              }}
            >
              {getCategoryOptions().map((category) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Descriptions.Item>

          <Descriptions.Item label={t("Created By")}>
            {modalData?.createdBy}
          </Descriptions.Item>
          <Descriptions.Item label={t("Created Date")}>
            {modalData?.createdDate}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
}
