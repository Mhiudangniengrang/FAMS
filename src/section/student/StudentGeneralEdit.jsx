/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment/moment";
import dayjs from "dayjs";
import { Typography, Input, Select, DatePicker, notification } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Loading } from "@/components";
import useStudentStore from "@/hooks/useStudentStore";
import useStudentClassStore from "@/hooks/useStudentClassStore";
import useScoreStore from "@/hooks/useScoreStore";
import useAuth from "@/hooks/useAuth";
import { provinces } from "@/shared/data";

const StudentGeneralEdit = React.memo((props) => {
  const { editMode, formik, id, classId, handleEditMode } = props;
  const { Option } = Select;
  const ACTIVE_STATE = "Active";
  const INACTIVE_STATE = "Inactive";
  const FINISH_STATE = "Finish";
  const ROLE_ADMIN = "ROLE_ADMIN";
  const NOTYET_STATE = "Not yet";
  const DONE_STATE = "Done";

  const {
    fetchStudentEdit,
    fetchEditCertificate,
    studentDataDetail,
    fetchStudentDataDetail,
    isLoadingStudentDetail,
  } = useStudentStore();
  const { infoUser } = useAuth();
  const {
    isLoadingStudentDetailByClass,
    fetchStudentDetailByClass,
    studentDetailByClass,
  } = useStudentClassStore();
  const { fetchStudentScoreDetail, studentScoreData } = useScoreStore();

  const [getURL, setGetUrl] = useState(
    window.location.href.includes("/class/view/studentDetail/")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStudentDetailData, setIsLoadingStudentDetailData] =
    useState(false);

  const [isDone, setIsDone] = useState(false);
  const [selectedValue, setSelectedValue] = useState(NOTYET_STATE);
  const [selectedDate, setSelectedDate] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { t } = useTranslation("translation");
  const noScoreModule =
    studentScoreData?.mockModule?.moduleScore !== 0 &&
    studentScoreData?.feeModule?.moduleScore !== 0;

  useEffect(() => {
    if (classId && id) {
      (async () => {
        await fetchStudentScoreDetail(classId, id);
      })();
    }
  }, [classId, id]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsLoadingStudentDetailData(true);

        try {
          await Promise.all([
            fetchStudentDataDetail(id),
            fetchStudentDetailByClass(id, classId),
          ]);
        } catch (err) {
          console.error("Error fetching data", err);
        }
        setIsLoadingStudentDetailData(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (getURL) {
      setReadOnly(true);
      setIsDisabled(readOnly);
    }
  }, [getURL, readOnly]);

  useEffect(() => {
    if (studentDetailByClass.certificationDate) {
      setSelectedDate(studentDetailByClass.certificationDate);
    }
  }, [studentDetailByClass.certificationDate]);

  const handleSubmit = async () => {
    try {
      let isValid = true;

      const handleFetchStudentDetail = async () => {
        await fetchStudentDataDetail(id);
        handleEditMode(false);
      };

      const handleFetchStudentDetailByClass = async () => {
        await fetchStudentDetailByClass(id, classId);
        handleEditMode(false);
      };

      const handleFetchStudentEdit = async () => {
        const data = await fetchStudentEdit(studentData);
        if (data && data.status === 200) {
          await handleFetchStudentDetail();
        } else {
          handleEditMode(true);
        }
      };

      const handleFetchEditCertificate = async () => {
        if (!selectedDate) {
          notification.warning({
            message: t("Edit Failed"),
            description: t("Please select certification date."),
            duration: 2,
          });
          return;
        }
        const data = await fetchEditCertificate(certificateData);
        if (data && data.status === 200) {
          notification.success({
            message: t("Edit Successful"),
            description: t("Information is editted successfully."),
            duration: 2,
          });
          await handleFetchStudentDetailByClass();
        } else {
          handleEditMode(true);
          notification.error({
            message: t("Edit Failed"),
            description: t("Error updating certification award."),
            duration: 2,
          });
        }
      };

      if (!formik.isValid) {
        isValid = false;
        notification.error({
          message: t("Error"),
          description: t("Please fill in all required fields correctly"),
          duration: 2,
        });
      } else {
        if (!getURL) {
          setIsLoading(true);
          await handleFetchStudentEdit();
        } else {
          if (studentDetailByClass.attendingStatus === FINISH_STATE) {
            setIsLoading(true);
            if (studentDetailByClass.certificationStatus !== DONE_STATE) {
              await handleFetchEditCertificate();
            } else {
              handleEditMode(false);
            }
          } else {
            handleEditMode(false);
          }
        }
      }
      setIsLoading(false);

      return isValid;
    } catch (err) {
      console.error("Error submitting", err);
      return false;
    }
  };

  const handleCancelEdit = () => {
    handleEditMode(false);
    if (getURL) {
      setSelectedValue(studentDetailByClass.certificationStatus);
      setSelectedDate(studentDetailByClass.certificationDate);
      setIsDone(false);
      formik.setFieldValue("phone", studentDetailByClass.phone);
      formik.setFieldValue("fullName", studentDetailByClass.fullName);
      formik.setFieldValue("gender", studentDetailByClass.gender);
      formik.setFieldValue("dob", studentDetailByClass.dob);
      formik.setFieldValue("area", studentDetailByClass.area);
      formik.setFieldValue("email", studentDetailByClass.email);
      formik.setFieldValue("status", studentDetailByClass.status);
      formik.setFieldValue("address", studentDetailByClass.address);
      formik.setFieldValue(
        "attendingStatus",
        studentDetailByClass.attendingStatus
      );
    } else {
      formik.setFieldValue("phone", studentDataDetail.phone);
      formik.setFieldValue("fullName", studentDataDetail.fullName);
      formik.setFieldValue("gender", studentDataDetail.gender);
      formik.setFieldValue("dob", studentDataDetail.dob);
      formik.setFieldValue("area", studentDataDetail.area);
      formik.setFieldValue("email", studentDataDetail.email);
      formik.setFieldValue("status", studentDataDetail.status);
      formik.setFieldValue("address", studentDataDetail.address);
    }
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    if (value.includes(DONE_STATE)) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  };

  const handleDatePickerChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const certificateData = {
    studentId: studentDataDetail?.studentId,
    classId: classId,
    certificationStatus: selectedValue,
    certificationDate: selectedDate,
  };

  const studentData = {
    studentId: studentDataDetail?.studentId,
    fullName: formik?.values?.fullName,
    studentCode: formik?.values?.studentCode,
    address: formik?.values?.address,
    gender: formik?.values?.gender,
    phone: formik?.values?.phone,
    email: formik?.values?.email,
    school: studentDataDetail?.school,
    major: studentDataDetail?.major,
    graduatedDate: studentDataDetail?.graduatedDate,
    area: formik?.values?.area,
    status: formik?.values?.status,
    dob: formik?.values?.dob,
    gpa: studentDataDetail?.gpa,
    recer: studentDataDetail?.recer,
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const certificationDate = studentDetailByClass.certificationDate
    ? new Date(studentDetailByClass.certificationDate)
    : null;

  return (
    <div>
      <Typography
        className="bg-zinc-400 text-white px-6 py-2 rounded-md text-base flex justify-between"
        data-testid="generalTypography"
      >
        {t("General")}
        {infoUser.roleName === ROLE_ADMIN &&
          (!getURL ||
          (getURL &&
            noScoreModule &&
            studentDetailByClass.certificationStatus !== DONE_STATE)
            ? !editMode && (
                <button
                  onClick={() => handleEditMode(true)}
                  data-testid="editButton"
                >
                  <>
                    <EditOutlined />
                  </>
                </button>
              )
            : "")}
      </Typography>
      <div className="min-h-[300px]">
        {isLoadingStudentDetailByClass ||
        isLoadingStudentDetailData ||
        isLoading ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="p-4">
            <dl className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-center" data-testid="id">
                <label
                  className="mr-[40px] min-w-[150px] leading-9"
                  data-testid="idTitle"
                >
                  ID:
                </label>
                {editMode ? (
                  <Input
                    name="studentId"
                    value={id}
                    readOnly
                    className="w-[250px]"
                  />
                ) : (
                  <span className="ml-3 font-bold">{id}</span>
                )}
              </div>
              <div className="flex items-center" data-testid="phone">
                <label
                  className="mr-[40px] min-w-[150px] leading-9"
                  data-testid="studentPhoneTitle"
                >
                  {t("Phone")}
                </label>
                {editMode ? (
                  <div className="relative w-[250px]">
                    <Input
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      className="w-full"
                      readOnly={readOnly}
                      count={{
                        show: true,
                        max: 10,
                      }}
                      status={formik.errors.phone ? "error" : ""}
                    />
                    {formik.errors.phone && (
                      <small className="absolute text-red-500 left-0 break-words text-right block">
                        {formik.errors.phone}
                      </small>
                    )}
                  </div>
                ) : (
                  <span
                    className="ml-3 font-bold"
                    data-testid="viewStudentPhone"
                  >
                    {formik?.values.phone}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <label
                  className="mr-[40px] min-w-[150px] leading-9"
                  data-testid="studentNameTitle"
                >
                  {t("Name")}
                </label>
                {editMode ? (
                  <div className="relative w-[250px]">
                    <Input
                      name="fullName"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      className="w-[250px]"
                      count={{
                        show: true,
                        min: 2,
                        max: 25,
                      }}
                      readOnly={readOnly}
                      status={formik.errors.fullName ? "error" : ""}
                      required
                    />
                    {formik.errors.fullName && (
                      <small className="absolute text-red-500 left-0 break-words text-right block">
                        {formik.errors.fullName}
                      </small>
                    )}
                  </div>
                ) : (
                  <span
                    className="ml-3 font-bold"
                    data-testid="viewStudentName"
                  >
                    {formik?.values.fullName}
                  </span>
                )}
              </div>
              <div className="flex items-center" data-testid="email">
                <label
                  className="mr-[40px] min-w-[150px] leading-9"
                  data-testid="studentEmailTitle"
                >
                  Email:
                </label>
                {editMode ? (
                  <div className="relative w-[250px]">
                    <Input
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className="w-[250px]"
                      readOnly={readOnly}
                      status={formik.errors.email ? "error" : ""}
                      required
                    />
                    {formik.errors.email && (
                      <small className="absolute text-red-500 left-0 break-words text-right block">
                        {formik.errors.email}
                      </small>
                    )}
                  </div>
                ) : (
                  <span
                    className="ml-3 font-bold"
                    data-testid="viewStudentEmail"
                  >
                    {formik?.values.email}
                  </span>
                )}
              </div>
              <div className="flex items-center" data-testid="gender">
                <label
                  className="mr-[40px] min-w-[150px] leading-9"
                  data-testid="genderTitle"
                >
                  {t("Gender")}
                </label>
                {editMode ? (
                  <Select
                    name="gender"
                    value={formik.values.gender}
                    onChange={(value) => formik.setFieldValue("gender", value)}
                    className="w-[250px]"
                    disabled={isDisabled}
                    required
                  >
                    <Select.Option value="male">{t("Male")}</Select.Option>
                    <Select.Option value="female">{t("Female")}</Select.Option>
                  </Select>
                ) : (
                  <span
                    className="ml-3 font-bold"
                    data-testid="viewStudentGender"
                  >
                    {formik?.values.gender
                      ? t(formik?.values.gender).charAt(0).toUpperCase() +
                        t(formik?.values.gender).slice(1)
                      : ""}
                  </span>
                )}
              </div>
              <div className="flex items-center" data-testid="area">
                <label
                  className="mr-[40px] min-w-[150px] leading-9"
                  data-testid="studentAreaTitle"
                >
                  {t("Permanent residents")}
                </label>
                {editMode ? (
                  <Select
                    mode="single"
                    name="area"
                    className="w-[250px]"
                    placeholder="Select location"
                    value={formik.values.area}
                    onChange={(value) => formik.setFieldValue("area", value)}
                    showSearch
                    disabled={isDisabled}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {provinces.map((province) => (
                      <Option key={province} value={province}>
                        {province}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <span
                    className="ml-3 font-bold"
                    data-testid="viewStudentArea"
                  >
                    {formik?.values.area}
                  </span>
                )}
              </div>

              <div className="flex items-center " data-testid="dob">
                <label
                  className="mr-[40px] min-w-[150px] leading-9"
                  data-testid="dobTitle"
                >
                  {t("Date Of Birth")}
                </label>
                {editMode ? (
                  <div className="relative w-[250px]">
                    <Input
                      type="date"
                      name="dob"
                      value={formik.values.dob}
                      onChange={formik.handleChange}
                      className="w-[250px]"
                      readOnly={readOnly}
                      status={formik.errors.dob ? "error" : ""}
                      max={new Date().toISOString().split("T")[0]}
                      required
                    />
                    {formik.errors.dob && (
                      <small className="absolute text-red-500 left-0 break-words text-right block">
                        {formik.errors.dob}
                      </small>
                    )}
                  </div>
                ) : (
                  <span className="ml-3 font-bold" data-testid="viewStudentDob">
                    {formik?.values.dob}
                  </span>
                )}
              </div>

              <div className="flex items-center" data-testid="location">
                <label
                  className="mr-[40px] min-w-[150px] leading-9"
                  data-testid="locationTitle"
                >
                  {t("Location")}
                </label>
                {editMode ? (
                  <Select
                    mode="single"
                    name="address"
                    className="w-[250px]"
                    placeholder="Select location"
                    value={formik.values.address}
                    onChange={(value) => formik.setFieldValue("address", value)}
                    showSearch
                    disabled={isDisabled}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {provinces.map((province) => (
                      <Option key={province} value={province}>
                        {province}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <span
                    className="ml-3 font-bold"
                    data-testid="viewStudentAddress"
                  >
                    {formik?.values.address}
                  </span>
                )}
              </div>
              <div className="flex items-center" data-testid="studentStatus">
                <label
                  className="mr-[40px] min-w-[150px] leading-9"
                  data-testid="studentStatusTitle"
                >
                  {t("Status")}
                </label>
                {editMode ? (
                  <Select
                    name="status"
                    value={formik.values.status}
                    onChange={(value) => {
                      const fieldName = "status";
                      formik.setFieldValue(fieldName, value);
                    }}
                    disabled={isDisabled}
                    className="w-[250px]"
                  >
                    <Select.Option value={ACTIVE_STATE}>
                      {t("Active")}
                    </Select.Option>
                    <Select.Option value={INACTIVE_STATE}>
                      {t("Inactive")}
                    </Select.Option>
                  </Select>
                ) : (
                  <span
                    className={`ml-3 px-3 py-1 rounded-md text-[#fff] ${
                      formik?.values.status === ACTIVE_STATE
                        ? "bg-[#008000]"
                        : formik?.values.status === INACTIVE_STATE
                        ? "bg-[#ff7568]"
                        : ""
                    }`}
                    data-testid="viewStudentStatus"
                  >
                    {t(formik?.values.status)}
                  </span>
                )}
              </div>
              {getURL &&
                studentDetailByClass.attendingStatus === "Finish" &&
                noScoreModule && (
                  <div
                    className="flex items-center"
                    data-testid="certificationStatus"
                  >
                    <label
                      className="mr-[40px] min-w-[150px] leading-9"
                      data-testid="certificationStatusTitle"
                    >
                      {t("Certification status")}
                    </label>
                    {editMode ? (
                      <Select
                        className="w-[250px]"
                        onChange={handleSelectChange}
                        value={
                          studentDetailByClass.certificationStatus ===
                          DONE_STATE
                            ? studentDetailByClass.certificationStatus
                            : selectedValue
                        }
                        disabled={
                          studentDetailByClass.certificationStatus ===
                          DONE_STATE
                        }
                      >
                        <Select.Option value={NOTYET_STATE}>
                          {" "}
                          {t("Not yet")}
                        </Select.Option>
                        <Select.Option value={DONE_STATE}>
                          {" "}
                          {t("Done")}
                        </Select.Option>
                      </Select>
                    ) : (
                      <span
                        className="ml-3 px-3 py-1 bg-[#ff7568] text-[#fff] rounded-md"
                        data-testid="viewCertificationStatus"
                      >
                        {t(studentDetailByClass.certificationStatus)}
                      </span>
                    )}
                  </div>
                )}
              {getURL &&
                !isDone &&
                studentDetailByClass?.certificationStatus === NOTYET_STATE &&
                studentDetailByClass.attendingStatus === FINISH_STATE &&
                noScoreModule && (
                  <div
                    className="flex items-center"
                    data-testid="certificationDate"
                  >
                    <label
                      className="mr-[40px] min-w-[150px] leading-9"
                      data-testid="certificationDateTitle"
                    >
                      {t("Certification date")}
                    </label>
                    {editMode ? (
                      <DatePicker
                        picker="date"
                        className="w-[250px]"
                        onChange={handleDatePickerChange}
                        disabledDate={disabledDate}
                        defaultValue={dayjs(certificationDate)}
                        format="YYYY-MM-DD"
                        data-testid="editStudentStatus"
                      />
                    ) : (
                      <span
                        className="ml-3 font-bold text-red-600"
                        data-testid="viewCertificationDate"
                      >
                        {studentDetailByClass.certificationDate}
                      </span>
                    )}
                  </div>
                )}
            </dl>
            {editMode && (
              <div className="flex justify-end my-3" data-testid="button">
                <>
                  <button
                    className="text-red-500 mx-2 underline"
                    onClick={handleCancelEdit}
                    data-testid="cancelButton"
                  >
                    {t("Cancel")}
                  </button>
                  <button
                    className="bg-[#172554] text-white border-solid border-2 w-20 h-8 rounded-md ml-2"
                    type="button"
                    onClick={handleSubmit}
                    data-testid="submitButton"
                  >
                    {t("Save")}
                  </button>
                </>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

StudentGeneralEdit.displayName = "StudentGeneralEdit";

export default StudentGeneralEdit;
