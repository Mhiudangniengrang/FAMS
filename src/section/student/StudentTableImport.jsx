// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Button, notification } from "antd";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import PropTypes from "prop-types";
import useStudentStore from "@/hooks/useStudentStore";
import useClassStore from "@/hooks/useClassStore";
import useAuth from "@/hooks/useAuth";

function StudentTableImport({ ...props }) {
  const { t } = useTranslation("translation");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { fetchImportStudent } = useStudentStore();
  const { infoUser } = useAuth();

  const [file, setFile] = useState(null);
  const { classDetailData } = useClassStore();
  const [classCode, setClassCode] = useState("");

  useEffect(() => {
    if (classDetailData) {
      setClassCode(classDetailData.classCode);
    }
  }, [classDetailData]);

  const showModal = () => {
    if (infoUser.roleName === "ROLE_ADMIN") {
      setIsModalVisible(true);
    } else {
      notification.warning({
        message: t("Import Failed"),
        description: t("You don't have permission to import student file."),
        duration: 2,
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFile(null);
    document.getElementById("fileInput").value = null;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    notification.info({
      message: t("Notification"),
      description: "File " + file.name + t(" is selected"),
      duration: 2,
    });
    setFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      notification.error({
        message: t("Please select a file to import."),
        duration: 2,
      });
      return;
    }
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        await fetchImportStudent(file, classCode);
        setIsModalVisible(false);
        setFile(null);
        props.onImportSuccess();
      } catch (error) {
        console.error("Error importing", error);
      }
    };
    document.getElementById("fileInput").value = null;
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "https://laundryservice.me/api/v1/student-management/template";
    link.download = "TemplateDssv.xlsx";
    link.click();
  };
  return (
    <div>
      <button
        className="px-3 py-2 bg-[#16a34a] text-white rounded-md hover:bg-[#16a34a] focus:outline-none focus:border-[#16a34a]"
        onClick={showModal}
      >
        <UploadOutlined /> &nbsp; {t("Import")}
      </button>

      <Modal
        title={
          <div className="text-center font-bold">{t("Import Student")}</div>
        }
        open={isModalVisible}
        closable={false}
        footer={
          <div className="mt-4 ml-80 space-x-2 flex flex-row">
            <Button
              key="back"
              onClick={handleCancel}
              className="rounded-lg border-0 text-red-500 underline"
            >
              {t("Cancel")}
            </Button>
            <Button
              className="flex items-center gap-[5px] rounded-lg bg-[#2D3748] text-white "
              onClick={handleSubmit}
            >
              {t("Import")}
            </Button>
          </div>
        }
      >
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row items-center ">
              <p className="mb-4 font-bold"> {t("Import setting")}</p>
              <div className="flex flex-col mt-6">
                <div className="flex flex-row justify-between">
                  <p className="ml-9 font-light">{t("File")}</p>
                  <p className="ml-1 text-red-500">*</p>
                  <div data-testid="Select">
                    <Button className="bg-[#2D3748] text-white rounded-lg px-2 py-1 ml-40">
                      <label htmlFor="fileInput">{t("Select file")}</label>
                      <input
                        id="fileInput"
                        type="file"
                        accept=".xls, .xlsx"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="ml-9 font-light">{t("Import template")}</p>
                  <a
                    className="ml-[5.75rem] underline text-[#60a5fa] flex"
                    href="#"
                    onClick={handleDownload}
                  >
                    {t("Download")}
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
StudentTableImport.propTypes = {
  classId: PropTypes.number,
  page: PropTypes.number,
};
export default StudentTableImport;
