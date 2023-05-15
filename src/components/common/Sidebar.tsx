import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../core/redux/reduxStore";
import { UIAction } from "../core/redux/slices/UISlice";
import { EnumView } from "../core/enums/EnumView";
import { shallowEqual } from "react-redux";
import { EnumAccessType } from "../core/enums/EnumAccessType";
import { Utility } from "../utils/utility";

const SidebarComponent = () => {
  const store = useAppSelector(
    (state) => ({
      view: state.UI.view,
      personalData: state.UI.personalData,
      isDrawerOpen: state.UI.isDrawerOpen,
    }),
    shallowEqual
  );
  const dispatch = useAppDispatch();
  const isDesktop = useMemo(
    () => Utility.BrowserWindowUtil.DeviceRenderCategory.Desktop.some(Utility.BrowserWindowUtil.IsCurrentRenderDevice),
    []
  );
  return (
    <>
      {isDesktop ? (
        <div className="sidebar glass-effect">
          <div
            className={`sidebar-option d-flex flex-column justify-content-center align-items-center ${
              store.view === EnumView.ItemView || store.personalData?.accessType === EnumAccessType.User ? "active" : ""
            }`}
            onClick={() => dispatch(UIAction.setView(EnumView.ItemView))}
          >
            <i className="fa fa-briefcase icon"></i>
            <div>Items</div>
          </div>
          {store.personalData?.accessType !== EnumAccessType.User ? (
            <div
              className={`sidebar-option d-flex flex-column justify-content-center align-items-center ${
                store.view === EnumView.UserView ? "active" : ""
              }`}
              onClick={() => dispatch(UIAction.setView(EnumView.UserView))}
            >
              <i className="fa fa-users icon"></i>
              <div>Users</div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className={`sidebar ${store.isDrawerOpen ? "d-block" : "d-none"}`}>
          <div className="navbar-web-name fw-bold d-flex justify-content-between px-3 py-3">
            <div>Shopping App</div>
            <div
              className="px-3 py-1"
              onClick={() => {
                dispatch(UIAction.setIsDrawerOpen(false));
              }}
            >
              <i className="fa fa-times cur-point"></i>
            </div>
          </div>
          <div
            className={`sidebar-option d-flex align-items-center px-3 ${
              store.view === EnumView.ItemView || store.personalData?.accessType === EnumAccessType.User ? "active" : ""
            }`}
            onClick={() => dispatch(UIAction.setView(EnumView.ItemView))}
          >
            <i className="fa fa-briefcase icon"></i>
            <div>Items</div>
          </div>
          {store.personalData?.accessType !== EnumAccessType.User ? (
            <div
              className={`sidebar-option d-flex align-items-center px-3 ${store.view === EnumView.UserView ? "active" : ""}`}
              onClick={() => dispatch(UIAction.setView(EnumView.UserView))}
            >
              <i className="fa fa-users icon"></i>
              <div>Users</div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export const Sidebar = React.memo(SidebarComponent);
