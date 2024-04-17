// eslint-disable-next-line no-unused-vars
import React from "react";
import { Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import {
  faHand,
  faEnvelope,
  faCircleStop,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const items = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faHand} /> Re-class
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faEnvelope} /> Remind
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faCircleStop} /> Drop class
      </a>
    ),
  },
  {
    key: "4",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faCircleXmark} /> Remove reserve
      </a>
    ),
  },
];

const DropdownReserve = () => (
  <>
    <Dropdown
      menu={{
        items,
      }}
      placement="bottom"
      arrow
      trigger={["click"]}
    >
      <MoreOutlined className="transform" />
    </Dropdown>
  </>
);
export default DropdownReserve;
