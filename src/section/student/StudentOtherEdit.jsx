/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Typography, Input, notification } from "antd";
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";
import useStudentStore from "@/hooks/useStudentStore";
import { Loading } from "@/components";
import useAuth from "@/hooks/useAuth";

const StudentOtherEdit = (props) => {
  const {
    studentDataDetail,
    fetchStudentDataDetail,
    editMode2,
    handleEditMode,
    formik,
    id,
    fetchClassInformation,
  } = props;
  const { fetchStudentEdit } = useStudentStore();
  const [getURL, setGetUrl] = useState(
    window.location.href.includes("/class/view/studentDetail/")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStudentEdit, setIsLoadingStudentEdit] = useState(false);

  const { infoUser } = useAuth();

  const { t } = useTranslation("translation");
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsLoading(true);
        try {
          await Promise.all([
            fetchClassInformation(id),
            fetchStudentDataDetail(id),
          ]);
        } catch (err) {
          console.error("Error fetching data", err);
          setIsLoading(false);
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit2 = () => {
    if (!formik.isValid) {
      notification.error({
        message: t("Error"),
        description: t("Please fill in all required fields correctly"),
        duration: 2,
      });
      return;
    }

    setIsLoadingStudentEdit(true);
    fetchStudentEdit({
      studentId: studentDataDetail.studentId,
      fullName: studentDataDetail.fullName,
      studentCode: formik.values.studentCode,
      address: formik.values.address,
      gender: studentDataDetail.gender,
      phone: studentDataDetail.phone,
      email: studentDataDetail.email,
      school: formik.values.school,
      major: formik.values.major,
      graduatedDate: formik.values.graduatedDate,
      area: studentDataDetail.area,
      status: formik.values.status,
      dob: formik.values.dob,
      gpa: formik.values.gpa,
      recer: formik.values.recer,
    }).then((data) => {
      if (data && data.status === 200) {
        handleEditMode(false);
        if (id) {
          fetchStudentDataDetail(id);
          setIsLoadingStudentEdit(false);
        }
      } else {
        setIsLoadingStudentEdit(false);
      }
    });
  };

  const handleCanleEdit = () => {
    handleEditMode(false);
    formik.setFieldValue("school", studentDataDetail.school);
    formik.setFieldValue("gpa", studentDataDetail.gpa);
    formik.setFieldValue("major", studentDataDetail.major);
    formik.setFieldValue("recer", studentDataDetail.recer);
    formik.setFieldValue("graduatedDate", studentDataDetail.graduatedDate);
  };

  return (
    <div>
      <Typography className="bg-zinc-400 text-white px-6 py-2 mt-1 rounded-md text-base flex justify-between">
        {t("Other")}
        {infoUser.roleName === "ROLE_ADMIN" && !getURL
          ? !editMode2 && (
              <button onClick={() => handleEditMode(true)}>
                <EditOutlined />
              </button>
            )
          : ""}
      </Typography>
      <div className="min-h-[180px]">
        {isLoadingStudentEdit || isLoading ? (
          <div className="min-h-[180px] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="p-4">
            <dl className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-center">
                <label className="mr-[40px] min-w-[150px] leading-9">
                  {t("University")}
                </label>
                {editMode2 ? (
                  <div className="relative w-[250px]">
                    <Input
                      name="school"
                      value={formik.values.school}
                      onChange={formik.handleChange}
                      className="w-[250px]"
                      required
                    />
                    {formik.errors.school && (
                      <small className="absolute text-red-500 left-0 break-words block">
                        {formik.errors.school}
                      </small>
                    )}
                  </div>
                ) : (
                  <span className="ml-3 font-bold">{formik.values.school}</span>
                )}
              </div>
              <div className="flex items-center">
                <label className="mr-[40px] min-w-[150px] leading-9">
                  GPA:
                </label>
                {editMode2 ? (
                  <div className="relative w-[250px]">
                    <Input
                      name="gpa"
                      value={formik.values.gpa}
                      onChange={formik.handleChange}
                      className="w-full"
                      type="number"
                      required
                    />
                    {formik.errors.gpa && (
                      <small className="absolute text-red-500 left-0 break-words block">
                        {formik.errors.gpa}
                      </small>
                    )}
                  </div>
                ) : (
                  <span
                    className="ml-3 font-bold"
                    data-testid="viewStudentPhone"
                  >
                    {formik?.values.gpa}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <label className="mr-[40px] min-w-[150px] leading-9">
                  {t("Major")}
                </label>
                {editMode2 ? (
                  <div className="relative w-[250px]">
                    <Input
                      name="major"
                      value={formik.values.major}
                      onChange={formik.handleChange}
                      className="w-[250px]"
                      required
                    />
                    {formik.errors.major && (
                      <small className="absolute text-red-500 left-0 break-words block">
                        {formik.errors.major}
                      </small>
                    )}
                  </div>
                ) : (
                  <span className="ml-3 font-bold">{formik.values.major}</span>
                )}
              </div>
              <div className="flex items-center" data-testid="email">
                <label className="mr-[40px] min-w-[150px] leading-9">
                  {t("Graduation Time")}
                </label>
                {editMode2 ? (
                  <div className="relative w-[250px]">
                    <Input
                      type="date"
                      name="graduatedDate"
                      value={formik.values.graduatedDate}
                      onChange={formik.handleChange}
                      status={formik.errors.dob ? "error" : ""}
                      className="w-[250px]"
                      required
                    />
                    {formik.errors.graduatedDate && (
                      <small className="absolute text-red-500 left-0 break-words block">
                        {formik.errors.graduatedDate}
                      </small>
                    )}
                  </div>
                ) : (
                  <span className="ml-3 font-bold">
                    {formik?.values.graduatedDate}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <label className="mr-[40px] min-w-[150px] leading-9">
                  RECer:
                </label>
                {editMode2 ? (
                  <div className="relative w-[250px]">
                    <Input
                      name="recer"
                      value={formik.values.recer}
                      onChange={formik.handleChange}
                      className="w-[250px]"
                      required
                    />
                    {formik.errors.recer && (
                      <small className="absolute text-red-500 left-0 break-words block">
                        {formik.errors.recer}
                      </small>
                    )}
                  </div>
                ) : (
                  <span className="ml-3 font-bold">{formik?.values.recer}</span>
                )}
              </div>
            </dl>
            <div className="flex justify-end my-3 mt-5">
              {editMode2 && (
                <div>
                  <button
                    className="text-red-500 mx-2 underline"
                    onClick={handleCanleEdit}
                    type="button"
                  >
                    {t("Cancel")}
                  </button>
                  <button
                    className="bg-[#172554] text-white border-solid border-2 w-20 h-8 rounded-md ml-2"
                    type="button"
                    onClick={handleSubmit2}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default StudentOtherEdit;
