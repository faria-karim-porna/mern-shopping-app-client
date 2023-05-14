import React from "react";
import { useAppDispatch, useAppSelector } from "../core/redux/reduxStore";
import { shallowEqual } from "react-redux";
import { UIAction } from "../core/redux/slices/UISlice";
import { useNavigate } from "react-router-dom";
import { EnumModal } from "../core/enums/EnumModal";

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
  return (
    <nav className="navbar navbar-expand-lg site-nav glass-effect">
      <div className="d-flex align-items-center w-100 justify-content-between px-5">
        <div>Shopping App</div>
        <div className="">
          <div>{store.personalData?.name}</div>
          <div className="navbar-dropdown px-4 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>Profile</div>
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
            <div></div>
            <div>{store.personalData?.name}</div>
            <div>{store.personalData?.email}</div>
            <div>
              <span>Access Type: </span>
              <span>{store.personalData?.accessType}</span>
            </div>
            <div></div>
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
