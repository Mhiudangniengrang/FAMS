/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Input, Tooltip } from "antd";
import {
  PlusCircleOutlined,
  SearchOutlined,
  FilterFilled,
  EditFilled,
} from "@ant-design/icons";
import ModalEmail from "@/section/setting/ModalEmail";
import { useTranslation } from "react-i18next";
import ModalCreate from "@/section/setting/ModalCreate";
import ModalDescription from "@/section/setting/ModalDescription";
import useEmailStore from "@/hooks/useEmailStore";

export default function Email() {
  // Desctructure the state and the function from the store
  const { fetchData, emailData, isLoadingEmail } = useEmailStore();

  // For Vietnamese translation
  const { t } = useTranslation("translation");

  // Search term
  const [searchTerm, setSearchTerm] = useState("");

  // States for Email component (for the edit button)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Modify showModal function (for the edit button)
  const showModal = (record) => {
    setModalData(record);
    setIsModalVisible(true);
  };

  // States for ModalCreate component (for the create button)
  const [anotherState, setAnotherState] = useState(false);
  const [anotherModalData, setanotherModalData] = useState(null);

  // Function to handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Filter feature
  const [filterStatus, setFilterStatus] = useState(null);

  const handleFilter = () => {
    if (filterStatus === null) {
      setFilterStatus(true);
    } else if (filterStatus === true) {
      setFilterStatus(false);
    } else {
      setFilterStatus(null);
    }
  };

  // Filtered data based on search term and filter status
  const filteredData = emailData
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => filterStatus === null || item.status === filterStatus);

  // Truncate text for Description column
  const [isModalDescriptionVisible, setIsModalDescriptionVisible] =
    useState(false);
  const [modalDescriptionData, setModalDescriptionData] = useState(null);

  // Show modal for Description
  const showModalDescription = (record) => {
    setModalDescriptionData(record.description);
    setIsModalDescriptionVisible(true);
  };

  // Function to get tooltip message
  const getTooltipMessage = () => {
    if (filterStatus === null) {
      return t("Click to display status Active");
    } else if (filterStatus === true) {
      return t("Click to display status Inactive");
    } else {
      return t("Click to cancel filtering");
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  // Table columns
  const columns = [
    {
      title: t("Name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) =>
        a.name.trim().toLowerCase().localeCompare(b.name.trim().toLowerCase()),
        showSorterTooltip: false,
    },
    {
      title: t("Status"),
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          className={`inline-block w-25 text-center py-1 rounded ${
            status ? "bg-green-500 text-white" : "bg-gray-500 text-white"
          }`}
        >
          {status ? t("Active") : t("Inactive")}
        </Tag>
      ),
    },
    {
      title: t("Description"),
      dataIndex: "description",
      key: "description",
      render: (text, record) => {
        const words = text.split(" ");
        const truncatedText = words
          .slice(0, 10) // Change this number to desired number of words
          .join(" "); // Join the words back together
        const displayText = truncatedText;

        return (
          <div
            className={`overflow-hidden cursor-pointer whitespace-nowrap max-w-[280px] truncate`}
            onClick={() => showModalDescription(record)}
            dangerouslySetInnerHTML={{ __html: displayText }}
          />
        );
      },
    },
    {
      title: t("Categories"),
      dataIndex: "type",
      key: "categories",
      filters: [
        { text: t("Inform"), value: "Inform" },
        { text: t("Remind"), value: "Remind" },
        { text: t("Other"), value: "Other" },
      ],
      onFilter: (value, record) => {
        const translationMap = {
          'Thông báo': 'Inform',
          'Nhắc nhở': 'Remind',
          'Khác': 'Other',
        };
        const recordValue = translationMap[record.type] || record.type;
        return recordValue.indexOf(value) === 0;
      },
      render: (text) => <div>{t(text)}</div>,
    },
    {
      title: "",
      key: "",
      render: (data) => (
        <>
          <Button
            type=""
            icon={<EditFilled />}
            className="bg-blue-500 hover:bg-blue-700 text-white"
            onClick={() => showModal(data)}
          >
            {t("Edit")}
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span data-testid="input">
            <Input
              placeholder={t("Search...")}
              prefix={<SearchOutlined />}
              className="w-72 ..." // Full width
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </span>
          <Tooltip title={getTooltipMessage()}>
            <span data-testid="filterbutton">
              <Button
                type=""
                icon={<FilterFilled />}
                className="bg-blue-500 hover:bg-blue-700 text-white"
                onClick={handleFilter}
              >
                {t("Filter")}
              </Button>
            </span>
          </Tooltip>
        </div>
        <span data-testid="createbutton">
          <Button
            type=""
            icon={<PlusCircleOutlined />}
            className="bg-blue-500 hover:bg-blue-700 text-white"
            // Open the modal for creating new data (ModalCreate)
            onClick={() => setAnotherState(true)}
          >
            {t("Create")}
          </Button>
        </span>
      </div>
      <div data-testid="table">
        <span data-testid="editbutton">
          <Table
            className="mt-4"
            columns={columns}
            dataSource={filteredData}
            pagination={true}
            loading={isLoadingEmail}
            onChange={handleTableChange}
          />
        </span>
      </div>

      {/* Pass the state and setters as props to ModalEmail */}
      <div data-testid="modalemail">
        <ModalEmail
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          modalData={modalData}
          setModalData={setModalData}
          fetchData={fetchData} // Pass fetchData as a prop
        />
      </div>

      {/* Pass the state and setters as props to ModalCreate */}
      <div data-testid="modalcreate">
        <ModalCreate
          anotherState={anotherState}
          setAnotherState={setAnotherState}
          anotherModalData={anotherModalData}
          setanotherModalData={setanotherModalData}
          fetchData={fetchData} // Pass fetchData as a prop
        />
      </div>

      {/* Pass the state and setters as props to ModalDescription */}
      <div data-testid="modaldescription">
        <ModalDescription
          isModalVisible={isModalDescriptionVisible}
          setIsModalVisible={setIsModalDescriptionVisible}
          modalData={modalDescriptionData}
        />
      </div>
    </>
  );
}
