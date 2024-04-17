import React from "react";
import { Helmet } from "react-helmet";
import { PreviewEmail } from "@/section/reverve/Detail";

function PreviewEmaill() {
    return (
        <div>
            <Helmet>
                <title> FAMS | Email Template Detail </title>
            </Helmet>
            <PreviewEmail />
        </div>
    );
}

export default PreviewEmaill;