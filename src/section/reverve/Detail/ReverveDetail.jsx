/* eslint-disable no-unused-vars */
import React from "react";
import TopReverveDetail from "@/section/reverve/TopReverveDetail";
import BottomReverveDetail from "@/section/reverve/BottomReverveDetail";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ReverveDetail() {
  const { t } = useTranslation("translation");
  return (
    <div className="min-w-[350px]">
      <div className="bg-[#172554] p-5 flex rounded-t-xl">
        <h1 className="w-full text-2xl text-center font-bold text-white  ">
          {t("Reserving Detail")}
        </h1>
        <Link to="/reverve/view" className="text-white">
          <CloseOutlined />
        </Link>
      </div>
      <div className="p-5" data-testid="classTable">
        <TopReverveDetail />
        <BottomReverveDetail />
      </div>
    </div>
  );
}

export default ReverveDetail;
