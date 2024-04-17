/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Modal, Select, notification } from "antd";
import PropTypes from "prop-types";
import useStudentStore from "@/hooks/useStudentStore";
import useAuth from "@/hooks/useAuth";

function StudentEditStatus({
  classId,
  attendingStatus,
  studentIds,
  onUpdateSuccess,
  ...props
}) {
  const { t } = useTranslation("translation");
  const [showUpdate, setShowUpdate] = useState(false);
  const { fetchEditStatusStudent } = useStudentStore();
  const [newStatus, setNewStatus] = useState("InClass");
  const { infoUser } = useAuth();

  const { checkedList, handleUpdateCheckedList } = props;

  const handleUpdateStudent = () => {
    if (infoUser.roleName === "ROLE_TRAINER") {
      notification.warning({
        message: t("Update Failed"),
        description: t(
          "You don't have permission to update status of student."
        ),
        duration: 2,
      });
      return;
    }

    if (checkedList.length === 0) {
      notification.info({
        message: t("Notification"),
        description: t("Please choose student to update."),
        duration: 2,
      });
      return;
    }
    const firstStatus = checkedList[0].attendingStatus;
    const shouldUpdate = checkedList.every(
      (student) => student.attendingStatus === firstStatus
    );

    if (!shouldUpdate) {
      notification.error({
        message: t("Please select students with the same attending status"),
        duration: 2,
      });
      return;
    }
    setShowUpdate(true);
  };
  const handleCancel = () => {
    setShowUpdate(false);
  };
  const handleSave = async () => {
    setShowUpdate(false);
    try {
      const studentIds = checkedList.map((student) => student.studentId);
      await fetchEditStatusStudent(classId, newStatus, studentIds);
      handleUpdateCheckedList([]);
      onUpdateSuccess();
    } catch (error) {
      console.error("Error updating status:", error);
      notification.error({
        message: "Failed to update status",
        duration: 2,
      });
    }
  };

  const handleOk = () => {
    setShowUpdate(false);
  };

  return (
    <div data-testid="update" className="flex justify-end mb-4">
      <button
        onClick={handleUpdateStudent}
        className="px-4 py-2 bg-[#a1a1aa] text-white rounded-md hover:bg-[#a1a1aa] focus:outline-none  focus:border-[#a1a1aa] "
      >
        <EditOutlined />
        &nbsp;{t("Update Student")}
      </button>
      <Modal
        open={showUpdate}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        closable={false}
        width={420}
        height={150}
        // style={{ top: "50%", transform: "translateY(-100%)" }}
        footer={[
          <button
            key="cancel"
            onClick={handleCancel}
            className="text-red-500 mr-2"
          >
            {t("Cancel")}
          </button>,
          <button
            key="save"
            onClick={handleSave}
            className="bg-[#172554] text-white border-solid border-2 w-20 h-8 rounded-md mt-5"
          >
            {t("Save")}
          </button>,
        ]}
      >
        <div className="text-[#172554] flex items-center font-thin my-2 pr-15">
          <span className="font-bold text-base ">{t("Update status")}</span>
        </div>
        <hr />
        <div className="my-3">
          <p>
            {t("Are you sure update status")}
            <b>{checkedList.length}</b> {t("student")} ?
          </p>
        </div>
        <div className="flex justify-between">
          <b>{t("New status")}</b>
          <Select
            defaultValue="InClass"
            style={{ width: 200 }}
            onChange={(value) => setNewStatus(value)}
          >
            <Select.Option value="InClass">{t("InClass")}</Select.Option>
            <Select.Option value="DropOut">{t("DropOut")}</Select.Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
}
StudentEditStatus.propTypes = {
  classId: PropTypes.any.isRequired,
};
export default StudentEditStatus;
