import React from "react";
import NavBar from "../components/NavBar.tsx";

const PageWrapper = (props) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <NavBar />
        {props.children}
      </div>
    </>
  );
};

export default PageWrapper;
