import { FloatButton } from "antd";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GlobalOutlined } from "@ant-design/icons";
import vietnamFlag from "@/assets/images/flag/Flag_of_Vietnam.svg.png";
import englandFlag from "@/assets/images/flag/360_F_73960308_QF7KzcFIFHFb3HuPMYFIPI25d6m4cCHt.jpg";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(
    () => sessionStorage.getItem("language") || "eng"
  );

  const changeLanguage = (languageValue) => {
    i18n.changeLanguage(languageValue);
    sessionStorage.setItem("language", languageValue);
    setCurrentLanguage(languageValue);
  };

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem("language");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
      setCurrentLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <FloatButton.Group
      trigger="hover"
      type="primary"
      className="bottom-100"
      icon={<GlobalOutlined />}
    >
      <FloatButton
        onClick={() => changeLanguage("eng")}
        icon={<img src={englandFlag} />}
        active={currentLanguage === "eng"}
      />
      <FloatButton
        onClick={() => changeLanguage("vie")}
        icon={<img src={vietnamFlag} />}
        active={currentLanguage === "vie"}
      />
    </FloatButton.Group>
  );
};

export default LanguageSelector;
