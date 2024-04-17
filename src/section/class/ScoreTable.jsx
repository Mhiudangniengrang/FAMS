/* eslint-disable no-unused-vars */
import React, { useDeferredValue, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Button, Input, Table } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import ImportButton from "@/section/class/ImportButton";
import useScoreStore from "@/hooks/useScoreStore";
function ScoreTable({ classId }) {
  const { Column, ColumnGroup } = Table;
  const { fetchScoreData, isLoadingScoreData, scoreData } = useScoreStore();
  const { t } = useTranslation("translation");
  const [listScore, setListScore] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [refreshKey, setRefreshKey] = useState(0);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      showLessItems: true,
      showSizeChanger: false,
    },
  });
  const deferredSearchValue = useDeferredValue(searchValue, {
    timeoutMs: 1000,
  });

  const customIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4 inline-block"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
      />
    </svg>
  );

  useEffect(() => {
    handleSearch(deferredSearchValue);
  }, [deferredSearchValue, listScore]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (classId && tableParams.pagination.current) {
          const res = await fetchScoreData(
            classId,
            tableParams.pagination.current
          );
          if (res && res.status === 200) {
            setListScore(res.data.content);
          }
        }
      } catch (err) {
        setListScore([]);
      }
    };

    fetchData();
  }, [classId, tableParams.pagination.current, refreshKey]);

  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: scoreData.totalElements,
      },
    });
  }, [listScore]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const handleSearch = (value) => {
    if (!listScore) {
      console.error("No data found");
      return;
    }

    const lowercaseValue = value.toLowerCase();
    const searchData = listScore?.filter((record) => {
      const fullName = record?.classResult?.fullName;
      const studentCode = record?.classResult?.studentCode;

      if (fullName && fullName.toLowerCase().includes(lowercaseValue)) {
        return true;
      }
      if (studentCode && studentCode.toLowerCase().includes(lowercaseValue)) {
        return true;
      }
      return false;
    });

    setFilterData(searchData.length > 0 ? searchData : []);
  };

  const handleSort = () => {
    let sortedData = [...filterData];

    if (sortedData.length > 0) {
      sortedData = sortedData.sort((a, b) =>
        sortOrder.includes("asc")
          ? a.classResult.fullName.localeCompare(b.classResult.fullName)
          : b.classResult.fullName.localeCompare(a.classResult.fullName)
      );
      setSortOrder(sortOrder.includes("asc") ? "desc" : "asc");
      setFilterData(sortedData);
    }
  };

  const renderStatus = (feeModule) => {
    const statusMap = {
      true: {
        className: "bg-[green]",
        text: t("Passed"),
      },
      false: {
        className: "bg-[#ff7568]",
        text: t("Failed"),
      },
      null: {
        className: "bg-[#172554]",
        text: "Null",
      },
    };
    const { status } = feeModule || {};
    const { className, text } = statusMap[status] || statusMap.null;

    return (
      <div className="flex w-[100px] h-[30px] pt-[5px] pr-[10px] pb-[5px] gap-[5px] items-center shrink-0 flex-nowrap border-none relative z-[16] pointer">
        <div
          className={`flex w-[72px] h-[27px] pt-[5px] pr-[15px] pb-[5px] pl-[15px] justify-center items-center shrink-0 flex-nowrap rounded-[50px] relative z-[17] ${className}`}
        >
          <span className="h-[20px] shrink-0 text-[13px] text-[#fff] relative text-left whitespace-nowrap z-[17]">
            {text}
          </span>
        </div>
      </div>
    );
  };

  const renderMockStatus = (mockModule) => {
    const statusMap = {
      true: {
        className: "bg-[green]",
        text: t("Passed"),
      },
      false: {
        className: "bg-[#ff7568]",
        text: t("Failed"),
      },
      null: {
        className: "bg-[#172554]",
        text: "Null",
      },
    };
    const { status } = mockModule || {};
    const { className, text } = statusMap[status] || statusMap.null;

    return (
      <div className="flex w-[100px] h-[30px] pt-[5px] pr-[10px] pb-[5px] gap-[5px] items-center shrink-0 flex-nowrap border-none relative z-[16] pointer">
        <div
          className={`flex w-[72px] h-[27px] pt-[5px] pr-[15px] pb-[5px] pl-[15px] justify-center items-center shrink-0 flex-nowrap rounded-[50px] relative z-[17] ${className}`}
        >
          <span className="h-[20px] shrink-0 text-[13px] text-[#fff] relative text-left whitespace-nowrap z-[17]">
            {text}
          </span>
        </div>
      </div>
    );
  };

  const renderColumn = (title, assignmentName, dataIndex) => ({
    title: (
      <div className="w-[140px]">
        {title}
        <span className="ml-2">{customIcon}</span>
      </div>
    ),
    dataIndex: dataIndex,
    render: (allScore) => {
      const score = allScore?.find(
        (score) => score.assignmentName === assignmentName
      );
      return score && score.score !== undefined ? score.score : "N/A";
    },
  });

  return (
    <div className="Class-Table">
      <div className="block lg:flex justify-between">
        <div className="block md:flex">
          <div data-testid="searchButton">
            <Input
              placeholder={t("Search by...")}
              className="sm:mb-5 max-w-lg sm:w-[300px] h-8"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="md:ml-2" data-testid="filterButton">
            <Button
              className="text-center rounded-lg bg-[#2d3748] text-white"
              onClick={handleSort}
            >
              <FilterOutlined className="align-middle " />
              {t("Sort")}
            </Button>
          </div>
        </div>
        <div
          className="flex space-x-0 sm:space-x-2 flex-wrap mb-5"
          data-testid="addButton"
        >
          <div data-testid="ImportButton">
            <ImportButton
              classId={classId}
              page={tableParams.pagination.current}
              onImportSuccess={() => setRefreshKey((prevKey) => prevKey + 1)}
            />
          </div>
        </div>
      </div>
      <div data-testid="scoreTable" className="scrollbar pagination">
        <Table
          id="myTable"
          pagination={tableParams.pagination}
          loading={isLoadingScoreData}
          onChange={handleTableChange}
          className="scrollbar overflow-x-auto z-30"
          dataSource={filterData ? filterData : listScore}
          theme="light"
          rowKey="classId"
        >
          <Column
            title={
              <div className="relative  w-[100px]">
                {t("Full Name")}
                <span className="ml-2">{customIcon}</span>
              </div>
            }
            dataIndex="classResult"
            key="fullName"
            render={(classResult) =>
              classResult && classResult.fullName ? classResult.fullName : "N/A"
            }
            className="column"
          />
          <Column
            title={
              <div className="relative  w-[100px]">
                {t("Account")}
                <span className="ml-2">{customIcon}</span>
              </div>
            }
            dataIndex="classResult"
            render={(classResult) =>
              classResult && classResult.studentCode
                ? classResult.studentCode
                : "N/A"
            }
          />
          <ColumnGroup title={t("Quiz")}>
            {[
              { title: "HTML", assignmentName: "HTML Quiz" },
              { title: "CSS", assignmentName: "CSS Quiz" },
              { title: t("Quiz 3"), assignmentName: "Quiz 3" },
              { title: t("Quiz 4"), assignmentName: "Quiz 4" },
              { title: t("Quiz 5"), assignmentName: "Quiz 5" },
              { title: t("Quiz 6"), assignmentName: "Quiz 6" },
              { title: t("Avg"), assignmentName: "Average" },
            ].map((column, index) => (
              <Column
                key={index}
                {...renderColumn(
                  column.title,
                  column.assignmentName,
                  "allScore"
                )}
              />
            ))}
          </ColumnGroup>
          <ColumnGroup title={t("ASM")}>
            {[
              { title: t("Practice 1"), assignmentName: "Practice Exam 1" },
              { title: t("Practice 2"), assignmentName: "Practice Exam 2" },
              { title: t("Practice 3"), assignmentName: "Practice Exam 3" },
              { title: t("Avg"), assignmentName: "Average" },
            ].map((column, index) => (
              <Column
                key={index}
                {...renderColumn(
                  column.title,
                  column.assignmentName,
                  "allScore"
                )}
              />
            ))}
          </ColumnGroup>
          <Column
            title={
              <div className="relative w-[140px]">
                {t("Quiz Final")}
                <span className="ml-2">{customIcon}</span>
              </div>
            }
            dataIndex="allScore"
            render={(allScore) => {
              const quizFinalScore = allScore?.find(
                (score) => score.assignmentName === "Quiz Final"
              );
              return quizFinalScore ? quizFinalScore.score : "N/A";
            }}
          />
          <Column
            title={
              <div className="relative  w-[140px]">
                {t("Audit")}
                <span className="ml-2">{customIcon}</span>
              </div>
            }
            dataIndex="allScore"
            render={(allScore) => {
              const auditScore = allScore?.find(
                (score) => score.assignmentName === "Audit"
              );
              return auditScore ? auditScore.score : "N/A";
            }}
          />
          <Column
            title={
              <div className="relative w-[160px]">
                {t("Practice Final")}
                <span className="ml-2">{customIcon}</span>
              </div>
            }
            dataIndex="allScore"
            render={(allScore) => {
              const auditScore = allScore?.find(
                (score) => score.assignmentName === "Audit"
              );
              return auditScore ? auditScore.score : "N/A";
            }}
          />
          <Column
            title={
              <div className="relative w-[140px]">
                {t("Final Module")}
                <span className="ml-2">{customIcon}</span>
              </div>
            }
            dataIndex="feeModule"
            render={(feeModule) =>
              feeModule && feeModule.moduleScore ? feeModule.moduleScore : "N/A"
            }
          />
          <Column
            title={
              <div className="relative w-[140px]">
                {t("GPA Module")}
                <span className="ml-2">{customIcon}</span>
              </div>
            }
            dataIndex="feeModule"
            render={(feeModule) =>
              feeModule && feeModule.moduleScore ? feeModule.moduleScore : "N/A"
            }
          />
          <Column
            title={
              <div className="relative w-[140px]">
                {t("Level Module")}
                <span className="ml-2">{customIcon}</span>
              </div>
            }
            dataIndex="feeModule"
            render={(feeModule) =>
              feeModule && feeModule.moduleLevel ? feeModule.moduleLevel : "N/A"
            }
          />
          <Column
            title={
              <div className="relative w-[120px]">{t("Status")}</div>
            }
            dataIndex="feeModule"
            render={renderStatus}
            filters={[
              { text: t("Passed"), value: true },
              { text: t("Failed"), value: false },
            ]}
            onFilter={(value, record) => record.feeModule.status === value}
          />
          <Column
            title={
              <div className="relative w-[140px]">
                {t("Mocks")}
                <span className="ml-2">{customIcon}</span>
              </div>
            }
            dataIndex="allScore"
            render={(allScore) => {
              const mockScore = allScore?.find(
                (score) => score.assignmentName === "MOCK"
              );
              return mockScore ? mockScore.score : "N/A";
            }}
          />
          <Column
            title={
              <div className="relative w-[140px]">
                {t("Final Module")}
                <span className="ml-2">{customIcon}</span>
              </div>
            }
            dataIndex="mockModule"
            render={(mockModule) =>
              mockModule && mockModule.moduleScore
                ? mockModule.moduleScore
                : "N/A"
            }
          />
          <Column
            title={
              <div className="relative  w-[140px]">
                {t("GPA Module")}
                <span className="ml-2">{customIcon}</span>
              </div>
            }
            dataIndex="mockModule"
            render={(mockModule) =>
              mockModule && mockModule.moduleScore
                ? mockModule.moduleScore
                : "N/A"
            }
          />
          <Column
            title={
              <div className="relative w-[140px]">
                {t("Level Module")}
                <span className="ml-2">{customIcon}</span>
              </div>
            }
            dataIndex="mockModule"
            render={(mockModule) =>
              mockModule && mockModule.moduleLevel
                ? mockModule.moduleLevel
                : "N/A"
            }
          />
          <Column
            title={
              <div className="relative w-[120px]">{t("Status")}</div>
            }
            dataIndex="mockModule"
            render={renderMockStatus}
            filters={[
              { text: t("Passed"), value: true },
              { text: t("Failed"), value: false },
            ]}
            onFilter={(value, record) => record.mockModule.status === value}
          />
        </Table>
      </div>
    </div>
  );
}

ScoreTable.propTypes = {
  classId: PropTypes.number.isRequired,
};

export default ScoreTable;
