import React, { useState } from "react";
import { GlassmorphismBackground } from "../common/GlassmorphismBackground";
import { Link } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";

const ResetPasswordComponent = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    checkEmailValidation,
    checkPasswordValidation,
    checkConfirmPasswordValidation,
    checkEmptyFieldError,
    validationErrors,
    validationData,
  } = useAuthentication();

  const isValidate = (): boolean => {
    if (
      validationErrors.email ||
      validationErrors.password ||
      validationErrors.confirmPassword ||
      !validationData.email ||
      !validationData.password ||
      !validationData.confirmPassword
    ) {
      return false;
    }
    return true;
  };
  const resetPassword = () => {
    checkEmptyFieldError();
    if (isValidate()) {
      const resetPasswordUser = {
        email: validationData.email,
        password: validationData.password,
      };

      fetch("http://localhost:5000/api/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetPasswordUser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setErrorMessage("");
            setSuccessMessage(data.message);
          } else {
            setSuccessMessage("");
            setErrorMessage(data.error);
          }
        });
    }
  };

  return (
    <GlassmorphismBackground>
      <div className="d-flex justify-content-center align-items-center">
        {/* <!-- reset password section start --> */}
        <div className="d-flex justify-content-center w-100">
          {/* <!-- reset password background start --> */}
          <div className="form-view">
            <div className="sub-section-name pl-4 text-center">Shopping App</div>
            {/* <!-- reset password area start --> */}
            <div className="w-100 pt-2 pb-2 pr-2 pl-2">
              <div className="glass-effect p-1">
                <div className="d-flex justify-content-center align-items-center pt-4 pb-4">
                  <div className="w-75">
                    {/* <!-- form start --> */}
                    <div className="form-name">
                      <div>Reset Password</div>
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
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-100 glass-effect py-2 px-3 my-2"
                          name="Password"
                          onBlur={(e: any) => {
                            checkPasswordValidation(e.target.value, false);
                          }}
                          onFocus={(e: any) => {
                            checkPasswordValidation(e.target.value, true);
                          }}
                        />
                        {validationErrors.password ? <small className="text-danger">{validationErrors.password}</small> : null}
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="w-100 glass-effect py-2 px-3 my-2"
                          name="ConfirmPassword"
                          onBlur={(e: any) => {
                            checkConfirmPasswordValidation(e.target.value, false);
                          }}
                          onFocus={(e: any) => {
                            checkConfirmPasswordValidation(e.target.value, true);
                          }}
                        />
                        {validationErrors.confirmPassword ? (
                          <small className="text-danger">{validationErrors.confirmPassword}</small>
                        ) : null}
                        <div>
                          <span>Go back to </span>
                          <Link to="/login">
                            <span className="link-text">login</span>
                          </Link>
                        </div>
                        <div className="mb-4 mt-3">
                          <button onClick={() => resetPassword()} className="form-button w-100">
                            Save
                          </button>
                          {errorMessage ? <small className="text-danger mt-1">{errorMessage}</small> : null}
                          {successMessage ? <small className="text-success mt-1">{successMessage}</small> : null}
                        </div>
                      </div>
                    </div>
                    {/* <!-- form end --> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- reset password area end --> */}
          </div>
          {/* <!-- reset password background end --> */}
        </div>
        {/* <!-- reset password section end --> */}
      </div>
    </GlassmorphismBackground>
  );
};

export const ResetPassword = React.memo(ResetPasswordComponent);
