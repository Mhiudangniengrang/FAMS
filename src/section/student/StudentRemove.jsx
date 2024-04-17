import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import useStudentStore from "@/hooks/useStudentStore";
import { useTranslation } from "react-i18next";

const StudentRemove = ({ classId, page, ...props }) => {
  const {
    deleteStudent,
    deletefullName,
    isModalOpenDelete,
    setIsModalOpenDelete,
    onUpdateSuccess,
  } = props;
  const { t } = useTranslation("translation");
  const { fetchStudentRemove } = useStudentStore();
  const handleDelete = async () => {
    try {
      const res = await fetchStudentRemove(deleteStudent, classId);
      if (res && res.status === 200) {
        setIsModalOpenDelete(false);
        await onUpdateSuccess();
      }
    } catch (error) {
      setIsModalOpenDelete(true);
    }
  };

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
StudentRemove.propTypes = {
  classId: PropTypes.any.isRequired,
};
export default StudentRemove;
