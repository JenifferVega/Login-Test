import React from "react";
import ReactDom from "react-dom";
import Routers from "./routes/Routers";

ReactDom.render(
    <React.StrictMode>
        <Routers/>
    </React.StrictMode>,
    document.getElementById("root")
);