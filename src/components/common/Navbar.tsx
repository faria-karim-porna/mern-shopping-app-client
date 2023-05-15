import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../core/redux/reduxStore";
import { shallowEqual } from "react-redux";
import { UIAction } from "../core/redux/slices/UISlice";
import { useNavigate } from "react-router-dom";
import { EnumModal } from "../core/enums/EnumModal";
import { Utility } from "../utils/utility";
import { Sidebar } from "./Sidebar";

const NavbarComponent = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector(
    (state) => ({
      personalData: state.UI.personalData,
    }),
    shallowEqual
  );
  const navigate = useNavigate();
  const logout = () => {
    fetch("http://localhost:5000/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          localStorage.clear();
          navigate("/login");
        }
      });
  };
  const isDesktop = useMemo(
    () => Utility.BrowserWindowUtil.DeviceRenderCategory.Desktop.some(Utility.BrowserWindowUtil.IsCurrentRenderDevice),
    []
  );
  return (
    <nav className="navbar navbar-expand-lg site-nav glass-effect font-22">
      <div className="d-flex align-items-center w-100 justify-content-between px-5">
        {isDesktop ? (
          <div className="navbar-web-name fw-bold">Shopping App</div>
        ) : (
          <>
            <div
              className="navbar-web-name fw-bold"
              onClick={() => {
                dispatch(UIAction.setIsDrawerOpen(true));
              }}
            >
              <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
            <Sidebar />
          </>
        )}
        <div className="navbar-username-section">
          <div className="navbar-username fw-bold">{store.personalData?.name}</div>
          <div className="navbar-dropdown px-4 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="font-20 fw-bold">Profile</div>
              <div
                className="edit-icon d-flex justify-content-center align-items-center mx-2"
                onClick={() => {
                  dispatch(UIAction.setEditingUserData(store.personalData));
                  dispatch(UIAction.setModalView(EnumModal.EditPersonalInfoModal));
                }}
              >
                <i className="fa fa-pencil"></i>
              </div>
            </div>
            <div className="thin-line my-3"></div>
            <div>{store.personalData?.name}</div>
            <div>{store.personalData?.email}</div>
            <div>
              <span className="fw-bold">Access Type: </span>
              <span>{store.personalData?.accessType}</span>
            </div>
            <div className="thin-line my-3"></div>
            <button onClick={() => logout()} className="form-button px-4 w-100">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Navbar = React.memo(NavbarComponent);
