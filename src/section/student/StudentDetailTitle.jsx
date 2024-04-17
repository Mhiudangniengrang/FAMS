/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { CloseOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function StudentDetailTitle({ classId }) {
  const { Title } = Typography;
  const navigate = useNavigate();
  const { t } = useTranslation("translation");
  const [getURL, setGetUrl] = useState(
    window.location.href.includes("/class/view/studentDetail/")
  );

  const handleNavigateClassList = () => {
    navigate(`/class/view/${classId}`);
  };

  const handleNavigateStudentList = () => {
    navigate("/student/view/");
  };

  return (
    <>
      <div className="relative">
        <div className="bg-[#172554] font-bold text-white p-5 rounded-t-xl mb-5">
          <span className="text-white text-2xl" data-testid="title">
            {t("Student detail")}
          </span>
        </div>
        {getURL ? (
          <div className="absolute sm:block top-0 bottom-0 right-0 text-[#fff]">
            <CloseOutlined
              className="text-xl mr-3 my-3"
              onClick={handleNavigateClassList}
              data-testid="close-button"
            />
          </div>
        ) : (
          <div className="absolute sm:block top-0 bottom-0 right-0 text-[#fff]">
            <CloseOutlined
              className="text-xl mr-3 my-3"
              onClick={handleNavigateStudentList}
              data-testid="close-button"
            />
          </div>
        )}
      </div>
    </>
  );
}

StudentDetailTitle.propTypes = {
  classId: PropTypes.string.isRequired,
};

export default StudentDetailTitle;
