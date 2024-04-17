// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "@/components";
import ClassName from "@/section/class/ClassName";
import DateCollapse from "@/section/class/DateCollapse";
import GeneralCollapse from "@/section/class/GeneralCollapse";
import AttendeeCollapse from "@/section/class/AttendeeCollapse";
import TabList from "@/section/class/TabList";
import useClassStore from "@/hooks/useClassStore";

function ClassDetailView() {
  const { classId } = useParams();
  const { classDetailData, fetchClassDetail, isLoading } = useClassStore();

  useEffect(() => {
    if (classId) {
      (async () => {
        fetchClassDetail(classId);
      })();
    }
  }, [classId]);

  if (isLoading) {
    return (
      <div className="grid place-items-center bg-[#f5f5f5]">
        <Loading />
      </div>
    );
  }

  return (
    <>
        <div className="text-[0.5px] rounded-t-xl" data-testid="classNameComponent">
          <ClassName classDetailData={classDetailData} />
        </div>
        <div className="general my-8 overflow-x-auto p-5 grid grid-cols-1 gap-x-20 gap-y-8 sm:gap-x-5 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 lg:gap-x-14 md:gap-x-12">
          <div
            className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1"
            data-testid="generalCollapseComponent"
          >
            <GeneralCollapse classDetailData={classDetailData} />
          </div>
          <div
            className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1"
            data-testid="dateCollapseComponent"
          >
            <DateCollapse />
          </div>
          <div
            className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 float-right"
            data-testid="attendeeCollapseComponent"
          >
            <AttendeeCollapse />
          </div>
        </div>
        <div className="p-5" data-testid="tabListComponent">
          <TabList classDetailData={classDetailData} />
        </div>
    </>
  );
}

export default ClassDetailView;
