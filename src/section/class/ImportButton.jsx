// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Button, notification } from "antd";
import useScoreStore from "@/hooks/useScoreStore";

function ImportButton({ classId, page, onImportSuccess }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { importScoreData, fetchScoreData, downloadScoreTemplate } =
    useScoreStore();
  const { t, i18n } = useTranslation("translation");
  const [isTranslated, setIsTranslated] = useState(i18n.language === "vie");
  const [option, setOption] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };
  React.useEffect(() => {
    const handleLanguageChange = () => setIsTranslated(i18n.language === "vie");
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  const handleCancel = () => {
    setSelectedFile(null);
    setOption("");
    setIsModalVisible(false);
    document.getElementById("fileInput").value = null;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    notification.info({
      message: t("File selected"),
      description: t("File ") + file.name + t(" has been selected"),
      duration: 3,
    });
    setSelectedFile(file);
  };

  const handleImport = async () => {
    if (selectedFile) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      // Add more parameters to the formData if needed
      let reader = new FileReader();
      reader.onload = async () => {
        // Call importScoreData directly
        const response = await importScoreData(classId, option, formData);
        if (response && response.status === 200) {
          await fetchScoreData(classId, page);
          if (onImportSuccess) {
            onImportSuccess(); // Call the callback function
          }
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    } else {
      notification.warning({
        message: t("No file selected"),
        description: t("Please select a file to import"),
        duration: 2,
      });
    }
  };

  const handleDownload = async () => {
    try {
      const response = await downloadScoreTemplate();
      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "score_template.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Remove the link when done
      } else {
        console.error("Error: Unable to download file");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <div data-testid="importButton">
        <Button
          className="flex h-8 py-2 px-[10px] items-center gap-[5px] rounded-lg bg-[green] text-white"
          onClick={showModal}
        >
          <UploadOutlined className="align-middle" />
          {t("Import")}
        </Button>
      </div>
      <div data-testid="importModal">
        <Modal
          title={
            <div className="text-center font-bold  ">{t("Import Score")}</div>
          }
          open={isModalVisible}
          closable={false}
          footer={
            <div
              className="mt-4 ml-80 space-x-2 flex flex-row"
              data-testid="footerButton"
            >
              <Button
                key="back"
                onClick={handleCancel}
                className="rounded-lg border-0 text-red-500 underline"
              >
                {t("Cancel")}
              </Button>
              <Button
                className="flex items-center gap-[5px] rounded-lg bg-[#2D3748] text-white "
                onClick={handleImport}
              >
                {t("Import")}
              </Button>
            </div>
          }
        >
          <form onSubmit={handleImport}>
            <div className="flex flex-row items-center ">
              <p className="mb-4 font-bold">{t("Import setting")}</p>
              <div className="flex flex-col mt-6">
                <div className="flex flex-row justify-between">
                  <p className="ml-9 font-light">{t("File")}</p>
                  <p className="ml-1 text-red-500	">*</p>
                  <div data-testid="upload">
                    <div data-testid="uploadButton">
                      <Button className="bg-[#2D3748] text-white rounded-lg px-2 py-1 ml-40">
                        <label htmlFor="fileInput">{t("Select File")}</label>
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
                </div>
                <div className="flex flex-row mt-2">
                  <p className="ml-9 font-light ">{t("Import template")}</p>
                  <a
                    className={`underline text-[#60a5fa] ${
                      isTranslated ? "ml-[9.75rem]" : "ml-[5.75rem]"
                    }`}
                    onClick={handleDownload}
                  >
                    {t("Download")}
                  </a>
                </div>
              </div>
            </div>
            <hr className="mt-4 border-t-3" />
            <div className="flex flex-row items-center mt-4">
              <p className="mb-7 font-bold"> {t("Duplicate control")}</p>
              <div className="flex flex-col">
                <p className="ml-4 mb-2">{t("Duplicate handle")}</p>
                <div className="flex ml-4">
                  <label className="inline-flex items-center mr-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="radio"
                      value="allow"
                      checked={option === "allow"}
                      onChange={(e) => setOption(e.target.value)}
                    />
                    <span className="ml-1">{t("Allow")}</span>
                  </label>
                  <label className="inline-flex items-center mr-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="radio"
                      value="replace"
                      checked={option === "replace"}
                      onChange={(e) => setOption(e.target.value)}
                    />
                    <span className="ml-1">{t("Replace")}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="radio"
                      value="skip"
                      checked={option === "skip"}
                      onChange={(e) => setOption(e.target.value)}
                    />
                    <span className="ml-1">{t("Skip")}</span>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}

ImportButton.propTypes = {
  classId: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onImportSuccess: PropTypes.func,
};

export default ImportButton;
