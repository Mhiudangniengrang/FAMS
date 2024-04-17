/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Tabs } from "antd";
import ScoreTable from "@/section/class/ScoreTable";
import ActivitiesLog from "@/section/setting/ActivitiesLog";
import StudentList from "@/section/class/StudentList";

const MenuBar = ({ classDetailData }) => {
  const { TabPane } = Tabs;
  const { t } = useTranslation("translation");

  const items = [
    {
      tab: (
        <div data-testid="training-program-tab">
          <p>{t("Training program")}</p>
        </div>
      ),
      key: "General",
      className: "training-tab",
      content: <h1>{t("Training Program Here")}</h1>,
    },
    {
      tab: (
        <div data-testid="student-list-tab">
          <p>{t("Student list")}</p>
        </div>
      ),
      key: "Student",
      className: "student-tab",
      content: (
        <>
          <div className="header">
            <h1 className="font-semibold text-black text-2xl mb-3">
              {t("Student Management")}
            </h1>
          </div>
          {classDetailData && classDetailData.classId && (
            <StudentList classId={classDetailData?.classId} />
          )}
        </>
      ),
    },
    {
      tab: (
        <div data-testid="budget-list-tab">
          <p>{t("Budget List")}</p>
        </div>
      ),
      key: "BudgetList",
      className: "budget-tab",
      content: <h1>{t("Budget here")}</h1>,
    },
    {
      tab: (
        <div data-testid="score-list-tab">
          <p>{t("Scores")}</p>
        </div>
      ),
      key: "Scores",
      className: "score-tab",
      content: (
        <>
          <div className="header">
            <h1 className="font-semibold text-black text-2xl mb-3">
              {t("Score Management")}
            </h1>
          </div>
          {classDetailData && classDetailData.classId && (
            <ScoreTable classId={classDetailData.classId} />
          )}
        </>
      ),
    },
    {
      tab: (
        <div data-testid="activities-log-tab">
          <p>{t("Activities log")}</p>
        </div>
      ),
      key: "Log",
      className: "log-tab",
      content: (
        <>
          <div className="header">
            <h1 className="font-semibold text-black text-2xl mb-4">
              {t("Activities Logs")}
            </h1>
          </div>
          <ActivitiesLog />
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="main-container">
        <Tabs defaultActiveKey="Scores" type="card" theme="light">
          {items.map((item) => (
            <TabPane tab={item.tab} key={item.key} className={item.className}>
              {item.content}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

MenuBar.propTypes = {
  classDetailData: PropTypes.any.isRequired,
};

export default MenuBar;
