import React from "react";
import { useAppSelector } from "../core/redux/reduxStore";
import { shallowEqual } from "react-redux";

const NavbarComponent = () => {
  const store = useAppSelector(
    (state) => ({
      personalData: state.UI.personalData,
    }),
    shallowEqual
  );
  return (
    <nav className="navbar navbar-expand-lg site-nav glass-effect">
      <div className="d-flex align-items-center w-100 justify-content-between px-5">
        <div>Shopping App</div>
        <div className="">
          <div>{store.personalData?.name}</div>
          <div className="navbar-dropdown px-4 py-3">
            <div>Profile</div>
            <div></div>
            <div>{store.personalData?.name}</div>
            <div>{store.personalData?.email}</div>
            <div><span>Access Type: </span><span>{store.personalData?.accessType}</span></div>
            <div></div>
            <div>Logout</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Navbar = React.memo(NavbarComponent);
