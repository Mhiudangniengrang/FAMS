// eslint-disable-next-line no-unused-vars
import React from "react";
import { Helmet } from "react-helmet";
import { StudentDetailView } from "@/section/class/view";

function StudentDetailByClass() {
  return (
    <>
      <Helmet>
        <title> FAMS | Student Detail </title>
      </Helmet>
      <StudentDetailView />
    </>
  );
}

export default StudentDetailByClass;
