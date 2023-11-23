import React, { useEffect, useMemo } from "react";
import { Sidebar } from "../common/Sidebar";
import { Navbar } from "../common/Navbar";
import { Main } from "../common/Main";
import { GlassmorphismBackground } from "../common/GlassmorphismBackground";
import { useAppDispatch } from "../core/redux/reduxStore";
import { UIAction } from "../core/redux/slices/UISlice";
import { EnumAccessType } from "../core/enums/EnumAccessType";
import { Utility } from "../utils/utility";
import { getAllItem } from "../core/redux/slices/ItemSlice";

const DashboardComponent = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(UIAction.setToken(`Bearer ${localStorage.getItem("token")}`));
    dispatch(
      UIAction.setPersonalData({
        id: parseInt(localStorage.getItem("id") ?? ""),
        name: localStorage.getItem("name") ?? "",
        email: localStorage.getItem("email") ?? "",
        accessType:
          (localStorage.getItem("accessType") as EnumAccessType) ??
          EnumAccessType.Empty,
      })
    );
    dispatch(getAllItem());
    fetch(
      "https://mern-shopping-app-server-p7bccw89z-faria-karim-porna.vercel.app/api/getUsers",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(UIAction.setUserData(data.allUsers));
      });
  }, []);

  const isDesktop = useMemo(
    () =>
      Utility.BrowserWindowUtil.DeviceRenderCategory.Desktop.some(
        Utility.BrowserWindowUtil.IsCurrentRenderDevice
      ),
    []
  );
  return (
    <>
      <Navbar />
      <GlassmorphismBackground>
        <div className="glass-effect d-flex dashboard-container">
          {isDesktop ? <Sidebar /> : null}
          <Main />
        </div>
      </GlassmorphismBackground>
    </>
  );
};

export const Dashboard = React.memo(DashboardComponent);
