/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import Authen from "@/section/authen/Authen";
import Carousel from "@/section/authen/Carousel";

function AuthenView() {
  const { t } = useTranslation("translation");

  return (
    <div className="background w-full min-h-screen flex justify-center items-center">
      <div className="max-w-[860px] min-h-[430px] mx-5 bg-[#fff] grid grid-cols-1 md:grid md:grid-cols-2 rounded-2xl overflow-hidden ">
        <div className="px-10 my-auto" data-testid="authen">
          <h1
            className="text-center text-4xl font-bold mb-5"
            data-testid="authenTitle"
          >
            {t("Login")}
          </h1>
          <Authen />
        </div>
        <div className="hidden md:block" data-testid="carousel">
          <Carousel />
        </div>
      </div>
    </div>
  );
}

export default AuthenView;
