/* eslint-disable no-unused-vars */
import React, { useDeferredValue, useEffect, useState } from "react";
import { Button, Input, Table } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { DropdownBox } from "@/components";
import useClassStore from "@/hooks/useClassStore";

function ClassTable() {
  const [filterData, setFilterData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [classId, setClassId] = useState({});
  const { t } = useTranslation("translation");
  const { classData, fetchClassData, isLoadingClassList, classTotalElements } =
    useClassStore();
  const deferredSearchValue = useDeferredValue(searchValue, {
    timeoutMs: 1000,
  });

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    handleSearch(deferredSearchValue);
  }, [deferredSearchValue, classData]);

  useEffect(() => {
    if (tableParams.pagination.current) {
      (async () => {
        await fetchClassData(tableParams.pagination.current);
      })();
    }
  }, [tableParams.pagination.current]);

  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: classTotalElements,
      },
    });
  }, [classData]);

  const attendeeStyles = {
    Fresher: {
      containerBg: "#ff7568",
      spanBg: "#ff7568",
      containerWidth: "72px",
    },
    "Online fee-fresher": {
      containerBg: "green",
      spanBg: "green",
      containerWidth: "135px",
    },
    Intern: {
      containerBg: "#2D3748",
      spanBg: "#2D3748",
      containerWidth: "72px",
    },
  };

  const columns = [
    {
      title: t("Class"),
      dataIndex: "className",
      width: "15%",
      className: "column",
    },
    {
      title: t("Class Code"),
      dataIndex: "classCode",
      width: "15%",
    },
    {
      title: t("Created on"),
      dataIndex: "createdDate",
      width: "10%",
    },
    {
      title: t("Created by"),
      dataIndex: "createdBy",
      width: "15%",
    },
    {
      title: t("Duration"),
      dataIndex: "duration",
      width: "7%",
      render: (text) => (text ? `${text}  ${t("days")}` : ""),
    },
    {
      title: t("Attendee"),
      dataIndex: "attendee",
      key: "Attendee",
      render: (text) => {
        const style = attendeeStyles[text];
        if (style) {
          const containerWidth =
            text === "Online fee-fresher" ? "135px" : "72px";
          return (
            <div
              className={`flex w-[171px] h-[30px] pt-[5px] pr-[10px] pb-[5px]  gap-[5px] items-center shrink-0 flex-nowrap border-none relative z-[16] pointer`}
            >
              <div
                className={`flex w-[${containerWidth}] h-[27px] pt-[5px] pr-[15px] pb-[5px] pl-[15px] justify-center items-center shrink-0 flex-nowrap rounded-[50px] relative z-[17] bg-[${style.containerBg}]`}
              >
                <span
                  className={`h-[20px] shrink-0 text-[13px] text-[#fff] relative text-left whitespace-nowrap z-[17] bg-[${style.spanBg}]`}
                >
                  {t(text)}
                </span>
              </div>
            </div>
          );
        }
        return text;
      },
      width: "18%",
      filters: [
        { text: t("Intern"), value: "Intern" },
        { text: t("Fresher"), value: "Fresher" },
        { text: t("Online fee-fresher"), value: "Online fee-fresher" },
      ],
      onFilter: (value, record) => record.attendee === value,
    },
    {
      title: t("Location"),
      dataIndex: "location",
      width: "10%",
    },
    {
      title: "FSU",
      dataIndex: "fsu",
      width: "5%",
    },
    {
      title: "",
      dataIndex: "type",
      width: "5%",
      render: () => <DropdownBox classId={classId} />,
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const handleSearch = (value) => {
    if (!classData) {
      console.error("classData is undefined or empty");
      return;
    }

    const lowercaseValue = value.toLowerCase();
    const searchData = classData?.filter((record) => {
      return Object.values(record).some((columnValue) => {
        if (typeof columnValue === "string") {
          const lowercaseColumnValue = columnValue.toLowerCase();
          return lowercaseColumnValue.includes(lowercaseValue);
        }
        return false;
      });
    });

    setFilterData(searchData.length > 0 ? searchData : []);
  };

  const handleSort = () => {
    let sortedData = [...filterData];

    if (sortedData.length > 0) {
      sortedData = sortedData.sort((a, b) =>
        sortOrder.includes("asc")
          ? a.className.localeCompare(b.className)
          : b.className.localeCompare(a.className)
      );
      setSortOrder(sortOrder.includes("asc") ? "desc" : "asc");
      setFilterData(sortedData);
    }
  };

  const handleRowClick = (record) => {
    setClassId(record.classId);
  };

  const translatedFilterData = filterData
    ? filterData.map((item) => ({
        ...item,
        location: t(item.location),
      }))
    : null;

  const translatedClassData = classData
    ? classData.map((item) => ({
        ...item,
        location: t(item.location),
      }))
    : null;

  return (
    <div className="Class-Table">
      <div className="block sm:flex justify-between ">
        <div className="block sm:flex">
          <div>
            <Input
              placeholder="Search by..."
              className="sm:mb-5 max-w-lg sm:w-[300px] h-8"
              onChange={(e) => setSearchValue(e.target.value)}
              data-testid="inputSearch"
            />
          </div>
          <div className="md:ml-2">
            <Button
              className="text-center rounded-lg bg-[#172554] text-white"
              onClick={handleSort}
              data-testid="filterButton"
            >
              <FilterOutlined className="align-middle" />
              {t("Sort")}
            </Button>
          </div>
        </div>
      </div>
      <div className="scrollbar pagination overflow-x-auto">
        <Table
          id="myTable"
          columns={columns}
          dataSource={
            translatedFilterData ? translatedFilterData : translatedClassData
          }
          pagination={tableParams.pagination}
          loading={isLoadingClassList}
          onChange={handleTableChange}
          onRow={(record) => ({
            onClick: (e) => handleRowClick(record),
          })}
          rowKey="classId"
          data-testid="table"
        />
      </div>
    </div>
  );
}

export default ClassTable;
