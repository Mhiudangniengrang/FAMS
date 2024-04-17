import React from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { PlusCircleOutlined } from "@ant-design/icons";
import StudentTableAddReserve from "./StudentTableAddReserve";

const StudentReservingEdit = (props) => {
  const { setOpenReserve, openReserve } = props;
  const { t } = useTranslation("translation");
  const showModalReserve = () => {
    setOpenReserve(true);
  };

  return (
    <div>
      <Typography className="bg-zinc-400 text-white px-6 py-2 rounded-md text-base">
        {t("Reserving")}
      </Typography>
      <div className="flex justify-center my-6">
        <button
          type="button"
          className="px-4 py-2 bg-[#172554] text-white rounded-md hover:bg-[#172554] focus:outline-none focus:border-[#172554]"
          onClick={showModalReserve}
        >
          <PlusCircleOutlined />
          &nbsp;{t("Add Reserving")}
        </button>
        <StudentTableAddReserve
          openReserve={openReserve}
          setOpenReserve={setOpenReserve}
        />
      </div>
    </div>
  );
};
export default StudentReservingEdit;
