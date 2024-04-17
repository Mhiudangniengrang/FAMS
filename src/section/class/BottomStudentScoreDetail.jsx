// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input, Typography, notification } from "antd";
import { EditOutlined } from "@ant-design/icons";
import useScoreStore from "@/hooks/useScoreStore";
import useStudentClassStore from "@/hooks/useStudentClassStore";
import useStudentStore from "@/hooks/useStudentStore";

import { Loading } from "@/components";

function BottomStudentScoreDetail({
  studentDetailByClass,
  classId,
  handleEditMode,
  editMode3,
}) {
  const {
    fetchStudentScoreDetail,
    studentScoreData,
    updateStudentScore,
    isLoadingStudentScoreData,
  } = useScoreStore();
  const { fetchStudentDetailByClass } = useStudentClassStore();
  const { fetchStudentDataDetail } = useStudentStore();
  const { id } = useParams();
  const { t } = useTranslation("translation");

  useEffect(() => {
    if (classId && id) {
      (async () => {
        await fetchStudentScoreDetail(classId, id);
      })();
    }
  }, [classId, id]);

  //validate input
  const validationSchema = Yup.object().shape(
    studentScoreData?.allScore?.reduce((acc, score) => {
      acc[`score_${score.scoreId}`] = Yup.number()
        .transform((value, originalValue) => {
          const isNumber = !isNaN(originalValue);
          return isNumber ? value : "";
        })
        .typeError("Score must be a number")
        .min(0, "Score must not be less than 0")
        .max(10, "Score must not exceed 10")
        .required("Score must not be empty");
      return acc;
    }, {})
  );

  const formik = useFormik({
    initialValues: {
      scoreId: "",
      score: "",
      scoreName: "",
      scoreType: "",
    },
    validationSchema,
  });

  useEffect(() => {
    if (studentScoreData && studentScoreData.allScore) {
      studentScoreData.allScore.forEach((score) => {
        formik.setFieldValue(`scoreId_${score.scoreId}`, score.scoreId);
        formik.setFieldValue(`score_${score.scoreId}`, score.score);
        formik.setFieldValue(
          `scoreName_${score.scoreId}`,
          score.assignmentName
        );
        formik.setFieldValue(
          `scoreType_${score.scoreId}`,
          score.assignmentType
        );
      });
    }
  }, [studentScoreData.allScore]);

  const handleCancelEdit = () => {
    handleEditMode(false);
    if (studentScoreData && studentScoreData.allScore) {
      studentScoreData.allScore.forEach((score) => {
        formik.setFieldValue(`scoreId_${score.scoreId}`, score.scoreId);
        formik.setFieldValue(`score_${score.scoreId}`, score.score);
        formik.setFieldValue(
          `scoreName_${score.scoreId}`,
          score.assignmentName
        );
        formik.setFieldValue(
          `scoreType_${score.scoreId}`,
          score.assignmentType
        );
        formik.setFieldTouched(`score_${score.scoreId}`, false); // Set the field as not touched
        formik.setFieldError(`score_${score.scoreId}`, undefined); // Clear the field error
      });
    }
  };
  const handleSave = async () => {
    try {
      // Check if the form is valid before submitting
      if (!formik.isValid) {
        notification.error({
          message: t("Invalid form"),
          description: t(
            "Score must be a number and between 0 and 10. Please check your input."
          ),
          duration: 2,
        });
        return;
      }
      // Create an object that maps each scoreId to its corresponding score, assignment name, and assignment type.
      // This is done by reducing the allScore array to an object.
      const initialScores = studentScoreData.allScore.reduce((acc, score) => {
        acc[`score_${score.scoreId}`] = score.score;
        acc[`scoreName_${score.scoreId}`] = score.assignmentName;
        acc[`scoreType_${score.scoreId}`] = score.assignmentType;
        return acc;
      }, {});
      // Convert formik.values (an object) into an array of [key, value] pairs using Object.entries
      const scores = Object.entries(formik.values)
        .filter(([key]) => key.startsWith("score_"))
        .map(([key, value]) => {
          const scoreId = key.split("_")[1];
          return {
            scoreId: scoreId,
            score: value,
            scoreName: formik.values[`scoreName_${scoreId}`],
            scoreType: formik.values[`scoreType_${scoreId}`],
          };
        })
        .filter((score) => {
          // Only include scores that have changed
          return (
            (score.score !== initialScores[`score_${score.scoreId}`] ||
              score.scoreName !== initialScores[`scoreName_${score.scoreId}`] ||
              score.scoreType !==
                initialScores[`scoreType_${score.scoreId}`]) &&
            score.scoreName !== "Average"
          );
        });
      const data = await updateStudentScore(classId, id, scores);
      if (data && data.status === 200) {
        await Promise.all([
          await fetchStudentScoreDetail(classId, id),
          fetchStudentDetailByClass(id, classId),
          fetchStudentDataDetail(id),
        ]);
        handleEditMode(false);
      }
    } catch (error) {
      console.error("Error submit", error);
    }
  };

  const renderStatus = (feeModule) => {
    const statusMap = {
      true: {
        className: "bg-[green]",
        text: t("Passed"),
      },
      false: {
        className: "bg-[#ff7568]",
        text: t("Failed"),
      },
      null: {
        className: "",
        text: "-",
      },
    };
    const { status } = feeModule || {};
    const { className, text } = statusMap[status] || statusMap.null;
    return (
      <div className="flex w-[100px] h-[30px] pt-[5px] pr-[10px] pb-[5px] gap-[5px] items-center shrink-0 flex-nowrap border-none relative z-[16] pointer">
        <div
          className={`flex w-[72px] h-[27px] pt-[5px] pr-[15px] pb-[5px] pl-[15px] justify-center items-center shrink-0 flex-nowrap rounded-[50px] relative z-[17] ${className}`}
        >
          <span className="h-[20px] shrink-0 text-[13px] text-[#fff] relative text-left whitespace-nowrap z-[17]">
            {text}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Typography
        className="bg-zinc-400 text-white px-6 py-2 rounded-md text-base flex justify-between"
        data-testid="scoreTypography"
      >
        {t("Score")}
        {!editMode3 && (
          <button
            onClick={() => {
              if (
                !studentScoreData.allScore ||
                studentScoreData.allScore.length === 0
              ) {
                notification.warning({
                  message: t("Update Failed"),
                  description: t(
                    "There are no scores available to update. Please import the scores first before attempting to update."
                  ),
                  duration: 3,
                });
              } else {
                handleEditMode(true);
              }
            }}
            data-testid="editButton"
          >
            <EditOutlined />
          </button>
        )}
      </Typography>
      {isLoadingStudentScoreData ? (
        <Loading />
      ) : (
        <div className="p-4">
          <div className="">
            <div>
              <h1
                className="uppercase text-2xl font-thin my-3.5 tracking-widest"
                data-testid="devopsfoundation "
              >
                {studentDetailByClass?.className}
              </h1>
              <p
                className="font-bold text-[16px] mt-3.5"
                data-testid="HCM22_FR_DevOps_01"
              >
                {studentDetailByClass?.classCode}
              </p>
              <hr className="border-b-4" />
            </div>
            {/* Fee Module */}
            <div className="mt-3.5">
              <div className="flex flex-row">
                <div>
                  <p className="my-3.5 font-bold" data-testid="feeModule">
                    FEE
                  </p>
                </div>
                <div className="my-2.5 ml-3">
                  {renderStatus(studentScoreData?.feeModule)}
                </div>
              </div>
              <div
                className=" overflow-x-scroll mt-2 whitespace-nowrap flex space-x-4 scrollbar"
                data-testid="scroll"
              >
                {/* Quiz Table */}
                <div
                  className=" text-center border-2 border-solid shadow-lg rounded-t-xl"
                  data-testid="quiztable"
                >
                  <p className="bg-slate-800 rounded-t-lg text-white p-1">
                    {t("Quiz")}
                  </p>
                  <div className="flex text-center justify-between bg-[#ecf1f7] ">
                    {[
                      "HTML Quiz",
                      "CSS Quiz",
                      "Quiz 3",
                      "Quiz 4",
                      "Quiz 5",
                      "Quiz 6",
                      "Average",
                    ].map((assignmentName, index) => {
                      const score = studentScoreData?.allScore?.find(
                        (score) =>
                          score.assignmentName === assignmentName &&
                          score.assignmentType === "Quiz"
                      );

                      const nameMap = {
                        "HTML Quiz": "HTML",
                        "CSS Quiz": "CSS",
                        "Quiz 4": "Quiz 4",
                        "Quiz 5": "Quiz 5",
                        "Quiz 6": "Quiz 6",
                        Average: "Ave.",
                      };

                      const newName = nameMap[assignmentName] || assignmentName;

                      return (
                        <div
                          key={index}
                          className="border-r border-slate-300	ml-3.5 w-[130px] h-20"
                        >
                          <p className="mt-2  mr-3">{t(newName)}</p>
                          {editMode3 && assignmentName !== "Average" ? (
                            <div>
                              <Input
                                className={`mt-3 mr-3 w-[40px] h-[30px] text-center border border-solid rounded-md ${
                                  formik.touched[`score_${score?.scoreId}`] &&
                                  formik.errors[`score_${score?.scoreId}`]
                                    ? "border-red-600"
                                    : "border-slate-600"
                                }`}
                                name={`score_${score?.scoreId}`}
                                value={
                                  formik.values[`score_${score?.scoreId}`] || ""
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                          ) : (
                            <p className="mt-4 mr-3">{score?.score || "N/A"}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Assignment Table */}
                <div
                  className=" text-center border-2 border-solid rounded-t-lg shadow-lg"
                  data-testid="Asmtable"
                >
                  <p className="bg-slate-800 rounded-t-lg text-white p-1">
                    {t("ASM")}
                  </p>
                  <div className="flex text-center justify-between bg-[#ecf1f7] ">
                    {[
                      "Practice Exam 1",
                      "Practice Exam 2",
                      "Practice Exam 3",
                      "Average",
                    ].map((assignmentName, index) => {
                      const score = studentScoreData?.allScore?.find(
                        (score) =>
                          score.assignmentName === assignmentName &&
                          score.assignmentType === "ASM"
                      );

                      const nameMap = {
                        "Practice Exam 1": "Practice 1",
                        "Practice Exam 2": "Practice 2",
                        "Practice Exam 3": "Practice 3",
                        Average: "Ave.",
                      };

                      const newName = nameMap[assignmentName] || assignmentName;
                      return (
                        <div
                          key={index}
                          className="border-r border-slate-300 ml-3.5 w-[130px] h-20"
                        >
                          <p className="mt-2  mr-3">{t(newName)}</p>
                          {editMode3 && assignmentName !== "Average" ? (
                            <div>
                              <Input
                                className={`mt-3 mr-3 w-[40px] h-[30px] text-center border border-solid rounded-md ${
                                  formik.touched[`score_${score?.scoreId}`] &&
                                  formik.errors[`score_${score?.scoreId}`]
                                    ? "border-red-600"
                                    : "border-slate-600"
                                }`}
                                name={`score_${score?.scoreId}`}
                                value={
                                  formik.values[`score_${score?.scoreId}`] || ""
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                          ) : (
                            <p className="mt-4  mr-3">
                              {score?.score || "N/A"}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className=" text-center border-2 border-solid rounded-t-lg shadow-lg"
                  data-testid="Finaltable"
                >
                  <p className="bg-slate-800 rounded-t-lg text-white p-1">
                    {t("Final")}
                  </p>
                  <div className="flex text-center justify-between bg-[#ecf1f7]  ">
                    {["Quiz Final", "Practice Final", "Audit"].map(
                      (assignmentName, index) => {
                        const score = studentScoreData?.allScore?.find(
                          (score) => score.assignmentName === assignmentName
                        );
                        return (
                          <div
                            key={index}
                            className="border-r border-slate-300 ml-3.5 w-[130px] h-20"
                          >
                            <p className="mt-2 mr-3">{t(assignmentName)}</p>
                            {editMode3 ? (
                              <div>
                                <Input
                                  className={`mt-3 mr-3 w-[40px] h-[30px] text-center border border-solid rounded-md ${
                                    formik.touched[`score_${score?.scoreId}`] &&
                                    formik.errors[`score_${score?.scoreId}`]
                                      ? "border-red-600"
                                      : "border-slate-600"
                                  }`}
                                  name={`score_${score?.scoreId}`}
                                  value={
                                    formik.values[`score_${score?.scoreId}`] ||
                                    ""
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                              </div>
                            ) : (
                              <p className="mt-4  mr-3">
                                {score?.score || "N/A"}
                              </p>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Mock Module */}
          <div>
            <div className="">
              <div className="flex flex-row">
                <p className="my-3.5 font-bold" data-testid="feeMockModule">
                  {t("MOCK")}
                </p>
                <div className="my-2.5 ml-3">
                  {renderStatus(studentScoreData?.mockModule)}
                </div>
              </div>
            </div>
            {/* Mock Table */}
            <div
              className="text-center border-2 border-solid rounded-t-lg w-fit mt-2 shadow-lg "
              data-testid="Mocktable"
            >
              <p className="bg-[#D45B13] rounded-t-lg text-white p-1">
                {" "}
                {t("MOCK")}{" "}
              </p>
              <div className="flex text-center justify-between bg-[#ecf1f7]">
                {["MOCK"].map((assignmentName, index) => {
                  const score = studentScoreData?.allScore?.find(
                    (score) => score.assignmentName === assignmentName
                  );
                  return (
                    <div
                      key={index}
                      className="border-r border-slate-300 ml-3.5 w-[130px] h-20"
                    >
                      <p className="mt-2  mr-3">{t(assignmentName)}</p>
                      {editMode3 ? (
                        <div>
                          <Input
                            className={`mt-3 mr-3 w-[40px] h-[30px] text-center border border-solid rounded-md ${
                              formik.touched[`score_${score?.scoreId}`] &&
                              formik.errors[`score_${score?.scoreId}`]
                                ? "border-red-600"
                                : "border-slate-600"
                            }`}
                            name={`score_${score?.scoreId}`}
                            value={
                              formik.values[`score_${score?.scoreId}`] || ""
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      ) : (
                        <p className="mt-4  mr-3">{score?.score || "N/A"}</p>
                      )}
                    </div>
                  );
                })}
                {studentScoreData?.mockModule && (
                  <div className="flex">
                    {[
                      {
                        label: t("Final"),
                        value: studentScoreData.mockModule.moduleScore,
                      },
                      {
                        label: t("GPA"),
                        value: studentScoreData.mockModule.moduleScore,
                      },
                      {
                        label: t("Level"),
                        value: studentScoreData.mockModule.moduleLevel,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="border-r border-slate-300 ml-3.5 w-[130px] h-20"
                      >
                        <p className="mt-2 mr-3">{item.label}</p>
                        <p className="mt-4 mr-3">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end my-3 mt-5">
            {editMode3 && (
              <div>
                <button
                  className="text-red-500 mx-2 underline"
                  onClick={handleCancelEdit}
                  type="button"
                >
                  {t("Cancel")}
                </button>
                <button
                  className="bg-[#172554] text-white border-solid border-2 w-20 h-8 rounded-md ml-2"
                  type="button"
                  onClick={handleSave}
                >
                  {t("Save")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

BottomStudentScoreDetail.propTypes = {
  studentDetailByClass: PropTypes.object.isRequired,
  classId: PropTypes.string.isRequired,
  handleEditMode: PropTypes.any.isRequired,
  editMode3: PropTypes.bool.isRequired,
};

export default BottomStudentScoreDetail;
