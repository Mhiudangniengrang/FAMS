// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { notification, Modal, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { DownloadOutlined } from "@ant-design/icons";
import useClassStore from "@/hooks/useClassStore";
import useAuth from "@/hooks/useAuth";

const StudentTableExportInClass = ({ classId }) => {
  const { t } = useTranslation("translation");
  const { classDetailData, fetchClassDetail } = useClassStore();
  const { infoUser } = useAuth();
  const [classCode, setClassCode] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [resetColumns, setResetColumns] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (classId) {
      fetchClassDetail(classId);
    }
  }, [classId, fetchClassDetail]);

  useEffect(() => {
    if (classDetailData) {
      setClassCode(classDetailData.classCode);
    }
  }, [classDetailData]);

  const handleDownload = () => {
    if (infoUser.roleName === "ROLE_TRAINER") {
      notification.warning({
        message: t("Export Failed"),
        description: t("You don't have permission to export student file."),
        duration: 2,
      });
      return;
    }
    if (selectedColumns.length === 0) {
      notification.warning({
        message: t("Export Failed"),
        description: t("Please select at least one column to export."),
        duration: 2,
      });
      return;
    }
    const translatedColumns = selectedColumns.map((column) => t(column));
    const fieldsQueryString = translatedColumns.join("&selectedFields=");
    const apiURL = `https://laundryservice.me/api/v1/student-class-management/export?selectedFields=${fieldsQueryString}&classCode=${classCode}`;
    const link = document.createElement("a");
    link.href = apiURL;
    link.download = `Student List In ${classCode}.xlsx`;
    document.body.appendChild(link);
    link.click();
    notification.success({
      message: t("Download Successful"),
      description:t("Download student list Successful"),
      duration: 2,
    });
    setModalVisible(false);
    setSelectedColumns(resetColumns);
  };

  const handleModalOpen = () => {
    if (infoUser.roleName === "ROLE_TRAINER") {
      notification.warning({
        message: t("Export Failed"),
        description: t("You don't have permission to export student file."),
        duration: 2,
      });
      return;
    }
    setResetColumns(selectedColumns);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedColumns(resetColumns);
    setModalVisible(false);
  };

  const handleCheckboxChange = (column) => {
    const currentIndex = selectedColumns.indexOf(column);
    const newSelectedColumns = [...selectedColumns];

    if (currentIndex === -1) {
      newSelectedColumns.push(column);
    } else {
      newSelectedColumns.splice(currentIndex, 1);
    }
    setSelectedColumns(newSelectedColumns);
  };

  return (
    <div>
      <button
        type="button"
        className="px-4 py-2 bg-[#ea580c] text-white rounded-md hover:bg-[#ea580c] focus:outline-none  focus:border-[#ea580c] mx-3 "
        onClick={handleModalOpen}
      >
        <DownloadOutlined />
        &nbsp;{t("Export")}
      </button>

      <Modal
        title={t("Select Columns to Export")}
        open={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <button
            key="cancel"
            onClick={handleModalClose}
            className="text-red-500 mr-2"
          >
            {t("Cancel")}
          </button>,
          <button
            key="save"
            onClick={handleDownload}
            className="bg-[#172554] text-white border-solid border-2 w-20 h-8 rounded-md mt-5"
          >
            {t("Export")}
          </button>,
        ]}
      >
        <div className="flex justify-center items-start flex-col">
          {["full_name", "dob", "email", "phone", "gpa", "re_cer"].map(
            (column) => (
              <Checkbox
                key={column}
                onChange={() => handleCheckboxChange(column)}
                checked={selectedColumns.includes(column)}
              >
                {column === "full_name"
                  ? t("Name")
                  : column === "dob"
                  ? t("Date of birth")
                  : column === "email"
                  ? t("Email")
                  : column === "phone"
                  ? t("Phone")
                  : column === "gpa"
                  ? t("GPA")
                  : column === "re_cer"
                  ? t("Recer")
                  : t(column)}
              </Checkbox>
            )
          )}
        </div>
      </Modal>
    </div>
  );
};

StudentTableExportInClass.propTypes = {
  classId: PropTypes.number.isRequired,
};

export default StudentTableExportInClass;
