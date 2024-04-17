import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Error = () => {
  const { t } = useTranslation("translation");

  return (
    <Result
      status="404"
      title="404"
      subTitle={t("Sorry, the page you visited does not exist.")}
      extra={
        <Button type="primary" className="bg-[#1677ff]">
          <Link to="/dashboard">{t("Back home")}</Link>
        </Button>
      }
    />
  );
};

export default Error;
