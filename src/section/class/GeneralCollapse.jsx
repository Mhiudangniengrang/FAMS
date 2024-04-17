// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Collapse, Dropdown, Menu } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  ReconciliationOutlined,
  SendOutlined,
  StarOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import ModalSendEmail from "@/section/setting/ModalSendEmail";
import { formatTime } from "@/util/timeUtils";
import useAuth from "@/hooks/useAuth";

const GeneralCollapse = ({ classDetailData }) => {
  const { t } = useTranslation("translation");
  const { infoUser } = useAuth();

  // For ModalSendEmail
  const [isModalSendEmailOpen, setIsModalSendEmailOpen] = useState(false);
  const showModal = () => {
    setIsModalSendEmailOpen(true);
  };

  const handlePreview = () => {
    setIsModalSendEmailOpen(false);
  };

  const handleCancel = () => {
    setIsModalSendEmailOpen(false);
  };

  // Add a new state variable for the current trainer
  const [currentTrainer, setCurrentTrainer] = useState("");

  const items = [
    {
      key: "1",
      label: (
        <div>
          <CalendarOutlined />{" "}
          <span className="font-bold text-[14px]">{t("General")}</span>
        </div>
      ),
      children: (
        <div className="bg-[#fff] p-5 flex flex-col gap-5 border overflow-x-auto rounded-lg">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1" data-testid="time">
              <ClockCircleOutlined />{" "}
              <span className="text-[14px] font-bold">{t("Time")}</span>
            </div>
            <div className="col-span-2" data-testid="timeDetail">
              <p className="text-[14px] font-thin">
                {formatTime(classDetailData?.startTime)} -{" "}
                {formatTime(classDetailData?.endTime)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8" data-testid="location">
            <div className="col-span-1">
              <HomeOutlined />{" "}
              <span className="text-[14px] font-bold">{t("Location")}</span>
            </div>
            <div className="col-span-2" data-testid="locationDetail">
              <p className="text-[14px] font-thin">
                {t(classDetailData?.location)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1" data-testid="trainerInfo">
              <UserOutlined />{" "}
              <span className="text-[14px] font-bold">{t("Trainer")}</span>
            </div>

            <div className="col-span-2" data-testid="trainerInfoDetail">
              {classDetailData?.trainers?.map((trainer, index) =>
                infoUser.roleName === "ROLE_TRAINER" ? (
                  <p
                    key={index}
                    className="text-[14px] text-[#285D9A] font-thin underline"
                  >
                    {trainer.fullName}
                  </p>
                ) : (
                  <Dropdown
                    key={index}
                    trigger={["click"]}
                    className="w-fit"
                    overlay={
                      <Menu>
                        <Menu.Item key="phone">
                          <a href="#">
                            <PhoneOutlined className="rotate-90 mr-3" />
                            {trainer.phone}
                          </a>
                        </Menu.Item>
                        <Menu.Item key="email">
                          <a href="#">
                            <MailOutlined className="mr-3" />
                            {trainer.email}
                          </a>
                        </Menu.Item>
                        <Menu.Item
                          key="sendEmail"
                          onClick={() => {
                            showModal();
                            setCurrentTrainer(trainer.fullName);
                          }}
                        >
                          <SendOutlined className="mr-3" />
                          {t("Send Email")}
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <p className="text-[14px] text-[#285D9A] underline font-thin cursor-pointer">
                      {trainer.fullName || "user"}
                    </p>
                  </Dropdown>
                )
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1" data-testid="adminInfo">
              <StarOutlined />{" "}
              <span className="text-[14px] font-bold">{t("Admin")}</span>
            </div>
            <div className="col-span-2" data-testid="adminInfoDetail">
              {classDetailData?.admins?.map((admin, index) => (
                <p
                  key={index}
                  className="text-[14px] text-[#285D9A] underline font-thin"
                >
                  <span key={index}>{admin.fullName}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1" data-testid="fsu">
              <ReconciliationOutlined />{" "}
              <span className="text-[14px] font-bold">FSU</span>
            </div>
            <div className="col-span-2" data-testid="fsuDetail">
              <p className="text-[14px] font-thin">{classDetailData?.fsu}</p>
            </div>
          </div>
          <div className=" bg-[#000000] w-full h-[0.5px]"></div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1">
              <span className="text-[14px] font-bold">{t("Created")}</span>
            </div>
            <div className="col-span-2" data-testid="creator">
              <p className="text-[14px] font-thin" data>
                {classDetailData?.createdDate} {t("by")}{" "}
                {classDetailData?.createdBy}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1">
              <span className="text-[14px] font-bold">{t("Review")}</span>
            </div>
            <div className="col-span-2" data-testid="reviewer">
              <p className="text-[14px] font-thin">
                {classDetailData?.updatedDate} {t("by")}{" "}
                {classDetailData?.updatedBy}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1">
              <span className="text-[14px] font-bold">{t("Approve")}</span>
            </div>
            <div className="col-span-2" data-testid="approver">
              <p className="text-[14px] font-thin">
                {classDetailData?.approvedDate} {t("by")}{" "}
                {classDetailData?.approvedBy}
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div data-testid="collapse">
        <Collapse
          items={items}
          bordered={false}
          defaultActiveKey={["1"]}
          className="bg-[#a4acb994] rounded-lg"
        />
      </div>

      <ModalSendEmail
        visible={isModalSendEmailOpen}
        handlePreview={handlePreview}
        handleCancel={handleCancel}
        recipient={currentTrainer}
      />
    </>
  );
};

GeneralCollapse.propTypes = {
  classDetailData: PropTypes.any.isRequired,
};

export default GeneralCollapse;
