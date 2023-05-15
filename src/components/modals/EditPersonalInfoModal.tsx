import React, { ChangeEvent, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../core/redux/reduxStore";
import { shallowEqual } from "react-redux";
import { Modal } from "react-bootstrap";
import { EnumModal } from "../core/enums/EnumModal";
import { useAuthentication } from "../hooks/useAuthentication";
import { EnumAccessType } from "../core/enums/EnumAccessType";
import { UIAction } from "../core/redux/slices/UISlice";

const EditPersonalInfoModalComponent = () => {
  const dispatch = useAppDispatch();
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const store = useAppSelector(
    (state) => ({
      isModalOpen: state.UI.showModal === EnumModal.EditPersonalInfoModal,
      personalData: state.UI.personalData,
      editingUserData: state.UI.editingUserData,
    }),
    shallowEqual
  );

  const [currAccessType, setCurrAccessType] = useState(store.editingUserData?.accessType);
  useMemo(() => {
    setCurrAccessType(store.editingUserData?.accessType);
  }, [store.editingUserData]);

  const closeModal = () => {
    setValidationErros({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAndCondition: "",
    });
    setIsSelectActive(false);
    setSuccessMessage("");
    dispatch(UIAction.setEditingUserData(undefined));
    dispatch(UIAction.setModalView(EnumModal.None));
  };

  const { checkNameValidation, checkEmailValidation, checkEmptyFieldError, validationErrors, validationData, setValidationErros } =
    useAuthentication();

  const isValidate = (): boolean => {
    if (validationErrors.name || validationErrors.email || !validationData.name || !validationData.email) {
      return false;
    }

    return true;
  };

  const editUser = () => {
    checkEmptyFieldError();
    if (isValidate()) {
      const editedUser = {
        id: store.editingUserData?.id,
        name: validationData.name,
        email: validationData.email,
        accessType: currAccessType,
      };
      fetch("http://localhost:5000/api/updateUsers", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editedUser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.users) {
            setSuccessMessage(data.message);
            dispatch(UIAction.setUserData(data.users));
            dispatch(UIAction.setPersonalData(data.user));
            localStorage.setItem("id", data.user.id);
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("accessType", data.user.accessType);
          }
        });
    }
  };
  return (
    <>
      <Modal show={store.isModalOpen} className="p-1">
        <div className="d-flex justify-content-center align-items-center">
          {/* <!-- edit user section start --> */}
          <div className="d-flex justify-content-center w-100">
            {/* <!-- edit user background start --> */}
            <div className="form-view">
              {/* <!-- edit user area start --> */}
              <div className="w-100 pt-2 pb-2 pr-2 pl-2">
                <div className="d-flex justify-content-center align-items-center pt-4 pb-4">
                  <div className="w-75">
                    {/* <!-- form start --> */}
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-name">
                        <div>Edit Personal Info</div>
                        <div className="underline"></div>
                      </div>
                      <i className="fa fa-times font-20 cur-point" onClick={() => closeModal()}></i>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="w-100">
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-100 glass-effect py-2 px-3 my-2"
                          name="Name"
                          defaultValue={store.editingUserData?.name}
                          onBlur={(e: any) => {
                            checkNameValidation(e.target.value, false);
                          }}
                          onFocus={(e: any) => {
                            checkNameValidation(e.target.value, true);
                          }}
                        />
                        {validationErrors.name ? <small className="text-danger">{validationErrors.name}</small> : null}
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-100 glass-effect py-2 px-3 my-2"
                          name="Email"
                          defaultValue={store.editingUserData?.email}
                          onBlur={(e: any) => {
                            checkEmailValidation(e.target.value, false);
                          }}
                          onFocus={(e: any) => {
                            checkEmailValidation(e.target.value, true);
                          }}
                        />
                        {validationErrors.email ? <small className="text-danger">{validationErrors.email}</small> : null}
                        {store.editingUserData?.accessType === EnumAccessType.Admin ? (
                          <div className="d-flex justify-content-center">
                            <div className="w-100">
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
                            </div>
                          </div>
                        ) : null}
                        <div className="mb-4 mt-5">
                          <button onClick={() => editUser()} className="form-button w-100">
                            Edit Info
                          </button>
                          {successMessage ? <small className="text-success mt-1">{successMessage}</small> : null}
                        </div>
                      </div>
                    </div>

                    {/* <!-- form end --> */}
                  </div>
                </div>
              </div>
              {/* <!-- edit user area end --> */}
            </div>
            {/* <!-- edit user background end --> */}
          </div>
          {/* <!-- edit user section end --> */}
        </div>
      </Modal>
    </>
  );
};

export const EditPersonalInfoModal = React.memo(EditPersonalInfoModalComponent);
