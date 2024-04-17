/* eslint-disable no-unused-vars */
import React, { useDeferredValue, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Input, Table, Checkbox, Dropdown, Menu, notification } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  EllipsisOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  ROLE_ADMIN,
  INCLASS_STATE,
  BACKTOCLASS_STATE,
  RESERVATION_STATE,
  FINISH_STATE,
  DROPOUT_STATE,
} from "@/config/constants";
import StudentTableAddNew from "@/section/student/StudentTableAddNew";
import StudentRemove from "@/section/student/StudentRemove";
import StudentTableImport from "@/section/student/StudentTableImport";
import StudentEditStatus from "@/section/student/StudentEditStatus";
import StudentTableExportInClass from "@/section/student/StudentTableExportInClass";
import useStudentStore from "@/hooks/useStudentStore";
import useScoreStore from "@/hooks/useScoreStore";
import useAuth from "@/hooks/useAuth";

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

const StudentList = ({ classId }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [deleteStudent, setdeleteStudent] = useState(null);
  const [deletefullName, setdeletefullName] = useState(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const { infoUser } = useAuth();
  const { fetchStudentByClass, isLoadingStudentList } = useStudentStore();
  const { fetchScoreData } = useScoreStore();
  const { t } = useTranslation("translation");
  const navigate = useNavigate();
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

  useEffect(() => {
    handleSearch(deferredSearchValue);
  }, [deferredSearchValue, listStudent]);

  useEffect(() => {
    fetchData();
  }, [classId, tableParams.pagination.current]);

  const fetchData = async () => {
    try {
      if (classId && tableParams.pagination.current) {
        const res = await fetchStudentByClass(
          classId,
          tableParams.pagination.current
        );
        if (res && res.status === 200) {
          setListStudent(res.data.content);
          setTotalElements(res.data.totalElements);
        }
      }
    } catch (err) {
      setListStudent([]);
    }
  };

  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: totalElements,
      },
    });
  }, [listStudent]);

  const columns = [
    {
      title: {},
      dataIndex: "checkbox",
      width: "1%",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => handleCheckboxChange(e, record)}
          checked={checkedList.some(
            (item) => item.studentId === record.studentId
          )}
          disabled={
            record.attendingStatus === "Reservation" ||
            record.attendingStatus === "Finish"
          }
        />
      ),
    },

    {
      title: (
        <>
          {t("Full Name")}
          <span className="m1-1">{customIcon}</span>
        </>
      ),
      dataIndex: "fullName",
      width: "18%",
      render: (text, record) => (
        <Link to={`/class/view/studentDetail/${classId}/${record.studentId}`}>
          {text}
        </Link>
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
      width: "24%",
    },
    {
      title: (
        <>
          {t("Phone")}
          <span className="ml-1">{customIcon}</span>
        </>
      ),
      dataIndex: "phone",
      width: "10%",
    },
    {
      title: <>{t("GPA")}</>,
      dataIndex: "gpa",
      width: "6%",
    },
    {
      title: <>{t("REcer")}</>,
      dataIndex: "recer",
      width: "10%",
    },
    {
      title: (
        <span className="flex items-center">
          <span className="mr-1">{t("Status")}</span>
        </span>
      ),
      dataIndex: "attendingStatus",
      width: "15%",
      render: (text) => (
        <span
          className={classNames({
            "bg-[#0583b4] px-3 py-1 rounded-md text-[#fff]":
              text === INCLASS_STATE,
            "bg-[#ff8800] px-3 py-1 rounded-md text-[#fff]":
              text === BACKTOCLASS_STATE,
            "bg-[#ff7568] px-3 py-1 rounded-md text-[#fff]":
              text === DROPOUT_STATE,
            "bg-[#008000] px-3 py-1 rounded-md text-[#fff]":
              text === FINISH_STATE,
            "bg-[#acb80a] px-3 py-1 rounded-md text-[#fff]":
              text === RESERVATION_STATE,
          })}
        >
          {t(text)}
        </span>
      ),
      filters: [
        { text: t("InClass"), value: INCLASS_STATE },
        { text: t("BackToClass"), value: BACKTOCLASS_STATE },
        { text: t("DropOut"), value: DROPOUT_STATE },
        { text: t("Finish"), value: FINISH_STATE },
        { text: t("Reservation"), value: RESERVATION_STATE },
      ],
      onFilter: (value, record) => record.attendingStatus === value,
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
      dataIndex: listStudent.id,
      width: "1%",
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

  const handleUpdateCheckedList = (newCheckedList) => {
    setCheckedList(newCheckedList);
  };

  const handleMenuClick = (action, record, fullName) => {
    if (action === "delete") {
      setdeleteStudent(record);
      setdeletefullName(fullName);
      showModalDelete();
    }

    if (action === "edit") {
      navigate(`/class/view/studentDetail/${classId}/${record}`);
    }
  };

  const handleCheckboxChange = (e, record) => {
    const { checked } = e.target;
    if (checked) {
      setCheckedList([...checkedList, record]);
    } else {
      setCheckedList(
        checkedList.filter((item) => item.studentId !== record.studentId)
      );
    }
  };

  const showModal = () => {
    if (infoUser.roleName === ROLE_ADMIN) {
      setIsModalOpen(true);
    } else {
      notification.warning({
        message: t("Add Failed"),
        description: t("You don't have permission to add new student."),
        duration: 2,
      });
    }
  };

  const showModalDelete = () => {
    if (infoUser.roleName === ROLE_ADMIN) {
      setIsModalOpenDelete(true);
    } else {
      notification.warning({
        message: t("Delete Failed"),
        description: t("You don't have permission to delete student."),
        duration: 2,
      });
    }
  };

  const handleSearch = (value) => {
    if (!listStudent) {
      console.error("Student is undefined or empty");
      return;
    }
    const lowercaseValue = value.toLowerCase();
    const searchData = listStudent?.filter((record) => {
      return Object.values(record).some((columnValue) => {
        if (typeof columnValue === "string") {
          const lowercaseColumnValue = columnValue.toLowerCase();
          return lowercaseColumnValue.includes(lowercaseValue);
        } else if (typeof columnValue === "number") {
          const columnValueString = columnValue.toString();
          return columnValueString.includes(value);
        }
        return false;
      });
    });

    setFilterData(searchData.length > 0 ? searchData : []);
  };

  const handleTableChange = (pagination, sorter) => {
    setTableParams({
      pagination,
      ...sorter,
    });
  };

  const handleUpdateSuccess = async () => {
    await fetchData(classId, tableParams.pagination.current);
    await fetchScoreData(classId, tableParams.pagination.current);
  };

  return (
    <>
      <div>
        <div className="block lg:flex justify-between my-3">
          <div>
            <span data-testid="searchBy">
              <Input
                prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder={t("Search by...")}
                onChange={(e) => setSearchValue(e.target.value)}
                className="px-8 py-2 border rounded-md focus:outline-none w-96"
              />
            </span>
          </div>
          <div className="flex">
            <span data-testid="importStudent">
              <button type="submit">
                <input id="test" type="file" hidden />{" "}
                <StudentTableImport
                  classId={classId}
                  page={tableParams.pagination.current}
                  onImportSuccess={handleUpdateSuccess}
                />
              </button>
            </span>
            <span data-testid="export">
              <StudentTableExportInClass />
            </span>
            <span data-testid="addNew">
              <button
                type="submit"
                className="px-4 py-2 bg-[#172554] text-white rounded-md hover:bg-[#172554] focus:outline-none  focus:border-[#172554]"
                onClick={showModal}
              >
                <PlusCircleOutlined />
                &nbsp;{t("Add new")}
              </button>
              <StudentTableAddNew
                showModal={showModal}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                fetchDataStudent={fetchStudentByClass}
                classId={classId}
                page={tableParams.pagination.current}
                onUpdateSuccess={handleUpdateSuccess}
              />
            </span>
          </div>
        </div>
        <StudentEditStatus
          checkedList={checkedList}
          handleUpdateCheckedList={handleUpdateCheckedList}
          classId={classId}
          page={tableParams.pagination.current}
          onUpdateSuccess={handleUpdateSuccess}
        />
        <StudentRemove
          deleteStudent={deleteStudent}
          isModalOpenDelete={isModalOpenDelete}
          setIsModalOpenDelete={setIsModalOpenDelete}
          onUpdateSuccess={handleUpdateSuccess}
          deletefullName={deletefullName}
          classId={classId}
          page={tableParams.pagination.current}
        />
        <div data-testid="table" className="studentList">
          <Table
            id="myTable"
            columns={columns}
            dataSource={filterData ? filterData : listStudent}
            onChange={handleTableChange}
            loading={isLoadingStudentList}
            pagination={tableParams.pagination}
          />
        </div>
      </div>
    </>
  );
};

StudentList.propTypes = {
  classId: PropTypes.number,
};

export default StudentList;
