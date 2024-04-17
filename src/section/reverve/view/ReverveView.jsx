import ReverveTable from "@/section/reverve/ReverveTable";
import { useTranslation } from "react-i18next";

function ReverveView() {
  const { t } = useTranslation("translation");

  return (
    <div className="min-w-[350px]">
      <div className="bg-[#172554] p-5 rounded-t-xl">
        <p className="text-white text-2xl font-bold">{t("Reserve List")}</p>
      </div>
      <div className="p-5" data-testid="classTable">
        <ReverveTable />
      </div>
    </div>
  );
}

export default ReverveView;
