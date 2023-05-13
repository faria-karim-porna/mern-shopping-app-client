import React, { useEffect } from "react";
import { Sidebar } from "../common/Sidebar";
import { Navbar } from "../common/Navbar";
import { Main } from "../common/Main";
import { GlassmorphismBackground } from "../common/GlassmorphismBackground";
import { useAppDispatch } from "../core/redux/reduxStore";
import { UIAction } from "../core/redux/slices/UISlice";
import { EnumAccessType } from "../core/enums/EnumAccessType";

const DashboardComponent = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      UIAction.setPersonalData({
        id: parseInt(localStorage.getItem("id") ?? ""),
        name: localStorage.getItem("name") ?? "",
        email: localStorage.getItem("email") ?? "",
        accessType: localStorage.getItem("accessType") as EnumAccessType ?? EnumAccessType.Empty,
      })
    );
    fetch("http://localhost:5000/api/getItems", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyQWRtaW5AYWRtaW4uY29tIiwicGFzc293cmQiOiJhZG1pbjAxMiEiLCJpYXQiOjE2ODM5Njc4ODR9.lSr3pYNbB3Fr44lwnTnIRrHFZ7eYiQqwvIpmTEGzGrA",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(UIAction.setItemData(data.allItems));
      });
    fetch("http://localhost:5000/api/getUsers", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyQWRtaW5AYWRtaW4uY29tIiwicGFzc293cmQiOiJhZG1pbjAxMiEiLCJpYXQiOjE2ODM5Njc4ODR9.lSr3pYNbB3Fr44lwnTnIRrHFZ7eYiQqwvIpmTEGzGrA",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(UIAction.setUserData(data.allUsers));
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
