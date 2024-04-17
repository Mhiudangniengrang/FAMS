// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {  Modal } from "antd";
import { Button, notification } from "antd";
import { useTranslation } from "react-i18next";
import useStore from "@/hooks/useReserveStore";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getBackToClass } from "@/api/reserveApi";

function BottomReverveDetail() {
  const { reservedclassId } = useParams();
  const ReserveiD = reservedclassId;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classId, setClassId] = useState("");
  const { newclassreserveData, fetchNewClassReserve } = useStore();
  const [selectedClass, setSelectedClass] = useState(null);
  const { reserveDataDetail, fetchReserveDataDetail } = useStore();
  const { fetchReserveData } = useStore();

  const showModal = (classId) => {
    const selectedClassInfo = newclassreserveData.find(
      (classInfo) => classInfo.classId === classId
    );
    setSelectedClass(selectedClassInfo);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const res = await getBackToClass(
        reservedclassId,
        reserveDataDetail.students.studentId,
        classId
      );
      fetchReserveData();
      if (res && res.status === 200) {
        notification.success({
          message: t("Class enrollment successful!"),
          duration: 2,
        });
        navigate("/reverve/view");
      }
    } catch (error) {
      console.error("Failed to enroll class. Please try again.", error);
      notification.error({
        message: t("Failed to  enroll class"),
        description: t(error.response.data.message),
      });
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { t } = useTranslation("translation");

  useEffect(() => {
    fetchReserveDataDetail(ReserveiD);
    fetchNewClassReserve(ReserveiD);
  }, []);

  const handleClick = (classId) => {
    setClassId(classId);
    showModal(classId);
  };

  return (
    <div>
      <p data-testid="reservinginformation" className="my-3.5 font-bold">
        {t("Reserving information")}
      </p>
      <p>
        {t("Full Name")}: {reserveDataDetail?.students?.fullName}
      </p>
      <p>Email: {reserveDataDetail?.students?.email}</p>
      <p>
        {t("DOB")}: {reserveDataDetail?.students?.dob}
      </p>
      <div className="flex flex-row">
        <div className="basis-1/4 flex my-3.5">
          <p data-testid="period" className="font-bold">
            {t("Period")}:{" "}
            <p className="font-thin">
              {reserveDataDetail?.startDate} - {reserveDataDetail?.endDate}
            </p>{" "}
          </p>
        </div>
        <div className="basis-1/4 flex my-3.5">
          <p data-testid="reason" className="font-bold">
            {t("Reason")}:
            <p className="font-thin">{reserveDataDetail?.reason}</p>{" "}
          </p>
          <p data-testid="reasonwhy" className="ml-3.5"></p>
        </div>
      </div>
      <p className="border-b-4 my-8" data-testid="linebotoomfinal"></p>
      <p data-testid="reclasspossibilities" className="my-3.5 mt-5 font-bold">
        {t("Re-class possibilities")}
      </p>
      <div className="flex text" data-testid="classbox">
        {newclassreserveData.length === 0 ? (
          <p data-testid="noClassMessage">{t("No classes available")}</p>
        ) : (
          newclassreserveData.map((classInfo) => (
            <div
              className="text-center border-2 border-solid rounded-lg mt-5 pt-5 w-1/4 ml-3"
              key={classInfo.classId}
            >
              <div className="flex ml-3" data-testid="Classpossibilities">
                <Button
                  type="primary"
                  onClick={() => handleClick(classInfo.classId)}
                  className="text-black bg-slate-300 px-8"
                >
                  {classInfo.className}
                </Button>
                <p
                  className="mt-2 ml-9 text-xs text-[9px] bg-blue-700 rounded-xl text-center p-1.5 text-white"
                  data-testid="Onboarding"
                >
                  {t("On boarding")}
                </p>
              </div>
              <div className="basis-1/4 flex my-3.5 ml-2 text-[13px]">
                <p data-testid="ClassCode">{classInfo.classCode} </p>
                <p className="ml-3" data-testid="linereclass">
                  |
                </p>
                <p className="ml-3" data-testid="dateclass">
                  {classInfo?.startDate} - {classInfo?.endDate}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <div data-testid="Modalpopup">
        <Modal
          visible={isModalOpen}
          onCancel={handleCancel} // Added onCancel handler
          footer={
            <div className="">
              <Button onClick={handleCancel} className="text-red-600">
                {t("Cancel")}
              </Button>
              <Button onClick={handleOk} className=" ml-4 bg-black text-white ">
                {t("Back to class")}
              </Button>
            </div>
          }
        >
          {selectedClass && (
            <div data-testid="popupinfo">
              <h1
                className="text-center text-base font-bold uppercase"
                data-testid="reclasstittle"
              >
                {t("Re-class")}
              </h1>
              <div>
                <p className="my-2 font-bold" data-testid="clas-information">
                  <Link to={`/class/view/${classId}`}>
                    {t("Class information")}
                  </Link>{" "}
                </p>
                <p className="mt-5 font-bold" data-testid="classname-tittle">
                  {t("Class name")}
                </p>
                <p
                  className="my-2 bg-slate-200 rounded-xl p-1.5"
                  data-testid="classnamepopup"
                >
                  {selectedClass.className}
                </p>
                <p className="my-2 font-bold" data-testid="classcodetittle">
                  {t("Class code")}
                </p>
                <p
                  className="my-2 bg-slate-200 rounded-xl p-1.5"
                  data-testid="classcode"
                >
                  {selectedClass.classCode}
                </p>
                <p className="my-2 font-bold" data-testid="trainingcodetittle">
                  {t("Location")}
                </p>
                <p
                  className="trainingPrograms my-2 bg-slate-200 rounded-xl p-1.5"
                  data-testid="trainingcode"
                >
                  {t(selectedClass.location)}
                </p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default BottomReverveDetail;
