import React from "react";
import { CssBaseline } from "@material-ui/core";

import Navigation from "../containers/Navigation";
import Footer from "../components/Footer";

const Layout = (props) => {
    return (
        <div>
            <CssBaseline />
            <div style={{ marginBottom: "100px" }}>
                <Navigation />
            </div>

            <main>{props.children}</main>

            <Footer />
        </div>
    );
};

export default Layout;
