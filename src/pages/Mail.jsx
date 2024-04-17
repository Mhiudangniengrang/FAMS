import React from "react";
import { Helmet } from "react-helmet";
import { Maill } from "@/section/setting/view";

function Mail() {
  return (
    <div>
      <Helmet>
        <title> FAMS | Email Template </title>
      </Helmet>
      <Maill />
    </div>
  );
}

export default Mail;
