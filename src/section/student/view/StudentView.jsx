// eslint-disable-next-line no-unused-vars
import React from "react";
import StudentTable from "@/section/student/StudentTable";
import { useTranslation } from "react-i18next";

function StudentView() {
  const { t } = useTranslation("translation");

  return (
    <div className="scrollbar overflow-x-auto z-30">
      <div className="bg-[#172554] p-5 rounded-t-xl">
        <p className="text-white text-2xl font-bold"> {t("Student List")}</p>
      </div>
      <div className="px-5" data-testid="studentTable">
        <StudentTable />
      </div>
    </div>
  );
}

export default StudentView;
