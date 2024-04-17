import React from "react";
import { Modal, Button } from "antd";

export default function ModalDescription({
  isModalVisible,
  setIsModalVisible,
  modalData,
}) {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Replace \n with <br /> in the modalData
  const formattedModalData = modalData
    ? modalData.replace(/\n/g, "<br />")
    : "";

  return (
    <Modal
      title="Description"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >
      <p dangerouslySetInnerHTML={{ __html: formattedModalData }}></p>
    </Modal>
  );
}
