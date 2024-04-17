/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { notification } from "antd";
import {
  Typography,
  Input,
  Select,
  Card,
  Modal,
  Button,
  Form,
  Checkbox,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import useStudentStore from "@/hooks/useStudentStore";
import { getAddReserve } from "@/api/reserveApi";
import StudentGeneralEdit from "./StudentGeneralEdit";
import StudentOtherEdit from "./StudentOtherEdit";
import StudentClassIfEdit from "./StudentClassIfEdit";
import StudentDetailTitle from "./StudentDetailTitle";

const StudentTableEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const {
    studentDataDetail,
    fetchStudentDataDetail,
    fetchStudentEdit,
    fetchClassInformation,
    classStudentData,
  } = useStudentStore();
  const [editMode, setEditMode] = useState(false);
  const [editMode2, setEditMode2] = useState(false);
  const [editMode3, setEditMode3] = useState(false);
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [checkbox3Checked, setCheckbox3Checked] = useState(false);
  const [checkbox4Checked, setCheckbox4Checked] = useState(false);
  const [checkbox5Checked, setCheckbox5Checked] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const { t } = useTranslation("translation");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, sDatechange] = useState("");
  const [endDate, eDatechange] = useState("");
  const [reason, reasonchange] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const formRef = useRef(null);
  const handleOk = async () => {
    setIsLoading(true); // Set loading state to true when starting the operation
    try {
      // Validate form fields
      const values = await formRef.current.validateFields();

      // Perform action if form validation succeeds
      const res = await getAddReserve(
        studentDataDetail.studentId,
        selectedClass,
        startDate,
        endDate,
        reason
      );

      if (res && res.status === 200) {
        if (res.data.status === 404) {
          notification.error({
            message: res.data.message,
          });
        } else {
          notification.success({
            message: t("Add reserve successful!"),
          });
          setIsModalOpen(false);
        }
      } else {
        notification.error({
          message: t("Add reserve failed!"),
        });
      }
    } catch (error) {
      console.error("Failed to add reserve. Please try again.", error);
      notification.error({
        message: t("Failed to reserve"),
        description: t(error.response.data.message),
      });
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      studentId: "",
      studentCode: "null",
      fullName: "",
      gender: "Male",
      phone: "",
      email: "",
      school: "",
      major: "",
      graduatedDate: "",
      area: "",
      address: "",
      status: "",
      dob: "",
      gpa: "",
      recer: "",
    },

    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, t("At least 2 character"))
        .max(25, t("Must not exceed 25 characters"))
        .required(t("required")),
      email: Yup.string().email("Invalid email").required(t("required")),
      phone: Yup.string()
        .matches(/^\d+$/, t("Phone number must contain only digits"))
        .min(10, t("Phone number is not valid"))
        .max(10, t("Phone number is not valid"))
        .required(t("required")),
      gpa: Yup.number("GPA must be a number")
        .min(0, t("GPA must not be less than 0"))
        .max(4, t("GPA must not exceed 4"))
        .required(t("required")),
      school: Yup.string()
        .max(25, t("Must not exceed 25 characters"))
        .required(t("required")),
      major: Yup.string()
        .max(25, t("Must not exceed 25 characters"))
        .required(t("required")),
      recer: Yup.string()
        .max(25, t("Must not exceed 25 characters"))
        .required(t("required")),
      dob: Yup.date()
        .max(new Date(), t("Date of birth must be in the past"))
        .test("valid-date", t("Invalid date"), function (value) {
          if (value) {
            const year = value.getFullYear();
            if (year < 1900 || year > new Date().getFullYear()) {
              return false;
            }
          }
          return true;
        })
        .required(t("required")),
      graduatedDate: Yup.date().required(t("required")),
    }),
  });

  useEffect(() => {
    if (classStudentData?.length === 1) {
      setSelectedClass(classStudentData[0]?.classId);
    }
  }, [classStudentData, setSelectedClass]);

  useEffect(() => {
    formik.setFieldValue("studentId", studentDataDetail.studentID);
    formik.setFieldValue("studentCode", studentDataDetail.studentCode);
    formik.setFieldValue("fullName", studentDataDetail.fullName);
    formik.setFieldValue("gender", studentDataDetail.gender);
    formik.setFieldValue("phone", studentDataDetail.phone);
    formik.setFieldValue("email", studentDataDetail.email);
    formik.setFieldValue("school", studentDataDetail.school);
    formik.setFieldValue("major", studentDataDetail.major);
    formik.setFieldValue("graduatedDate", studentDataDetail.graduatedDate);
    formik.setFieldValue("area", studentDataDetail.area);
    formik.setFieldValue("address", studentDataDetail.address);
    formik.setFieldValue("status", studentDataDetail.status);
    formik.setFieldValue("dob", studentDataDetail.dob);
    formik.setFieldValue("gpa", studentDataDetail.gpa);
    formik.setFieldValue("recer", studentDataDetail.recer);
  }, [studentDataDetail]);

  return (
    <form className="relative">
      <div>
        <StudentDetailTitle classStudentData={classStudentData} />
      </div>
      <div data-testid="general">
        <StudentGeneralEdit
          studentDataDetail={studentDataDetail}
          fetchStudentDataDetail={fetchStudentDataDetail}
          classStudentData={classStudentData}
          fetchStudentEdit={fetchStudentEdit}
          editMode={editMode}
          handleEditMode={setEditMode}
          formik={formik}
          id={id}
          setLoading={setLoading}
          fetchClassInformation={fetchClassInformation}
          setEditMode={setEditMode}
          touched={formik.touched}
        />
      </div>
      <div data-testid="other">
        <StudentOtherEdit
          studentDataDetail={studentDataDetail}
          fetchStudentDataDetail={fetchStudentDataDetail}
          classStudentData={classStudentData}
          fetchStudentEdit={fetchStudentEdit}
          editMode2={editMode2}
          handleEditMode={setEditMode2}
          formik={formik}
          id={id}
          setLoading={setLoading}
          fetchClassInformation={fetchClassInformation}
          setEditMode2={setEditMode2}
        />
      </div>
      <div data-testid="classinformation">
        <StudentClassIfEdit
          classStudentData={classStudentData}
          handleEditMode={setEditMode3}
          editMode3={editMode3}
        />
      </div>
      <div data-testid="reserve">
        <Typography className="bg-zinc-400 text-white px-6 py-2 rounded-md text-base">
          {t("Reserving")}
        </Typography>
        <div className="flex justify-center py-6">
          <button
            type="button"
            className="px-4 py-2 bg-[#172554] text-white rounded-md hover:bg-[#172554] focus:outline-none focus:border-[#172554]"
            onClick={showModal}
          >
            <PlusCircleOutlined />
            &nbsp;{t("Add Reserving")}
          </button>
        </div>
      </div>
      <Modal
        data-testid="addnewpopup"
        open={isModalOpen}
        onCancel={handleCancel} // Added onCancel handler
        footer={
          <div className="">
            <Button onClick={handleCancel} className="text-red-600">
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleOk}
              loading={isLoading}
              className=" ml-4 bg-black text-white "
              disabled={
                !checkbox1Checked ||
                !checkbox2Checked ||
                !checkbox3Checked ||
                !checkbox4Checked ||
                !checkbox5Checked
              }
            >
              {t("Create")}
            </Button>
          </div>
        }
      >
        <div>
          <h1 className="text-black text-2xl font-bold text-center">
            {t("Add New Reserve")}
          </h1>
        </div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          ref={formRef}
        >
          <Form.Item
            data-testid="stdidpu"
            label={t("Student Code")}
            name="stdid"
            value={studentDataDetail.studentId}
            className="my-8"
          >
            <div className="bg-gray-300 rounded-lg p-[7px] w-[350px] float-right">
              <h1>{studentDataDetail.studentCode}</h1>
            </div>
          </Form.Item>
          <Form.Item
            data-testid="clsidpu"
            label={t("FullName")}
            name="fullName"
            className=""
          >
            <div className="bg-gray-300 rounded-lg p-[7px] w-[350px] float-right">
              <h1>{studentDataDetail.fullName}</h1>
            </div>
          </Form.Item>
          <Form.Item
            data-testid="clsidpu"
            label={t("Email")}
            name="fullName"
            className=""
          >
            <div className="bg-gray-300 rounded-lg  p-[7px] w-[350px] float-right">
              <h1>{studentDataDetail.email}</h1>
            </div>
          </Form.Item>
          <Form.Item
            data-testid="clsidpu"
            label={t("Major")}
            name="fullName"
            className=""
          >
            <div className="bg-gray-300 rounded-lg p-[7px] max-w-[350px] min-w-[350px] float-right">
              <h1>{studentDataDetail.major}</h1>
            </div>
          </Form.Item>
          <Form.Item
            data-testid="clsidpu"
            label={t("ClassCode")}
            name="classid"
            value={classStudentData.classId}
            className=""
          >
            {classStudentData.length === 1 ? (
              <div className="bg-gray-300 rounded-lg p-[7px] w-[350px] float-right">
                <h1>{classStudentData[0]?.classCode}</h1>
              </div>
            ) : (
              <Select
                name="classCode"
                value={selectedClass}
                onChange={(value) => setSelectedClass(value)}
                className="ml-[15px]"
              >
                {classStudentData.map((classItem) => (
                  <Select.Option
                    key={classItem.classId}
                    value={classItem.classId}
                  >
                    {classItem.classCode}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            data-testid="sdatepu"
            label={t("Start date")}
            name="startdate"
            value={startDate}
            onChange={(e) => sDatechange(e.target.value)}
            rules={[
              { required: true, message: t("Please input your Start date!") },
            ]}
            className="my-8"
          >
            <Input type="date" className="max-w-[350px] float-right" />
          </Form.Item>
          <Form.Item
            data-testid="edatepu"
            label={t("End date")}
            name="enddate"
            value={endDate}
            onChange={(e) => eDatechange(e.target.value)}
            rules={[
              { required: true, message: t("Please input your End date!") },
            ]}
            className="my-8"
          >
            <Input type="date" className="max-w-[350px] float-right" />
          </Form.Item>
          <Form.Item
            data-testid="reasonpu"
            label={t("Reason")}
            name="reason"
            value={reason}
            onChange={(e) => reasonchange(e.target.value)}
            rules={[
              { required: true, message: t("Please input your reason!") },
            ]}
            className="my-8"
          >
            <Input className="max-w-[350px] float-right" />
          </Form.Item>
          <Form.Item data-testid="Checkbox">
            <h1>{t("Reserving conditions")}:</h1>
            <div data-testid="checkbox" className="flex flex-row mt-5">
              <div className="flex flex-col ..." data-testid="checkboxfull1">
                <Checkbox
                  data-testid="checkbox1"
                  onChange={(e) => setCheckbox1Checked(e.target.checked)}
                >
                  {t("Complete tuition payment")}
                </Checkbox>
                <Checkbox
                  data-testid="checkbox2"
                  onChange={(e) => setCheckbox2Checked(e.target.checked)}
                >
                  {t("Ensure the course has not progressed beyond 50%")}
                </Checkbox>
                <Checkbox
                  data-testid="checkbox3"
                  onChange={(e) => setCheckbox3Checked(e.target.checked)}
                >
                  {t("Determine retention fee payment")}
                </Checkbox>
              </div>
              <div className="flex flex-col ..." data-testid="checkboxfull2">
                <Checkbox
                  data-testid="checkbox4"
                  onChange={(e) => setCheckbox4Checked(e.target.checked)}
                >
                  {t("Perform one-time retention check")}
                </Checkbox>
                <Checkbox
                  data-testid="checkbox5"
                  onChange={(e) => setCheckbox5Checked(e.target.checked)}
                >
                  {t("Identify the concluding module")}
                </Checkbox>
              </div>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </form>
  );
};

export default StudentTableEdit;
