import React from "react";
// import { Modal } from "react-bootstrap";
import { useAppSelector } from "../core/redux/reduxStore";
import { shallowEqual } from "react-redux";
import { Modal } from "react-bootstrap";
import { EnumModal } from "../core/enums/EnumModal";
import { useAuthentication } from "../hooks/useAuthentication";

const AddUserModalComponent = () => {
  const store = useAppSelector(
    (state) => ({
      isModalOpen: state.UI.showModal === EnumModal.UserModal,
    }),
    shallowEqual
  );

  const { checkEmailValidation, validationErrors } = useAuthentication();

  const addUser = () => {};
  return (
    <>
      <Modal show={store.isModalOpen} className="p-1">
        <div className="d-flex justify-content-center align-items-center">
          {/* <!-- sign up section start --> */}
          <div className="d-flex justify-content-center w-100">
            {/* <!-- sign up background start --> */}
            <div className="form-view">
              {/* <!-- sign up area start --> */}
              <div className="w-100 pt-2 pb-2 pr-2 pl-2">
                <div className="d-flex justify-content-center align-items-center pt-4 pb-4">
                  <div className="w-75">
                    {/* <!-- form start --> */}
                    <div className="form-name">
                      <div>Add New User</div>
                      <div className="underline"></div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="w-100">
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-100 glass-effect py-2 px-3 my-2"
                          name="Email"
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
                            <select className="form-select glass-effect" aria-label="Default select example">
                              <option selected>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                        <div className="mb-4 mt-5">
                          <button onClick={() => addUser()} className="form-button w-100">
                            Add User
                          </button>
                          {/* {errorMessage ? <small className="text-danger mt-1">{errorMessage}</small> : null}
                            {successMessage ? <small className="text-success mt-1">{successMessage}</small> : null} */}
                        </div>
                      </div>
                    </div>

                    {/* <!-- form end --> */}
                  </div>
                </div>
              </div>
              {/* <!-- sign up area end --> */}
            </div>
            {/* <!-- sign up background end --> */}
          </div>
          {/* <!-- sign up section end --> */}
        </div>
      </Modal>
    </>
  );
};

export const AddUserModal = React.memo(AddUserModalComponent);
