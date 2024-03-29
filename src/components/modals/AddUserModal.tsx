import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../core/redux/reduxStore";
import { shallowEqual } from "react-redux";
import { Modal } from "react-bootstrap";
import { EnumModal } from "../core/enums/EnumModal";
import { useAuthentication } from "../hooks/useAuthentication";
import { EnumAccessType } from "../core/enums/EnumAccessType";
import { UIAction } from "../core/redux/slices/UISlice";

const AddUserModalComponent = () => {
  const dispatch = useAppDispatch();
  const [successMessage, setSuccessMessage] = useState("");
  const [isSelectActive, setIsSelectActive] = useState(false);
  const store = useAppSelector(
    (state) => ({
      isModalOpen: state.UI.showModal === EnumModal.AddUserModal,
      personalData: state.UI.personalData,
    }),
    shallowEqual
  );

  const [currAccessType, setCurrAccessType] = useState(() =>
    store.personalData?.accessType === EnumAccessType.Moderator ? EnumAccessType.Moderator : EnumAccessType.Admin
  );

  const { checkEmailValidation, checkEmptyFieldError, validationErrors, validationData, setValidationErros, setValidationData } =
    useAuthentication();

  const isValidate = (): boolean => {
    if (validationErrors.email || !validationData.email) {
      return false;
    }

    return true;
  };

  const addUser = () => {
    checkEmptyFieldError();
    if (isValidate()) {
      const date = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
      const time = new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
      const dateAndTime = `${date} (${time})`;

      const newUser = {
        email: validationData.email,
        createdAt: dateAndTime,
        createdBy: store.personalData?.name,
        accessType: store.personalData?.accessType === EnumAccessType.Moderator ? EnumAccessType.Moderator : currAccessType,
        creatorId: store.personalData?.id,
      };
      fetch("http://localhost:5000/api/addUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.users) {
            setSuccessMessage(data.message);
            dispatch(UIAction.setUserData(data.users));
          }
        });
    }
  };

  const closeModal = () => {
    setValidationErros({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAndCondition: "",
    });
    setValidationData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAndCondition: false,
    });
    setIsSelectActive(false);
    setCurrAccessType(store.personalData?.accessType === EnumAccessType.Moderator ? EnumAccessType.Moderator : EnumAccessType.Admin);
    setSuccessMessage("");
    dispatch(UIAction.setModalView(EnumModal.None));
  };

  return (
    <>
      <Modal show={store.isModalOpen} className="p-1">
        <div className="d-flex justify-content-center align-items-center">
          {/* <!-- add user section start --> */}
          <div className="d-flex justify-content-center w-100">
            {/* <!-- add user background start --> */}
            <div className="form-view">
              {/* <!-- add user area start --> */}
              <div className="w-100 pt-2 pb-2 pr-2 pl-2">
                <div className="d-flex justify-content-center align-items-center pt-4 pb-4">
                  <div className="w-75">
                    {/* <!-- form start --> */}
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-name">
                        <div>Add New User</div>
                        <div className="underline"></div>
                      </div>
                      <i className="fa fa-times font-20 cur-point" onClick={() => closeModal()}></i>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="w-100">
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-100 glass-effect py-2 px-3 my-2"
                          name="Email"
                          defaultValue={validationData.email}
                          onBlur={(e: any) => {
                            checkEmailValidation(e.target.value, false);
                          }}
                          onFocus={(e: any) => {
                            checkEmailValidation(e.target.value, true);
                          }}
                        />
                        {validationErrors.email ? <small className="text-danger">{validationErrors.email}</small> : null}
                        <div className="d-flex justify-content-center">
                          <div className="w-100">
                            {store.personalData?.accessType !== EnumAccessType.Moderator ? (
                              <div className="w-100 select">
                                <div
                                  className="glass-effect py-2 px-3 my-2 w-100 d-flex justify-content-between"
                                  onClick={() => {
                                    setIsSelectActive(true);
                                  }}
                                >
                                  <div>{currAccessType}</div>
                                  <i className="fa fa-caret-down down-caret-icon" aria-hidden="true"></i>
                                </div>
                                <div className={`glass-effect ${isSelectActive ? "d-block" : "d-none"}`}>
                                  <div
                                    className="option py-2 px-3 w-100"
                                    onClick={() => {
                                      setIsSelectActive(false);
                                      setCurrAccessType(EnumAccessType.Admin);
                                    }}
                                  >
                                    Admin
                                  </div>
                                  <div
                                    className="option py-2 px-3 w-100"
                                    onClick={() => {
                                      setIsSelectActive(false);
                                      setCurrAccessType(EnumAccessType.Moderator);
                                    }}
                                  >
                                    Moderator
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="w-100 select">
                                <div className="glass-effect py-2 px-3 my-2 w-100 d-flex justify-content-between">
                                  <div>Moderator</div>
                                  <i className="fa fa-caret-down down-caret-icon" aria-hidden="true"></i>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mb-4 mt-5">
                          <button onClick={() => addUser()} className="form-button w-100">
                            Add User
                          </button>
                          {successMessage ? <small className="text-success mt-1">{successMessage}</small> : null}
                        </div>
                      </div>
                    </div>

                    {/* <!-- form end --> */}
                  </div>
                </div>
              </div>
              {/* <!-- add user area end --> */}
            </div>
            {/* <!-- add user background end --> */}
          </div>
          {/* <!-- add user section end --> */}
        </div>
      </Modal>
    </>
  );
};

export const AddUserModal = React.memo(AddUserModalComponent);
