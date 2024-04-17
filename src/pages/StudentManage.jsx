import { Helmet } from "react-helmet";
import StudentView from "@/section/student/view/StudentView";

function StudentManage() {
  return (
    <>
      <Helmet>
        <title> FAMS | Student </title>
      </Helmet>
      <StudentView />
    </>
  );
}

export default StudentManage;
