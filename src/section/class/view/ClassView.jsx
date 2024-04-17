// eslint-disable-next-line no-unused-vars
import React from "react";
import { useTranslation } from "react-i18next";
import ClassTable from "@/section/class/ClassTable";

function ClassView() {
  const { t } = useTranslation("translation");

  return (
    <>
      <div className="min-w-[250px]">
        <div className="bg-[#172554] p-5 rounded-t-xl">
          <p className="text-2xl text-[#fff] font-bold">
            {t("Training Class")}
          </p>
        </div>
        <div className="p-5" data-testid="classTable">
          <ClassTable />
        </div>
      </div>
    </>
  );
}

export default ClassView;
