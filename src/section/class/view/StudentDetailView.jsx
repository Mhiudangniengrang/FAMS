/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";
import StudentGeneralEdit from "@/section/student/StudentGeneralEdit";
import StudentOtherEdit from "@/section/student/StudentOtherEdit";
import useStudentStore from "@/hooks/useStudentStore";
import StudentDetailTitle from "@/section/student/StudentDetailTitle";
import BottomStudentScoreDetail from "@/section/class/BottomStudentScoreDetail";
import useStudentDetailByClass from "@/hooks/useStudentClassStore";

function StudentDetailView() {
  const { id, classId } = useParams();
  const { t } = useTranslation("translation");
  const {
    studentDataDetail,
    fetchStudentDataDetail,
    fetchStudentEdit,
    fetchClassInformation,
    classStudentData,
  } = useStudentStore();

  const { studentDetailByClass, fetchStudentDetailByClass } =
    useStudentDetailByClass();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editMode2, setEditMode2] = useState(false);
  const [editMode3, setEditMode3] = useState(false);

  useEffect(() => {
    if (classId && id) {
      (async () => {
        await fetchStudentDetailByClass(id, classId);
      })();
    }
  }, [id, classId, studentDetailByClass.status]);

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
        .min(10, "Phone number is not valid")
        .max(10, "Phone number is not valid")
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
    }),
  });
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
    formik.setFieldValue(
      "attendingStatus",
      studentDetailByClass.attendingStatus
    );
  }, [studentDataDetail, studentDetailByClass]);

  return (
    <>
      <div data-testid="studentDetailTitle">
        <StudentDetailTitle classId={classId} />
      </div>
      <div data-testid="general">
        <StudentGeneralEdit
          editMode={editMode}
          handleEditMode={setEditMode}
          setLoading={setLoading}
          formik={formik}
          id={id}
          classId={classId}
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
      <div data-testid="scoreDetail">
        <BottomStudentScoreDetail
          classId={classId}
          studentDetailByClass={studentDetailByClass}
          editMode3={editMode3}
          handleEditMode={setEditMode3}
        />
      </div>
    </>
  );
}

export default StudentDetailView;
