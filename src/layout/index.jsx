/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Layout, Menu, notification } from "antd";
import {
  SettingOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
  CalendarOutlined,
  FileMarkdownOutlined,
  BankOutlined,
  BookOutlined,
  FileSearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import useAuth from "@/hooks/useAuth";
import { FloatButtonClick } from "@/components";
import avatarAdmin from "@/assets/images/logo/avatar_admin.jpg";
import avatarTrainer from "@/assets/images/logo/avatar_trainer.jpg";
import unigate from "@/assets/images/unigate.png";

const { Content, Sider, Footer } = Layout;

function getItem(label, key, icon, children, path) {
  return {
    key,
    icon,
    children,
    label,
    path,
  };
}

const items = [
  getItem("Home", "1", <HomeOutlined />, null, "/dashboard"),
  getItem("Student", "sub1", <UserAddOutlined />, [
    getItem("Student list", "2", null, null, "/student/view"),
    getItem("Reserve list", "3", null, null, "/reverve/view"),
  ]),
  getItem("Syllabus", "sub2", <FileSearchOutlined />, [
    getItem("View syllabus", "4", null, null, "/syllabus/view"),
    getItem("Create syllabus", "5", null, null, "/syllabus/create"),
  ]),

  getItem("Training program", "sub3", <BookOutlined />, [
    getItem("View program", "6", null, null, "/program/view"),
    getItem("Create program", "7", null, null, "/program/create"),
  ]),
  getItem("Class", "sub4", <BankOutlined />, [
    getItem("View class", "8", null, null, "/class/view"),
  ]),
  getItem("Tranining calendar", "9", <CalendarOutlined />, "", "/calendar"),
  getItem("User management", "sub5", <UsergroupAddOutlined />, [
    getItem("User list", "10", null, null, "/user/view"),
    getItem("User permission", "11", null, null, "/user/permission"),
  ]),
  getItem(
    "Learning materials",
    "12",
    <FileMarkdownOutlined />,
    null,
    "/materials"
  ),

  getItem("Setting", "sub6", <SettingOutlined />, [
    getItem("Calendar", "13", null, null, "/calendar"),
    getItem("Email configuration", "14", null, null, "/email"),
  ]),
];

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated, infoUser, logout } = useAuth();
  const { t } = useTranslation("translation");

  const storeDefaultSelectedKeys = (keys) => {
    sessionStorage.setItem("keys", keys);
  };

  const resetDefaultSelectedKeys = () => {
    const selectedKeys = sessionStorage.getItem("keys");
    return selectedKeys ? selectedKeys : ["2"];
  };

  const defaultSelectedKeys = resetDefaultSelectedKeys();

  const renderMenuItems = (items) => {
    const { t } = useTranslation("translation");

    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={t(item.label)}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => storeDefaultSelectedKeys([item.key])}
          >
            <Link to={item.path}>{t(item.label)}</Link>
          </Menu.Item>
        );
      }
    });
  };

  DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const handleLogout = () => {
    logout();
    notification.success({
      message: t("Logout Successful"),
      description: t("You have successfully logged out."),
      duration: 2,
    });
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        width={230}
        breakpoint="lg"
        collapsedWidth="55"
        defaultCollapsed
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="scrollbar sider overflow-auto min-h-screen left-0 top-0 bottom-0 box-border z-50 flex-none w-56 overflow-y-auto"
        theme="light"
      >
        <div className="demo-logo-vertical" />
        <div className="flex justify-center my-4">
          <img
            className="w-5/12 object-cover select-none"
            src="https://insacmau.com/wp-content/uploads/2023/02/logo-FPT-Polytechnic-.png"
            alt=""
          />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          className="select-none"
        >
          {renderMenuItems(items)}
        </Menu>
      </Sider>
      <Layout className="right-bar overflow-y-auto transition-all duration-[280ms] ease-in">
        <div className="header pr-4 flex justify-end gap-2 items-center fixed z-[1000] h-16 shadow-none bg-[#f8f8f8] bg-opacity-80 backdrop-blur-[6px]">
          <div className="flex space-x-2 bg-[#b5b5b5d4] px-3 py-2 mr-5 rounded-3xl text-[#fff]">
            <img src={unigate} alt="" />
            <span>uniGate</span>
          </div>
          {infoUser.roleName === "ROLE_ADMIN" ? (
            <>
              <img
                className="w-[42px] h-[42px] rounded-full border object-cover"
                src={avatarAdmin}
              />
            </>
          ) : infoUser.roleName === "ROLE_TRAINER" ? (
            <img
              src={avatarTrainer}
              alt=""
              className="w-[42px] h-[42px] rounded-full border object-cover"
            />
          ) : null}
          <div className="flex flex-col">
            {isAuthenticated ? <strong>{infoUser.fullName}</strong> : ""}
            <div
              className="text-[#5099ff] font-bold hover:underline cursor-pointer"
              onClick={handleLogout}
            >
              {t("Logout")}
            </div>
          </div>
        </div>
        <Content className="mt-[80px] mx-4 ">
          <div className="rounded-xl overflow-x-auto min-w-[250px] bg-[#fff]">
            {children}
          </div>
        </Content>
        <Footer className="text-center">
          {t("Copyright")} @2022 BA Warrior. {t("All right reserved")}
        </Footer>
        <FloatButtonClick />
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
