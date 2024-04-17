// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  BookOutlined,
  CloseOutlined,
  FontColorsOutlined,
  FormOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function ClassName({ classDetailData }) {
  const { t } = useTranslation("translation");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/class/view");
  };

  return (
    <>
      <div className="relative text-[#fff] bg-[#172554] p-5 grid grid-cols-3 items-center min-w-[250px] rounded-t-xl">
        <div className="col-span-2">
          <span
            className="text-[18px] sm:text-2xl font-bold"
            data-testid="class"
          >
            {t("Class")}
          </span>
          <div className="relative">
            <div className="flex items-center" data-testid="className">
              <p className="text-2xl sm:text-4xl py-2 font-bold tracking-widest inline-block">
                {classDetailData?.className}
              </p>
              <div className="text-[8px] px-3 sm:text-[16px] ml-5 bg-[#f5f5f5] text-[#000000] sm:px-5 py-1 rounded-3xl border border-black">
                {t("Planning")}
              </div>
            </div>
            <p
              className="text-[13px] sm:text-sm font-bold"
              data-testid="classNameDetail"
            >
              {classDetailData?.classCode}
            </p>
            <div className="h-[1px] max-w-[550px] bg-[#fff] mt-2"></div>
          </div>
          <div className="pt-2 inline-block" data-testid="classTime">
            <span className="text-xl sm:text-2xl font-bold">31&nbsp;</span>
            <span className="text-[12px] sm:text-[14px]">
              {t("days")}&nbsp;
            </span>
            <span className="text-[12px] sm:text-[14px] italic">
              (97 {t("hours")})
            </span>
          </div>
          <div className="inline-block my-2 mx-3 bg-[#fff] w-[1px] h-[18px] align-bottom"></div>
          <div className="inline-block text-sm sm:text-xl">
            <div className="flex gap-3" data-testid="icons">
              <BookOutlined /> <UserOutlined /> <FontColorsOutlined />
              <FormOutlined />
            </div>
          </div>
        </div>
        <div className="hidden sm:block col-span-1 text-end mr-5 ">
          <MoreOutlined className="rotate text-5xl " />
        </div>
        <div className="absolute sm:block top-0 right-0">
          <CloseOutlined
            className="text-xl mr-3 my-3"
            onClick={handleNavigate}
          />
        </div>
      </div>
    </>
  );
}

ClassName.propTypes = {
  classDetailData: PropTypes.object.isRequired,
};

export default ClassName;
