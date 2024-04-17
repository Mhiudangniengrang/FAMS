import React from "react";
import { Helmet } from "react-helmet";
import StudentTableEdit from "@/section/student/StudentTableEdit";

function StudentDetail() {
  return (
    <>
      <Helmet>
        <title> FAMS | Student Detail </title>
      </Helmet>
      <StudentTableEdit />
    </>
  );
}

export default StudentDetail;
