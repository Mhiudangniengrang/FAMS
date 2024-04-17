import { Helmet } from "react-helmet";
import { ClassView } from "@/section/class/view";

function ClassesView() {
  return (
    <div>
      <Helmet>
        <title> FAMS | Class Management </title>
      </Helmet>
      <ClassView />
    </div>
  );
}

export default ClassesView;
