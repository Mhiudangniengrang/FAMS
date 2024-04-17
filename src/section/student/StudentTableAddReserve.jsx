/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { Modal, Form, Checkbox, DatePicker, Switch, Input, Space } from "antd";
import { useTranslation } from "react-i18next";

const StudentTableAddReserve = (props) => {
  const { openReserve, setOpenReserve } = props;
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
  });
  const { t } = useTranslation("translation");
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes({ ...checkboxes, [name]: checked });
  };
  const onChange = (checked) => {
  };
  const onFinish = (values) => {
    setOpenReserve(false);
  };

  const onFinishFailed = (errorInfo) => {
    setOpenReserve(true);
  };
  const handleCancel = () => {
    setOpenReserve(false);
  };
  const handleSubmit = () => {
    setOpenReserve(false);
  };

  return (
    <>
      <Modal
        title={
          <h3 className="text-xl font-bold text-gray-800 text-center">
            {t("Add Reserving")}
          </h3>
        }
        className="font-bold"
        open={openReserve}
        onCancel={handleCancel}
        onOk={handleSubmit}
        footer={""}
      >
        <div className="container mx-auto mt-5">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="selectStudent" label={t("Select Student")}>
              <Input />
            </Form.Item>
            <Form.Item name="classname" label={t("Class name")}>
              <Input />
            </Form.Item>
            <Form.Item name="class code" label={t("Class code")}>
              <Input />
            </Form.Item>
            <Form.Item name="current modules" label={t("Current modules")}>
              <Input />
            </Form.Item>
            <Form.Item name="reserving reason" label={t("Reserving reason")}>
              <Input />
            </Form.Item>
            <Form.Item name="reserving period" label={t("Add Reserving")}>
              <Space direction="vertical" size={12}>
                <RangePicker />
              </Space>
            </Form.Item>
            <strong>
              <hr />
            </strong>
            <Form.Item
              name="reserving conditions"
              label={t("Reserving conditions")}
              className="my-3"
            >
              <div className="flex flex-col ">
                <Checkbox
                  name="checkbox1"
                  className="my-2"
                  checked={checkboxes.checkbox1}
                  onChange={handleChange}
                >
                  {t("Complete tuition payment")}
                </Checkbox>
                <Checkbox
                  name="checkbox2"
                  checked={checkboxes.checkbox2}
                  onChange={handleChange}
                >
                  {t("Ensure the course has not progressed beyond 50%")}{" "}
                </Checkbox>
                <Checkbox
                  name="checkbox3"
                  className="my-2"
                  checked={checkboxes.checkbox3}
                  onChange={handleChange}
                >
                  {t("Determine retention fee payment")}{" "}
                </Checkbox>
                <Checkbox
                  name="checkbox4"
                  checked={checkboxes.checkbox4}
                  onChange={handleChange}
                >
                  {t("Perform one-time retention check")}{" "}
                </Checkbox>
                <Checkbox
                  name="checkbox5"
                  className="my-2"
                  checked={checkboxes.checkbox5}
                  onChange={handleChange}
                >
                  {t("Identify the concluding module")}{" "}
                </Checkbox>
              </div>
            </Form.Item>
            <div className="flex ">
              <Switch defaultChecked onChange={onChange} />
              <p className="mx-3">{t("Activate reserving")}</p>
            </div>

            <div className="flex justify-end my-3">
              <button
                className="text-red-500 mx-2 underline"
                // onClick={handleCancel}
              >
                {t("Cancel")}
              </button>
              <button
                className="bg-[#172554] text-white border-solid border-2 w-20 h-8 rounded-md mx-4"
                // onClick={handleSave}
              >
                {t("Create")}
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default StudentTableAddReserve;
