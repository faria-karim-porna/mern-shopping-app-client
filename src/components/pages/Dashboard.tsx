import React from "react";
import { Sidebar } from "../common/Sidebar";
import { Navbar } from "../common/Navbar";
import { Main } from "../common/Main";

const DashboardComponent = () => {
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <Main />
      </div>
    </>
  );
};

export const Dashboard = React.memo(DashboardComponent);
