// eslint-disable-next-line no-unused-vars
import React from "react";
import { useTranslation } from "react-i18next";
import { Collapse } from "antd";
import { StarOutlined } from "@ant-design/icons";

const AttendeeCollapse = React.memo(() => {
  const { t } = useTranslation("translation");

  const items = [
    {
      key: "1",
      label: (
        <div>
          <StarOutlined />{" "}
          <span className="font-bold text-[14px]">
            {t("Attendee")} &nbsp; <span className="font-thin"></span>
          </span>
        </div>
      ),
      children: (
        <div className="border grid grid-cols-3 rounded-lg">
          <div className="bg-[#99a6bece] pt-4 pb-4 xl:p-4 text-center leading-7 font-bold rounded-bl-lg rounded-tl-lg">
            <div>{t("Planned")}</div>
            <div className="text-2xl" data-testid="numberOfPlanneds">
              10
            </div>
          </div>
          <div className="bg-[#a3aeb9c7] text-center pt-4 pb-4 xl:p-4 leading-7 font-bold">
            <div>{t("Accepted")}</div>
            <div className="text-2xl" data-testid="numberOfAccepts">
              9
            </div>
          </div>
          <div className="bg-[#d3d3d3d2] text-center pt-4 pb-4 xl:p-4 leading-7 font-bold rounded-br-lg rounded-tr-lg">
            <div>{t("Actual")}</div>
            <div className="text-2xl" data-testid="numberOfActual">
              9
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div data-testid="collapse">
      <Collapse
        items={items}
        bordered={false}
        defaultActiveKey={["1"]}
        className="bg-[#a4acb994] rounded-lg"
      />
    </div>
  );
});

AttendeeCollapse.displayName = "AttendeeCollapse";

export default AttendeeCollapse;
