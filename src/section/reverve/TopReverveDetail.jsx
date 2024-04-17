// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {Spin} from "antd"
import useStore from "@/hooks/useReserveStore";
import useStoree from "@/hooks/useScoreStore";
function TopReverveDetail() {
  const { t } = useTranslation("translation");
  const { reservedclassId } = useParams();
  const ReserveiD = reservedclassId;
  const { reserveDataDetail, fetchReserveDataDetail } = useStore();
  const { studentScoreData, fetchStudentScoreDetail } = useStoree();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReserveDataDetail(ReserveiD);
    fetchStudentScoreDetail(    reserveDataDetail?.classes?.classId,
      reserveDataDetail?.students?.studentId).then(() => {
      setIsLoading(false);
    }).catch((error) => {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Ensure loading state is turned off even if there's an error
    });
  }, []);
  return (
    <>
      <div>
        <div>
          <h1
            className="uppercase  text-2xl font-thin my-3.5 "
            data-testid="devopsfoundation "
          >
            devops foundation
          </h1>
          <p className="" data-testid="HCM22_FR_DevOps_01 ">
            HCM22_FR_DevOps_01 | 12/03/2021-12/09/2021
          </p>
          <p className="border-b-4 mt-3.5" data-testid="line"></p>
        </div>
        <div className="mt-3.5">
          <p className="my-5 font-bold" data-testid="studentscore">
            {t("Student score")}
          </p>
          <div className="flex my-8">
            <p className="font-bold" data-testid="currentmodule">
              {t("Current module")}
            </p>
            <p className="ml-3.5" data-testid="Loremipsummodule">
              Lorem ipsum {t("module")}
            </p>
          </div>
          {isLoading ? (
            <div className="text-center">
              <Spin size="large" />
            </div>
          ) :(
          <div>
          <p className="my-3.5 font-bold" data-testid="FEE">
            FEE
          </p>
          
          <div
            className=" overflow-x-scroll whitespace-nowrap flex space-x-4"
            data-testid="scroll"
          >
           
           <div
                className=" text-center border-2 border-solid "
                data-testid="quiztable"
              >
                <p className="bg-slate-800 rounded-t-lg text-white p-1">
                  {t("Quiz")}
                </p>
                <div className="flex text-center justify-between bg-[#ecf1f7] ">
                  {[
                    "HTML Quiz",
                    "CSS Quiz",
                    "Quiz 4",
                    "Quiz 5",
                    "Quiz 6",
                    "Average",
                  ].map((assignmentName, index) => {
                    const score = studentScoreData?.allScore?.find(
                      (score) => score.assignmentName === assignmentName
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
                          <p className="mt-4 mr-3">{score?.score || "N/A"}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className=" text-center border-2 border-solid rounded-t-lg"
                data-testid="Asmtable"
              >
                <p className="bg-slate-800 rounded-t-lg text-white p-1">{t("ASM")}</p>
                <div className="flex text-center justify-between bg-[#ecf1f7] ">
                  {[
                    "Practice Exam 1",
                    "Practice Exam 2",
                    "Practice Exam 3",
                    "Average",
                  ].map((assignmentName, index) => {
                    const score = studentScoreData?.allScore?.find(
                      (score) => score.assignmentName === assignmentName
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
                          <p className="mt-4  mr-3">{score?.score || "N/A"}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className=" text-center border-2 border-solid rounded-t-lg"
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
                            <p className="mt-4  mr-3">
                              {score?.score || "N/A"}
                            </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
          </div>
          <div className="">
        <div className="flex flex-row">
          <p className="my-3.5 font-bold" data-testid="MOCK">
            {t("MOCK")}
          </p>
        </div>
        <div
            className="text-center border-2 border-solid rounded-t-lg w-fit mt-2"
            data-testid="Mocktable"
          >
            <p className="bg-[#D45B13] rounded-t-lg text-white p-1">{t("MOCK")}</p>
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
                      <p className="mt-4  mr-3">{score?.score || "N/A"}</p>
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
      </div>
      )}
          <p className="border-b-4 my-8" data-testid="lineend"></p>
        </div>
      </div>
    </>
  );
}

export default TopReverveDetail;
