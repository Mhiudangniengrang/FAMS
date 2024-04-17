import React, { useEffect } from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import useStudentStore from "@/hooks/useStudentStore";
import { useTranslation } from "react-i18next";
const StudentTableDelete = (props) => {
  const { id } = useParams;
  const {
    deleteStudent,
    deletefullName,
    isModalOpenDelete,
    setIsModalOpenDelete,
  } = props;
  const { fetchStudentDelete, fetchStudentData } = useStudentStore();

  useEffect(() => {
    if (id) {
      fetchStudentDelete(id);
    }
  }, [id]);
  const handleDelete = async () => {
    try {
      await fetchStudentDelete(deleteStudent);
      setIsModalOpenDelete(false);
      fetchStudentData({
        page: props.page,
      });
    } catch (error) {
      console.error("Error deleting student:", error);
      setIsModalOpenDelete(true);
    }
  };
  const { t } = useTranslation("translation");
  const handleCancel = () => {
    setIsModalOpenDelete(false);
  };
  return (
    <>
      <Modal
        open={isModalOpenDelete}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Delete"
        closable={false}
        width={350}
        height={150}
        // style={{ top: "50%", transform: "translateY(-50%)" }}
        footer={[
          <button
            key="cancel"
            onClick={handleCancel}
            className="text-red-500 mr-2"
          >
            {t("Cancel")}
          </button>,
          <button
            key="delete"
            onClick={handleDelete}
            className="bg-[#172554] text-white border-solid border-2 w-20 h-8 rounded-md mt-5"
          >
            {t("Delete")}
          </button>,
        ]}
      >
        <div className="text-[#172554] flex items-center font-thin my-2 pr-15">
          <ExclamationCircleOutlined className="mr-2 text-red-500" />
          <span className="font-bold text-base ">
            {t("Delete Student")} {""} {deletefullName}
          </span>
        </div>
        <hr className="w-full mb-0 border border-[#172554]" />
        <div className="my-3">
          <p>
            {" "}
            {t("Are you sure to delete student")} {deletefullName}?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default StudentTableDelete;
