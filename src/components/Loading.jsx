/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import { Flex, Spin } from "antd";

const Loading = () => {
  const { t } = useTranslation("translation");

  return (
    <Flex gap="small" vertical className="select-none">
      <Flex gap="small" align="center" justify="center">
        <Spin tip={t("Loading...")} size="large">
          <div className="p-[50px]" />
        </Spin>
      </Flex>
    </Flex>
  );
};

export default Loading;
