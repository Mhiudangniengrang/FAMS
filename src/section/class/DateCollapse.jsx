/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Collapse } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import Calendar from "@/section/class/Calendar";

const DateCollapse = React.memo(() => {
  const [dateStrings, setDateStrings] = useState(null);
  const { t } = useTranslation("translation");

  const handleDateChange = (newDates, newDateStrings) => {
    var formatDateStrings = newDateStrings.map((dateString, index) => {
      if (index === 1) {
        return ` \u00A0to\u00A0 ${dateString}`;
      }
      return dateString;
    });
    setDateStrings(formatDateStrings);
  };

  const items = [
    {
      key: "1",
      label: (
        <div>
          <CalendarOutlined />{" "}
          <span className="font-bold">
            {t("Time Frame")} &nbsp;{" "}
            <span
              className="font-thin text-[14px] italic"
              data-testid="dateStrings"
            >
              {dateStrings}
            </span>
          </span>
        </div>
      ),
      children: <Calendar onDateChange={handleDateChange} />,
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

DateCollapse.displayName = "DateCollapse";

export default DateCollapse;
