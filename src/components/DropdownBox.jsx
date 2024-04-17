/* eslint-disable no-unused-vars */
import React, { useTransition } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DropdownBox = ({ classId }) => {
  const { t } = useTranslation();
  return (
    <>
      <Dropdown
        menu={{
          items: [
            {
              key: "1",
              label: (
                <Link
                  to={`/class/view/${classId}`}
                  rel="noopener noreferrer"
                  href="#"
                >
                  <EditOutlined className="pr-1" />
                  {t("Edit class")}
                </Link>
              ),
            },
          ],
        }}
        trigger={["click"]}
      >
        <MoreOutlined className="rotate" />
      </Dropdown>
    </>
  );
};

DropdownBox.propTypes = {
  classId: PropTypes.number.isRequired,
};

export default DropdownBox;
