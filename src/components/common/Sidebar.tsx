import React from "react";
import { useAppDispatch, useAppSelector } from "../core/redux/reduxStore";
import { UIAction } from "../core/redux/slices/UISlice";
import { EnumView } from "../core/enums/EnumView";
import { shallowEqual } from "react-redux";

const SidebarComponent = () => {
  const store = useAppSelector(
    (state) => ({
      view: state.UI.view,
    }),
    shallowEqual
  );
  const dispatch = useAppDispatch();
  return (
    <div className="sidebar glass-effect">
      <div
        className={`sidebar-option d-flex flex-column justify-content-center align-items-center ${
          store.view === EnumView.ItemView ? "active" : ""
        }`}
        onClick={() => dispatch(UIAction.setView(EnumView.ItemView))}
      >
        <i className="fa fa-briefcase icon"></i>
        <div>Items</div>
      </div>
      <div
        className={`sidebar-option d-flex flex-column justify-content-center align-items-center ${
          store.view === EnumView.UserView ? "active" : ""
        }`}
        onClick={() => dispatch(UIAction.setView(EnumView.UserView))}
      >
        <i className="fa fa-users icon"></i>
        <div>Users</div>
      </div>
    </div>
  );
};

export const Sidebar = React.memo(SidebarComponent);
