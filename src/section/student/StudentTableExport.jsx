import React from "react";
import { useTranslation } from "react-i18next";
import { DownloadOutlined } from "@ant-design/icons";
import { notification } from "antd";

const StudentTableExport = () => {
  const { t } = useTranslation("translation");
  const handleDownload = () => {
    const selectedFields = [
      "students.full_name",
      "dob",
      "email",
      "phone",
      "gpa",
      "students.re_cer",
    ];
    if (selectedFields.length > 0) {
      const fieldsQueryString = selectedFields.join("&selectedFields=");
      const apiURL = `https://laundryservice.me/api/v1/student-management/export?selectedFields=${fieldsQueryString}`;
      const link = document.createElement("a");
      link.href = apiURL;
      link.download = "Student_List.xlsx";
      document.body.appendChild(link);
      link.click();
      notification.success({
        message: t("Download Successful"),
        description:t("Download student list Successful"),
        duration: 2,
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <button
        type="button"
        className="px-4 py-2 bg-[#ea580c] text-white rounded-md hover:bg-[#ea580c] focus:outline-none  focus:border-[#ea580c] mx-3 "
        onClick={handleDownload}
      >
        <DownloadOutlined />
        &nbsp;{t("Export")}
      </button>
    </div>
  );
};

export default StudentTableExport;
