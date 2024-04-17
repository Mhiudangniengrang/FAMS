/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Reserve } from "@/routes/Sections";
import { useTranslation } from "react-i18next";
import useStore from "@/hooks/useEmailStore";
import useStoree from "@/hooks/useReserveStore";
import useEmailStore from "@/hooks/useEmailStore";
import { Row, Col } from 'antd';
export default function EmailPreview() {
  const { templateId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { reservedclassId } = useParams();
  const { userId } = useParams();
  const navigate = useNavigate();
  const ReserveiD = reservedclassId;
  const { reserveDataDetail, fetchReserveDataDetail } = useStoree();
  const { sendRemindEmai, emailData, fetchData } = useEmailStore();
  const { t, i18n } = useTranslation("translation");
  const [isTranslated, setIsTranslated] = useState(i18n.language === 'vie');
  const { emailTempleteData, fetchEmailDetail, fetchUser } = useStore();
  const SendEmail = async () => {
    if (ReserveiD === undefined || templateId === undefined) {
      return;
    }
    setIsLoading(true);
    try {
      await sendRemindEmai(ReserveiD, templateId, userId);
      setIsLoading(false);
      navigate('/reverve/view');
    } catch (error) {
      console.error("Error", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchEmailDetail(templateId);
    fetchReserveDataDetail(ReserveiD);
  }, []);

  useEffect(() => {
    const handleLanguageChange = () => setIsTranslated(i18n.language === "vie");
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <div className="p-0 mb-10">
      <Card
        title={
          <div className="text-center text-lg "> {t("Email Preview")}</div>
        }
      >
        <div className="space-y-10">
          <Row align="middle">
            <Col span={18} push={6}>
              <p>{emailTempleteData?.name}</p>
            </Col>
            <Col span={6} pull={18}>
              <a className="font-semibold">{t("Template name")}:</a>
            </Col>
          </Row>
          {/* <div className="space-x-56 flex"> */}

          <Row align="middle">
            <Col span={18} push={6}>
              <p>admin123</p>
            </Col>
            <Col span={6} pull={18}>
              <a className="font-semibold">{t("From")}:</a>
            </Col>
          </Row>
          {/* </div> */}
          <Row align="middle">
            <Col span={18} push={6}>
              <p className="italic">{reserveDataDetail?.students?.email}</p>
            </Col>
            <Col span={6} pull={18}>
              <a className="font-semibold">{t("To")}:</a>
            </Col>
          </Row>
          <Row align="middle">
            <Col span={18} push={6}>
              <p> {emailTempleteData?.type}</p>
            </Col>
            <Col span={6} pull={18}>
              <a className="font-semibold">{t("Subject")}:</a>
            </Col>
          </Row>
          <Row align="middle">
            <Col span={18} push={6}>
              <p>{emailTempleteData?.description}</p>
            </Col>
            <Col span={6} pull={18}>
              <a className="font-semibold">{t("Body")}:</a>
            </Col>
          </Row>
        </div>
        <div data-testid="button preview">
          <div className="flex justify-end space-x-2">
            <Link key={Reserve} to="/reverve/view">
              <Button>{t("Back")}</Button>
            </Link>
            <Button
              className="bg-[#172554] hover:bg-[#172554] text-white :"
              onClick={SendEmail}
              loading={isLoading}
            >
              {t("Send")}
            </Button>
          </div>
        </div>
      </Card >
    </div >
  );
}




