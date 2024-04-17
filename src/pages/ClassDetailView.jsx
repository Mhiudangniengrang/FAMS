import { Helmet } from "react-helmet";
import { ClassDetailView } from "@/section/class/view";

function ClassDetailViews() {
  return (
    <div>
      <Helmet>
        <title> FAMS | Class Detail </title>
      </Helmet>
      <ClassDetailView />
    </div>
  );
}

export default ClassDetailViews;
