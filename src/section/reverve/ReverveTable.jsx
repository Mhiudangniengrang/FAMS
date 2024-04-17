/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { Checkbox } from "antd";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  Dropdown,
  Menu,
  Button,
  Modal,
  Input,
  Form,
  TreeSelect,
  Select,
} from "antd";
import {
  EllipsisOutlined,
  WarningOutlined,
  SearchOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  faHand,
  faEnvelope,
  faCircleStop,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { getAddReserve } from "@/api/reserveApi";
import { getRemind } from "@/api/reserveApi";
import { getDropOutClass } from "@/api/reserveApi";
import { getClassByStudent } from "@/api/classApi";
import { getStudentByCode } from "@/api/studentApi";
import useEmailStore from "@/hooks/useEmailStore";
import useStore from "@/hooks/useReserveStore";
import { Loading } from "@/components";

const ReverveTable = () => {
  const [reservedclassId, setReserveClassID] = useState([]);
  const [studentId, stdidchange] = useState("");
  const [studentCode, stcodechange] = useState("");
  const [startDate, sDatechange] = useState("");
  const [endDate, eDatechange] = useState("");
  const [reason, reasonchange] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation("translation");
  const {
    reserveData,
    fetchReserveData,
    isLoadingReserveList,
    fetchReserveDataDetail,
    reserveDataDetail,
    ReserveTotalElement,
    isLoadingReserveData,
  } = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { sendRemindEmai, emailData, fetchData } = useEmailStore();
  const [id, setId] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [isLoadingSearching, setIsLoadingSearching] = useState(false);
  const [templateId, setTemplateId] = useState({});
  const [studentDetails, setStudentDetails] = useState(null);
  const [classDetails, setClassDetails] = useState(null);
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [checkbox3Checked, setCheckbox3Checked] = useState(false);
  const [checkbox4Checked, setCheckbox4Checked] = useState(false);
  const [checkbox5Checked, setCheckbox5Checked] = useState(false);

  const showModal1 = () => {
    setIsModalVisible(true);
    fetchReserveDataDetail(id);
  };
  const handleOk1 = () => {
    setIsModalVisible(false);
  };
  const handleCancel1 = () => {
    setIsModalVisible(false);
  };
  const handleStudentCodeChange = (e) => {
    const inputValue = event.target.value.trim();
    stcodechange(inputValue);
  };
  const handleRowClick = (record) => {
    setId(record.id);
  };
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      showLessItems: true,
      showSizeChanger: false,
    },
  });

  useEffect(() => {
    if (tableParams.pagination.current) {
      (async () => {
        await fetchReserveData(tableParams.pagination.current);
      })();
    }
  }, [tableParams.pagination.current]);

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal2 = (reservedclassId) => {
    setIsModalOpen2(true);
    setReserveClassID(reservedclassId);
  };

  const handleOk2 = async () => {
    setIsLoading(true); // Set loading state to true when starting the operation
    try {
      const res = await getDropOutClass(reservedclassId);
      fetchReserveData();
      if (res && res.status === 200) {
        notification.success({
          message: t("Dropout successful!"),
          duration: 2,
        });
      }
    } catch (error) {
      console.error("Failed to dropout. Please try again.", error);
      notification.error({
        message: t("Failed to dropout"),
        description: error.response.data.message,
      });
    } finally {
      setIsModalOpen2(false);
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const fetchStudentAndClassDetails = async () => {
    if (!studentCode) {
      notification.info({
        message: t("Notification"),
        description: t("Please input student code"),
      });
      return;
    }
    try {
      // Fetch student details
      setIsLoadingSearching(true);
      const studentResponse = await getStudentByCode(studentCode);
      if (studentResponse && studentResponse.status === 200) {
        setStudentDetails(studentResponse.data);

        // Fetch class details using studentId
        const classResponse = await getClassByStudent(
          studentResponse.data?.studentId
        );
        if (classResponse && classResponse.status === 200) {
          setClassDetails(classResponse.data);
          setIsLoadingSearching(false);
        } else {
          setIsLoadingSearching(false);
          notification.error({
            message: t("Failed to fetch class details"),
            description: classResponse.data.message,
          });
        }
      } else {
        setIsLoadingSearching(false);
        notification.error({
          message: t("Failed to fetch student details"),
          description: studentResponse.data.message,
        });
      }
    } catch (error) {
      setIsLoadingSearching(false);
      console.error("Failed to fetch student and class details", error);
      notification.error({
        message: t("Failed to add reserve"),
        description: error.response.data.message,
      });
    }
  };
  const columns = [
    {
      title: t("Full Name"),
      dataIndex: "fullName",
      width: "5%",
      render: (text, record) =>
        record.status === "Inactive" ? (
          <span>{record.fullName}</span>
        ) : (
          <Link to={`/reverve/detail/${record.id}`}>{text}</Link>
        ),
    },
    {
      title: t("Student Code"),
      dataIndex: "studentCode",
      width: "5%",
    },

    {
      title: t("Gender"),
      width: "5%",
      render: (record) => <p>{t(record.gender)}</p>,
    },
    {
      title: t("Birthday"),
      dataIndex: "dob",
      width: "15%",
    },
    {
      title: t("Class"),
      dataIndex: "className",
      width: "10%",
    },
    {
      title: t("Reserved module"),
      dataIndex: "moduleName",
      width: "20%",
    },
    {
      title: t("Reason"),
      dataIndex: "reason",
      width: "10%",
    },
    {
      title: t("Start date"),
      dataIndex: "startDate",
      width: "15%",
    },
    {
      title: t("End date"),
      dataIndex: "endDate",
      width: "15%",
    },
    {
      title: t("Status"),
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <span
          className={`inline-block w-20 text-center py-1 rounded ${
            status === "Active"
              ? "bg-green-500 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          {status === "Active" ? t("Active") : t("Inactive")}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "",
      width: "10%",
      render: (record) => (
        <div data-testid="dropdown">
          <Dropdown
            overlay={menu(record)}
            placement="bottomRight"
            trigger={["click"]}
            reserverClassId={id}
          >
            <EllipsisOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
          </Dropdown>
        </div>
      ),
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSearch = (value) => {
    setSearchValue(value);
    if (value === "") {
      setFilterData([]);
    } else {
      const searchData = reserveData.filter((record) =>
        record.fullName.toLowerCase().includes(value.toLowerCase())
      );
      setFilterData(searchData);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const formRef = useRef(null);
  const handleOk = async () => {
    setIsLoading(true); // Set loading state to true when starting the operation
    try {
      // Validate form fields
      const values = await formRef.current.validateFields();

      // Perform action if form validation succeeds
      const res = await getAddReserve(
        studentDetails.studentId,
        selectedClass,
        startDate,
        endDate,
        reason
      );

      if (res && res.status === 200) {
        if (res.data.status === 404) {
          notification.error({
            message: res.data.message,
          });
        } else {
          notification.success({
            message: t("Add reserve successful!"),
          });
          setIsModalOpen(false);
          fetchReserveData();
        }
      } else {
        notification.error({
          message: t("Add reserve failed!"),
        });
      }
    } catch (error) {
      console.error("Failed to add reserve. Please try again.", error);
      notification.error({
        message: t("Failed to reserve"),
        description: t(error.response.data.message),
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const showModal3 = (reservedclassId) => {
    setIsModalOpen3(true);
    setReserveClassID(reservedclassId);
  };

  const handleOk3 = async () => {
    setIsLoading(true);
    try {
      const res = await getRemind(reservedclassId);
      fetchReserveData();
      if (res && res.status === 200) {
        notification.success({
          message: t("Remind successful!"),
          duration: 2,
        });
      }
    } catch (error) {
      console.error("Failed to remind. Please try again.", error);
      notification.error({
        message: t("Failed to remind"),
        description: t(error.response.data.message),
      });
    } finally {
      setIsModalOpen3(false);
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const handleCancel3 = () => {
    setIsModalOpen3(false);
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="re-class" disabled={record.status === "Inactive"}>
        <Link to={`/reverve/detail/${record.id}`}>
          <FontAwesomeIcon icon={faHand} />
          {t("Re-class")}
        </Link>
      </Menu.Item>
      <Menu.Item key="send email" disabled={record.status === "Inactive"}>
        <a data-testid="sendemailbutton" onClick={() => showModal1(data)}>
          <FontAwesomeIcon icon={faEnvelope} /> {t("Send Email")}
        </a>
      </Menu.Item>
      <Menu.Item key="remind" disabled={record.status === "Inactive"}>
        <a onClick={() => showModal3(record.id)}>
          <FontAwesomeIcon icon={faEnvelope} /> {t("Remind")}
        </a>
      </Menu.Item>
      <Menu.Item key="dropclass" disabled={record.status === "Inactive"}>
        <a onClick={() => showModal2(record.id)} data-testid="dropclassmodal">
          <FontAwesomeIcon icon={faCircleStop} />
          {t("Drop class")}
        </a>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    fetchReserveData();
    fetchData();
  }, []);
  useEffect(() => {
    setStudentDetails(null); // Reset studentDetails state
    setClassDetails(null); // Reset classDetails state
  }, [studentCode]);
  useEffect(() => {
    if (classDetails?.content?.length === 1) {
      setSelectedClass(classDetails?.content[0]?.classId);
    }
  }, [classDetails?.content, setSelectedClass]);

  const mappedData = emailData
    .filter((items) => items.status === true)
    .map((item) => ({
      title: item.name,
      value: item.templateId,
    }));

  const handleSendRemind = async () => {
    setIsLoading(true); // Set loading state to true when starting the operation
    if (id === undefined || templateId === undefined) {
      setIsLoading(false); // Reset loading state if id or templateId is undefined
      return;
    }
    try {
      const response = await sendRemindEmai(id, templateId, t);
      if (response.status === 412) {
        setIsModalVisible(true);
      } else {
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  };
  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: ReserveTotalElement,
      },
    });
  }, [ReserveTotalElement]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const [selectedValue, setSelectedValue] = useState("");

  const handleTreeSelectChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <>
      <div data-testid="table">
        <div className="flex">
          <div className="w-1/2">
            <Input.Search
              placeholder={t("Search by...")}
              className="mb-5 w-[250px] h-9"
              onChange={(e) => handleSearch(e.target.value)}
              data-testid="inputSearch"
            />
          </div>
          <div className="flex justify-end w-1/2">
            <button
              className=" w-36 h-11 flex-initial bg-sky-950 rounded-lg text-white"
              data-testid="addnewbutton"
              onClick={showModal}
            >
              {" "}
              <div className="flex justify-center text-center">
                <FontAwesomeIcon icon={faCirclePlus} className="mt-1" />
                <p className="ml-2">{t("Add New")}</p>{" "}
              </div>
            </button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={searchValue ? filterData : reserveData}
          pagination={tableParams.pagination}
          loading={isLoadingReserveData}
          onChange={handleTableChange}
          onRow={(record) => ({
            onClick: (e) => handleRowClick(record),
          })}
          rowKey="id"
        />
        <Modal
          data-testid="addnewpopup"
          open={isModalOpen}
          onCancel={handleCancel} // Added onCancel handler
          footer={
            <div className="">
              <Button onClick={handleCancel} className="text-red-600">
                {t("Cancel")}
              </Button>
              <Button
                onClick={handleOk}
                loading={isLoading}
                className=" ml-4 bg-black text-white "
                disabled={
                  !checkbox1Checked ||
                  !checkbox2Checked ||
                  !checkbox3Checked ||
                  !checkbox4Checked ||
                  !checkbox5Checked
                }
              >
                {t("Create")}
              </Button>
            </div>
          }
        >
          <div>
            <h1 className="text-black text-2xl font-bold text-center">
              {t("Add New Reserve")}
            </h1>
          </div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
            ref={formRef}
          >
            <Form.Item
              data-testid="stdidpu"
              label={t("Student Code")}
              name="stdid"
              value={studentCode}
              onChange={(e) => stdidchange(e.target.value)}
              rules={[
                {
                  required: true,
                  message: t("Please input your student code!"),
                },
              ]}
              className="my-8"
            >
              <Input
                value={studentCode}
                onChange={handleStudentCodeChange}
                className="max-w-[350px] float-right rounded-none "
                addonAfter={
                  <>
                    <div
                      className="cursor-pointer"
                      onClick={fetchStudentAndClassDetails}
                    >
                      <SearchOutlined />
                    </div>
                  </>
                }
              />
            </Form.Item>
            {isLoadingSearching ? (
              <>
                <Loading />
              </>
            ) : studentDetails ? (
              <>
                <Form.Item
                  data-testid="clsidpu"
                  label={t("Fullname")}
                  name="fullName"
                >
                  <div className="bg-gray-300 rounded-lg p-[7px] w-[350px] float-right">
                    <h1>{studentDetails.fullName}</h1>
                  </div>
                </Form.Item>
                <Form.Item
                  data-testid="clsidpu"
                  label={t("Email")}
                  name="fullName"
                >
                  <div className="bg-gray-300 rounded-lg p-[7px] w-[350px] float-right ml-[30px]">
                    <h1>{studentDetails.email}</h1>
                  </div>
                </Form.Item>
                <Form.Item
                  data-testid="clsidpu"
                  label={t("Major")}
                  name="fullName"
                >
                  <div className="bg-gray-300 rounded-lg p-[7px] w-[350px] float-right ml-[26px]">
                    <h1>{studentDetails.major}</h1>
                  </div>
                </Form.Item>
              </>
            ) : (
              <p></p>
            )}

            {isLoadingSearching ? (
              ""
            ) : classDetails &&
              classDetails.content &&
              classDetails.content.length > 0 ? (
              <Form.Item
                data-testid="clsidpu"
                label={t("ClassCode")}
                name="classid"
                value={classDetails.content.classId}
              >
                {classDetails.content.length === 1 ? (
                  <div className="bg-gray-300 rounded-lg p-[7px] w-[350px] float-right">
                    <h1>{classDetails?.content[0]?.classCode}</h1>
                  </div>
                ) : (
                  <Select
                    name="classCode"
                    value={selectedClass}
                    onChange={(value) => setSelectedClass(value)}
                    className="max-w-[350px] float-right"
                  >
                    {classDetails.content.map((classItem) => (
                      <Select.Option
                        key={classItem.classId}
                        value={classItem.classId}
                      >
                        {classItem.classCode}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            ) : (
              <p></p>
            )}
            <Form.Item
              data-testid="sdatepu"
              label={t("Start date")}
              name="startdate"
              value={startDate}
              onChange={(e) => sDatechange(e.target.value)}
              rules={[
                { required: true, message: t("Please input your Start date!") },
              ]}
              className="my-8"
            >
              <Input
                type="date"
                className="max-w-[350px] float-right"
                max={new Date().toISOString().split("T")[0]}
              />
            </Form.Item>
            <Form.Item
              data-testid="edatepu"
              label={t("End date")}
              name="enddate"
              value={endDate}
              onChange={(e) => eDatechange(e.target.value)}
              rules={[
                { required: true, message: t("Please input your End date!") },
              ]}
              className="my-8"
            >
              <Input
                type="date"
                className="max-w-[350px] float-right"
                max={new Date().toISOString().split("T")[0]}
              />
            </Form.Item>
            <Form.Item
              data-testid="reasonpu"
              label={t("Reason")}
              name="reason"
              value={reason}
              onChange={(e) => reasonchange(e.target.value)}
              rules={[
                { required: true, message: t("Please input your reason!") },
              ]}
              className="my-8"
            >
              <Input className="max-w-[350px] float-right" />
            </Form.Item>
            <Form.Item data-testid="Checkbox">
              <h1>{t("Reserving conditions")}:</h1>
              <div data-testid="checkbox" className="flex flex-row mt-5">
                <div className="flex flex-col ..." data-testid="checkboxfull1">
                  <Checkbox
                    data-testid="checkbox1"
                    onChange={(e) => setCheckbox1Checked(e.target.checked)}
                  >
                    {t("Complete tuition payment")}
                  </Checkbox>
                  <Checkbox
                    data-testid="checkbox2"
                    onChange={(e) => setCheckbox2Checked(e.target.checked)}
                  >
                    {t("Ensure the course has not progressed beyond 50%")}
                  </Checkbox>
                  <Checkbox
                    data-testid="checkbox3"
                    onChange={(e) => setCheckbox3Checked(e.target.checked)}
                  >
                    {t("Determine retention fee payment")}
                  </Checkbox>
                </div>
                <div className="flex flex-col ..." data-testid="checkboxfull2">
                  <Checkbox
                    data-testid="checkbox4"
                    onChange={(e) => setCheckbox4Checked(e.target.checked)}
                  >
                    {t("Perform one-time retention check")}
                  </Checkbox>
                  <Checkbox
                    data-testid="checkbox5"
                    onChange={(e) => setCheckbox5Checked(e.target.checked)}
                  >
                    {t("Identify the concluding module")}
                  </Checkbox>
                </div>
              </div>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title={
            <div className="custom-modal-title">
              {t("Send Email For Reservation Student")}
            </div>
          }
          visible={isModalVisible}
          onOk={handleOk1}
          data-testid="semdemailpopup"
          onCancel={handleCancel1}
          fetchData={fetchData}
          okText="Preview"
          footer={[
            <Button
              key="previewButton"
              className="bg-blue-500 hover:bg-blue-700 text-white"
              disabled={selectedValue === ""}
            >
              <Link to={`/reverve/PreviewEmail/${templateId}/${id}`}>
                {t("Preview")}
              </Link>
            </Button>,
            <Button
              key="sendButton"
              onClick={handleSendRemind}
              loading={isLoading}
              disabled={selectedValue === ""}
            >
              {t("Send")}
            </Button>,
          ]}
        >
          <div className="text-center mt-10">
            <Form.Item
              label={
                <div className="font-semibold" data-testid="reversemail">
                  {t("Categoris")}
                </div>
              }
            >
              {t("Reverve")}
            </Form.Item>

            <Form.Item
              label={<div className="font-semibold">{t("Apply to")}</div>}
            >
              {reserveDataDetail?.students?.fullName}
              {t("Student")}
            </Form.Item>

            <Form.Item
              label={<div className="font-semibold">{t("Send to")}</div>}
            >
              <div className="italic">
                {" "}
                {reserveDataDetail?.students?.email}{" "}
              </div>
            </Form.Item>
          </div>
          <Form.Item
            name="templateName"
            label={t("Template name")}
            className="font-semibold"
            rules={[
              { required: true, message: t("Please select a template!") },
            ]}
          >
            <TreeSelect
              treeData={mappedData}
              onChange={handleTreeSelectChange}
              onSelect={(value) => setTemplateId(value)}
            />
          </Form.Item>
        </Modal>
        <Modal
          open={isModalOpen3}
          footer={
            <div className="">
              <Button onClick={handleCancel3} className="text-red-600">
                {t("Cancel")}
              </Button>
              <Button
                onClick={handleOk3}
                className=" ml-4 bg-black text-white "
                loading={isLoading}
              >
                {t("Remind")}
              </Button>
            </div>
          }
        >
          <div className="flex mb-3">
            <MailOutlined className="text-xl" />
            <h1 className="ml-3 text-xl" data-testid="dropouttitle">
              {t("Remind")}
            </h1>
          </div>
          <p>{t("Do you want to Remind this student?")}</p>
        </Modal>

        <div data-testid="dropoutmodal">
          <Modal
            open={isModalOpen2}
            onCancel={handleCancel2}
            data-testid="dropoutpopup"
            footer={
              <div className="">
                <Button onClick={handleCancel2} className="text-red-600">
                  {t("Cancel")}
                </Button>
                <Button
                  onClick={handleOk2}
                  className=" ml-4 bg-black text-white "
                  loading={isLoading}
                >
                  {t("OK")}
                </Button>
              </div>
            }
          >
            <div className="flex mb-3">
              <WarningOutlined className="text-xl text-red-500" />
              <h1 className="ml-3 text-xl">{t("Drop out")}</h1>
            </div>
            <p>{t("Do you really want to drop out ?")}</p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ReverveTable;
