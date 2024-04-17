// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Input, Table, Dropdown, Menu } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  EllipsisOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import StudentTableAddNew from "@/section/student/StudentTableAddNew";
import StudentTableDelete from "./StudentTableDelete";
import { useTranslation } from "react-i18next";
import StudentTableExport from "./StudentTableExport";
import useStudentStore from "@/hooks/useStudentStore";

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
const StudentTable = () => {
  const [searchValue, setSearchValue] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [deleteStudent, setdeleteStudent] = useState(null);
  const [deletefullName, setdeletefullName] = useState(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchOnPageChange, setSearchOnPageChange] = useState("");
  const {
    studentData,
    studentDataFull,
    fetchStudentData,
    isLoadingStudentData,
  } = useStudentStore();
  const { t } = useTranslation("translation");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      showLessItems: true,
      showSizeChanger: false,
    },
  });
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      fetchStudentData();
    }
  }, [id]);

  useEffect(() => {
    fetchStudentData({
      page: tableParams.pagination.current,
    });
  }, [tableParams.pagination.current]);

  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: studentDataFull?.totalElements,
      },
    });
  }, [studentData]);

  useEffect(() => {
    handleSearch(searchOnPageChange || searchValue);
  }, [searchValue, studentData, searchOnPageChange]);
  const columns = [
    {
      title: (
        <>
          {t("Full Name")}
          <span className="m1-1">{customIcon}</span>
        </>
      ),
      dataIndex: "fullName",
      width: "20%",
      render: (text, record) => (
        <Link to={`/student/view/${record.studentId}`}>{text}</Link>
      ),
    },
    {
      title: (
        <>
          {t("Date of birth")}
          <span className="ml-1">{customIcon}</span>
        </>
      ),
      dataIndex: "dob",
      width: "15%",
    },
    {
      title: (
        <>
          {t("Email address")}
          <span className="ml-1">{customIcon}</span>
        </>
      ),
      dataIndex: "email",
      width: "15%",
    },
    {
      title: (
        <>
          {t("Phone")}
          <span className="ml-1">{customIcon}</span>
        </>
      ),
      dataIndex: "phone",
      width:"15%"
    },
    {
      title: (
        <>
          {t("GPA")}
          <span className="ml-1">{customIcon}</span>
        </>
      ),
      dataIndex: "gpa",
      width: "10%",
    },
    {
      title: (
        <>
          {t("REcer")}
          <span className="ml-1">{customIcon}</span>
        </>
      ),
      dataIndex: "recer",
      width: "10%",
    },
    {
      title: (
        <>
          <span className="height text-lg">
            {" "}
            <SettingOutlined />{" "}
          </span>
        </>
      ),
      dataIndex: studentData.id,
      width: "5%",
      render: (record) => (
        <Dropdown
          overlay={menu(record)}
          placement="bottomRight"
          trigger={["click"]}
        >
          <EllipsisOutlined className="text-lg cursor-pointer" />
        </Dropdown>
      ),
    },
  ];

  const menu = (record) => (
    <Menu>
      <Menu.Item key="edit">
        <a onClick={() => handleMenuClick("edit", record.studentId)}>
          <EditOutlined />
          &nbsp;{t("Edit Student")}
        </a>
      </Menu.Item>
      <Menu.Item key="delete">
        <a
          onClick={() =>
            handleMenuClick("delete", record.studentId, record.fullName)
          }
        >
          <DeleteOutlined />
          &nbsp;{t("Delete Student")}
        </a>
      </Menu.Item>
    </Menu>
  );

  const handleMenuClick = (action, record, fullName) => {
    if (action === "delete") {
      setdeleteStudent(record);
      setdeletefullName(fullName);
      showModalDelete();
    }

    if (action === "edit") {
      navigate("/student/view/" + record);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalDelete = () => {
    setIsModalOpenDelete(true);
  };

  const handleSearch = (value) => {
    if (studentData && studentData.length > 0) {
      const searchData = studentData.filter((record) => {
        return record.fullName.includes(value);
      });
      setFilterData(searchData);
    } else {
      console.error("studentData is undefined or empty");
      setFilterData([]);
    }
  };

  const handleTableChange = (pagination, sorter) => {
    setSearchOnPageChange("");
    setTableParams({
      pagination,
      ...sorter,
    });
  };

  return (
    <>
      <div>
        <div className="flex justify-between my-4 ">
          <div>
            <span data-testid="searchBy">
              <Input
                prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder={t("Search by...")}
                onChange={(e) => setSearchValue(e.target.value)}
                className="px-8 py-2 border rounded-md focus:outline-none w-96  "
              />
            </span>
          </div>
          <div className="flex  ">
            <span data-testid="export">
              <StudentTableExport studentData={studentData} />
            </span>
            <span data-testid="addNew">
              <button
                type="submit"
                className="px-4 py-2 bg-[#172554] text-white rounded-md hover:bg-[#172554] focus:outline-none  focus:border-[#172554]"
                onClick={showModal}
              >
                <PlusCircleOutlined />
                &nbsp;{t("Add New")}
              </button>

              <StudentTableAddNew
                showModal={showModal}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                fetchDataStudent={fetchStudentData}
                page={tableParams.pagination.current}
              />
            </span>
          </div>
        </div>
        <div data-testid="table">
          <Table
            columns={columns}
            dataSource={filterData.length === 0 ? studentData : filterData}
            pagination={tableParams.pagination}
            loading={isLoadingStudentData}
            onChange={handleTableChange}
          />
        </div>
        <StudentTableDelete
          deleteStudent={deleteStudent}
          isModalOpenDelete={isModalOpenDelete}
          setIsModalOpenDelete={setIsModalOpenDelete}
          deletefullName={deletefullName}
          page={tableParams.pagination.current}
        />
      </div>
    </>
  );
};
export default StudentTable;
