  // eslint-disable-next-line no-unused-vars
import React from "react";
import { Table } from "antd";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useEmailStore from "@/hooks/useEmailStore";
export default function ActivitiesLog() {
  const { fetchActivitilogs, activitilogsData, isLoadingActivitylogs } =
    useEmailStore();
  const { t } = useTranslation("translation");

  // Fetch data from the API
  useEffect(() => {
    fetchActivitilogs();
  }, []);

  // Table columns
  const columns = [
    {
      title: t("SenderName"),
      dataIndex: "senderName",
      sorter: true,
      width: "20%",
    },
    {
      title: t("SenderEmail"),
      dataIndex: "senderEmail",
      width: "25%",
    },

    {
      title: t("Content"),
      render: (record) => <p>{t(record.content)}</p>,
      width: "30%",
    },
    {
      title: t("sendDate"),
      dataIndex: "sendDate",
      width: "15%",
    },
    {
      title: t("receiverType"),
      render: (record) => <p>{t(record.receiverType)}</p>,
      width: "10%",
    },
  ];
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      showLessItems: true,
      showSizeChanger: false,
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  return (
    <div>
      <Table
        columns={columns}
        loading={isLoadingActivitylogs}
        dataSource={activitilogsData}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </div>
  );
}
