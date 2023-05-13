import React, { useEffect } from "react";
import { Sidebar } from "../common/Sidebar";
import { Navbar } from "../common/Navbar";
import { Main } from "../common/Main";
import { GlassmorphismBackground } from "../common/GlassmorphismBackground";

const DashboardComponent = () => {
  useEffect(() => {
    fetch("http://localhost:5000/api/getItems", {
      headers: {
        "Authorization":
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyQWRtaW5AYWRtaW4uY29tIiwicGFzc293cmQiOiJhZG1pbjAxMiEiLCJpYXQiOjE2ODM5Njc4ODR9.lSr3pYNbB3Fr44lwnTnIRrHFZ7eYiQqwvIpmTEGzGrA",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data1", data);
      });
    fetch("http://localhost:5000/api/getUsers", {
      headers: {
        "Authorization":
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyQWRtaW5AYWRtaW4uY29tIiwicGFzc293cmQiOiJhZG1pbjAxMiEiLCJpYXQiOjE2ODM5Njc4ODR9.lSr3pYNbB3Fr44lwnTnIRrHFZ7eYiQqwvIpmTEGzGrA",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data2", data);
      });
  }, []);
  return (
    <>
      <Navbar />
      <GlassmorphismBackground>
        <div className="glass-effect d-flex dashboard-container">
          <Sidebar />
          <Main />
        </div>
      </GlassmorphismBackground>
    </>
  );
};

export const Dashboard = React.memo(DashboardComponent);
