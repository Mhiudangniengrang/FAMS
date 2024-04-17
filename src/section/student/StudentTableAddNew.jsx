// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Input, Select, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import useClassStore from "@/hooks/useClassStore";
import useStudentStore from "@/hooks/useStudentStore";
import useAuth from "@/hooks/useAuth";

function StudentTableAddNew(props) {
  const { isModalOpen, setIsModalOpen, onUpdateSuccess } = props;
  const { fetchStudentAdd, fetchStudentData } = useStudentStore();
  const { fetchClassData, classData, classDetailData } = useClassStore();
  const { infoUser } = useAuth();
  const [selectedClass, setSelectedClass] = useState("");
  const [showClassCode, setShowClassCode] = useState(
    window.location.href.includes("/student/view")
  );

  const { t } = useTranslation("translation");
  useEffect(() => {
    if (!classData.length) {
      fetchClassData();
    }
  }, []);
  useEffect(() => {
    if (classDetailData.classCode) {
      setSelectedClass(classDetailData.classCode);
    }
  }, [classDetailData.classCode]);

  const formik = useFormik({
    initialValues: {
      classCode: classDetailData ? classDetailData.classCode : "",
      fullName: "",
      gender: "Male",
      phone: "",
      email: "",
      university: "",
      major: "",
      graduatedDate: "",
      area: "",
      location: "",
      dob: "",
      gpa: "",
      recer: "",
    },
    validationSchema: Yup.object().shape({
      classCode: Yup.string()
        .oneOf(
          classData.map((classItem) => classItem.classCode),
          "Please select a class code"
        )
        .required(t("Classcode is required")),
      fullName: Yup.string()
        .min(5, t("At least 5 character"))
        .max(25, t("Must not exceed 25 characters"))
        .required(t("fullname is required")),

      email: Yup.string()
        .email(t("Invalid email"))
        .required(t("Email is required")),
      phone: Yup.string()
        .matches(/^\d+$/, t("Phone number must contain only digits"))
        .min(10, t("Phone number is not valid"))
        .max(10, t("Phone number is not valid"))
        .required(t("Phone is required")),
      university: Yup.string()
        .required(t("University is required"))
        .max(30, t("university must not have 30 character")),
      major: Yup.string()
        .required(t("Major is required"))
        .max(30, t(" Major must not have 30 character")),
      area: Yup.string()
        .required(t("Area is required"))
        .max(30, t(" Area must not have 30 character")),
      location: Yup.string()
        .required(t("location is required"))
        .max(30, t(" location must not have 30 character")),
      recer: Yup.string()
        .required(t("Recer is required"))
        .max(30, t(" Recer must not have 30 character")),
      gpa: Yup.number()
        .typeError("GPA must be a numbereee")
        .min(0, "GPA must not be less than 0")
        .max(4, "GPA must not exceed 4")
        .required(t("GPA is required")),

      dob: Yup.date()
        .max(new Date(), t("Date of birth must be in the past"))
        .test(
          "compare-dates",
          t("Date of birth must be before graduation date"),
          function (value) {
            const { graduatedDate } = this.parent;
            if (value && graduatedDate) {
              return new Date(value) < new Date(graduatedDate);
            }
            return true;
          }
        )
        .required(t("Dob is required")),
      graduatedDate: Yup.date()
        .max(new Date(), t("graduatedDate must be in the past"))
        .test("valid-date", t("Invalid date"), function (value) {
          if (value) {
            const year = value.getFullYear();
            if (year < 1900 || year > new Date().getFullYear()) {
              return false;
            }
          }
          return true;
        })
        .required(t("GraduatedDate is required")),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      const result = await fetchStudentAdd({
        classCode: selectedClass,
        body: values,
      });

      if (result.status === 200) {
        resetForm();

        setIsModalOpen(false);
        fetchStudentData({
          page: props.page,
        });
        await onUpdateSuccess();
      }
    },
  });

  const handleCancel = () => {
    formik.setErrors({});
    formik.resetForm();

    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={
          <h3 className="text-xl font-bold text-gray-800 text-center">
            {t("Add New Student")}
          </h3>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={""}
        className="modalStyle"
      >
        <div className="container mx-auto mt-5">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-4 gap-4">
              {showClassCode && (
                <div className="col-span-4 md:col-span-1">
                  <label
                    className={`${
                      formik.touched.classCode &&
                      formik.errors.classCode &&
                      "text-[red]"
                    }`}
                  >
                    <span className="text-[red]">*</span> {t("Class Code")}
                  </label>
                  <Select
                    name="classCode"
                    value={formik.values.classCode}
                    onBlur={formik.handleBlur}
                    onChange={(value) => {
                      formik.setFieldValue("classCode", value);
                      setSelectedClass(value);
                    }}
                    className="w-full"
                  >
                    {classData.map((classItem) => (
                      <Select.Option
                        key={classItem.id}
                        value={classItem.classCode}
                      >
                        {classItem.classCode}
                      </Select.Option>
                    ))}
                  </Select>
                  <small className="text-[red]">
                    {formik.touched.classCode && formik.errors.classCode
                      ? formik.errors.classCode
                      : ""}
                  </small>
                </div>
              )}
              <div className="col-span-4 md:col-span-1">
                <label
                  className={`${
                    formik.touched.fullName &&
                    formik.errors.fullName &&
                    "text-[red]"
                  }`}
                >
                  <span className="text-[red]">*</span>
                  {t("Fullname")}
                </label>
                <Input
                  name="fullName"
                  placeholder={t("Enter your fullname")}
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  status={
                    formik.touched.fullName && formik.errors.fullName
                      ? "error"
                      : ""
                  }
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <small className="text-red-500">
                    {formik.errors.fullName}
                  </small>
                )}
              </div>
              <div className="col-span-4 md:col-span-1">
                <label
                  className={`${
                    formik.touched.phone && formik.errors.phone && "text-[red]"
                  }`}
                >
                  <span className="text-[red]">*</span> {t("Phone")}
                </label>
                <Input
                  name="phone"
                  placeholder={t("Enter your phone number")}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  status={
                    formik.touched.phone && formik.errors.phone ? "error" : ""
                  }
                />
                {formik.touched.phone && formik.errors.phone && (
                  <small className="text-red-500">{formik.errors.phone}</small>
                )}
              </div>
              <div className="col-span-4 md:col-span-1">
                <label
                  className={`${
                    formik.errors.gender && "text-[red]"
                  } mb-1 block`}
                >
                  <span className="text-[red]">*</span>
                  {t("Gender")}
                </label>
                <Select
                  name="gender"
                  value={formik.values.gender}
                  onChange={(value) => formik.setFieldValue("gender", value)}
                  className="w-full"
                >
                  <Select.Option value="Male">{t("Male")}</Select.Option>
                  <Select.Option value="Female">{t("Female")}</Select.Option>
                </Select>
              </div>
              <div className="col-span-4 md:col-span-1">
                <label
                  className={`${
                    formik.touched.email && formik.errors.email && "text-[red]"
                  } mb-1 block`}
                >
                  <span className="text-[red]">*</span>
                  {t("Email")}
                </label>
                <Input
                  name="email"
                  placeholder={t("Enter your email")}
                  value={formik.values.email}
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  status={
                    formik.touched.email && formik.errors.email ? "error" : ""
                  }
                />
                <small className="text-[red]">
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""}
                </small>
              </div>
              <div className="col-span-4 md:col-span-1">
                <label
                  className={`${
                    formik.touched.university &&
                    formik.errors.university &&
                    "text-[red]"
                  } mb-1 block`}
                >
                  <span className="text-[red]">*</span>
                  {t("University")}
                </label>
                <Input
                  name="university"
                  placeholder={t("Enter your university")}
                  value={formik.values.university}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  status={
                    formik.touched.university && formik.errors.university
                      ? "error"
                      : ""
                  }
                />
                <small className="text-[red]">
                  {formik.touched.university && formik.errors.university
                    ? formik.errors.university
                    : ""}
                </small>
              </div>
              <div className="col-span-4 md:col-span-1">
                <label
                  className={`${
                    formik.touched.major && formik.errors.major && "text-[red]"
                  } mb-1 block`}
                >
                  <span className="text-[red]">*</span>
                  {t("Major")}
                </label>
                <Input
                  name="major"
                  placeholder={t("Enter your major")}
                  value={formik.values.major}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  status={
                    formik.touched.major && formik.errors.major ? "error" : ""
                  }
                />
                <small className="text-[red]">
                  {formik.touched.major && formik.errors.major
                    ? formik.errors.major
                    : ""}
                </small>
              </div>
              <div className="col-span-4 md:col-span-1">
                <label
                  className={`${
                    formik.touched.graduatedDate &&
                    formik.errors.graduatedDate &&
                    "text-[red]"
                  } mb-1 block`}
                >
                  <span className="text-[red]">*</span>
                  {t("Graduated date")}
                </label>
                <Input
                  name="graduatedDate"
                  placeholder="graduatedDate"
                  value={formik.values.graduatedDate}
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  status={
                    formik.touched.graduatedDate && formik.errors.graduatedDate
                      ? "error"
                      : ""
                  }
                />
                <small className="text-[red]">
                  {formik.touched.graduatedDate && formik.errors.graduatedDate
                    ? formik.errors.graduatedDate
                    : ""}
                </small>
              </div>
              <div className="col-span-4 md:col-span-1">
                <label
                  className={`${
                    formik.touched.area && formik.errors.area && "text-[red]"
                  } mb-1 block`}
                >
                  <span className="text-[red]">*</span>
                  {t("Area")}
                </label>
                <Input
                  name="area"
                  placeholder={t("Enter your Area")}
                  value={formik.values.area}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  status={
                    formik.touched.area && formik.errors.area ? "error" : ""
                  }
                />
                <small className="text-[red]">
                  {formik.touched.area && formik.errors.area
                    ? formik.errors.area
                    : ""}
                </small>
              </div>
              <div className="col-span-4 md:col-span-1">
                <label
                  className={`${
                    formik.touched.location &&
                    formik.errors.location &&
                    "text-[red]"
                  } mb-1 block`}
                >
                  <span className="text-[red]">*</span>
                  {t("Location")}
                </label>
                <Input
                  name="location"
                  placeholder={t("Enter your location")}
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  status={
                    formik.touched.location && formik.errors.location
                      ? "error"
                      : ""
                  }
                />
                <small className="text-[red]">
                  {formik.touched.location && formik.errors.location
                    ? formik.errors.location
                    : ""}
                </small>
              </div>
              <div className="col-span-4 md:col-span-1">
                <label
                  className={`${
                    formik.touched.dob && formik.errors.dob && "text-[red]"
                  } mb-1 block`}
                >
                  <span className="text-[red]">*</span>
                  {t("Date Of Birth")}
                </label>
                <Input
                  name="dob"
                  placeholder="dob"
                  value={formik.values.dob}
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  status={
                    formik.touched.dob && formik.errors.dob ? "error" : ""
                  }
                />
                <small className="text-[red]">
                  {formik.touched.dob && formik.errors.dob
                    ? formik.errors.dob
                    : ""}
                </small>
              </div>
              <div className="col-span-4 md:col-span-1">
                <label
                  className={`${
                    formik.touched.gpa && formik.errors.gpa ? "text-[red]" : ""
                  } mb-1 block`}
                >
                  <span className="text-[red]">*</span>GPA:
                </label>
                <Input
                  name="gpa"
                  placeholder={t("Enter your GPA")}
                  value={formik.values.gpa}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full ${
                    formik.touched.gpa && formik.errors.gpa
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.gpa && formik.errors.gpa && (
                  <small className="text-red-500">{formik.errors.gpa}</small>
                )}
              </div>
              <div className="col-span-4 md:col-span-1">
                <label
                  className={`${
                    formik.touched.recer && formik.errors.recer && "text-[red]"
                  } mb-1 block`}
                >
                  <span className="text-[red]">*</span>Recer:
                </label>
                <Input
                  name="recer"
                  placeholder={t("Enter your Recer")}
                  value={formik.values.recer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  status={
                    formik.touched.recer && formik.errors.recer ? "error" : ""
                  }
                />
                <small className="text-[red]">
                  {formik.touched.recer && formik.errors.recer
                    ? formik.errors.recer
                    : ""}
                </small>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="text-red-500 mx-2 underline"
                type="button"
                onClick={handleCancel}
              >
                {t("Cancel")}
              </button>
              <button
                className="bg-[#172554] text-white border-solid border-2 w-20 h-8 rounded-md mx-4"
                type="submit"
              >
                {t("Save")}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default StudentTableAddNew;
