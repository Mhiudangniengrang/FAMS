/* eslint-disable no-unused-vars */
import React from "react";
import Email from "@/section/setting/Email";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";

function Maill() {
  const { Title } = Typography;
  const { t } = useTranslation("translation");

  return (
    <>
      <div className="bg-[#172554] text-white p-5 rounded-t-xl">
        <span className="text-white text-2xl font-bold">
          {t("Email Template")}
        </span>
      </div>
      <div className="p-5">
        <Email />
      </div>
    </>
  );
}

export default Maill;
