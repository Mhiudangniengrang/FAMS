import { Helmet } from "react-helmet";
import { CreateView } from "@/section/class/create";

function CreateClassView() {
  return (
    <div>
      <Helmet>
        <title> FAMS | Create Class </title>
      </Helmet>
      <CreateView/>
    </div>
  );
}

export default CreateClassView;
