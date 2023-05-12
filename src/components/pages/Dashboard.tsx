import React from "react";
import { Sidebar } from "../common/Sidebar";
import { Navbar } from "../common/Navbar";
import { Main } from "../common/Main";
import { GlassmorphismBackground } from "../common/GlassmorphismBackground";

const DashboardComponent = () => {
  return (
    <>
      <Navbar />
      <GlassmorphismBackground>
        {/* <div className="d-flex">
          <Sidebar />
          <Main />
        </div> */}
      </GlassmorphismBackground>
    </>
  );
};

export const Dashboard = React.memo(DashboardComponent);
