/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Select, notification } from "antd";
import useEmailStore from "@/hooks/useEmailStore";
import { useTranslation } from "react-i18next";

export default function Create({
  anotherState,
  setAnotherState,
  anotherModalData,
  fetchData,
}) {
  const { t } = useTranslation("translation");

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  const handleOk = () => {
    setAnotherState(false);
  };

  const handleCancel = () => {
    setAnotherState(false);
    form.resetFields();
  };

  const [form] = Form.useForm();

  const createEmailTemplate = useEmailStore(
    (state) => state.createEmailTemplate
  );
  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      values.type = values.categories; // Set type to the selected category
      const response = await createEmailTemplate(values, t);
      if (response) {
        fetchData();
        handleOk();
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.name === "ValidationError") {
        return;
      }
      notification["error"]({
        message: t("Error") + " !",
        description: t("Please fill in all required fields!"),
      });
    }
  };

  const [loadings, setLoadings] = useState([]);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 1000);
  };

  const [categories, setCategories] = useState(anotherModalData?.categories);
  const [data, setData] = useState({});

  useEffect(() => {
    setCategories(anotherModalData?.categories);
  }, [anotherModalData]);

  const handleCategoryChange = (value) => {
    setCategories(value);
    handleInputChange("categories", value);
  };

  const handleInputChange = (name, value) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const getCategoryOptions = () => {
    return [t("Inform"), t("Remind"), t("Other")];
  };

  return (
    <>
      <Modal
        title={t("Create New Email Template")}
        open={anotherState}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"60%"}
        height={"70%"}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("Discard")}
          </Button>,
          <Button
            key="submit"
            loading={loadings[1]}
            onClick={() => {
              handleCreate(data);
              enterLoading(1);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white"
          >
            {t("Create")}
          </Button>,
        ]}
      >
        <Form {...formItemLayout} form={form} variant="filled">
          <Form.Item
            label={t("Email name")}
            dataindex="name"
            name="name"
            rules={[
              {
                required: true,
                message: t("Please input your Email name!"),
              },
            ]}
          >
            <Input
              data-testid="name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label={t("Description")}
            dataindex="description"
            name="description"
            rules={[
              {
                required: true,
                message: t("Please input your Description!"),
              },
            ]}
          >
            <Input.TextArea
              rows={5}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label={t("Categories")}
            dataindex="type"
            name="categories"
            rules={[
              {
                required: true,
                message: t("Please input your Categories!"),
              },
            ]}
          >
            <Select
              value={categories}
              onChange={handleCategoryChange}
              className="min-w-full"
            >
              {getCategoryOptions().map((category) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
