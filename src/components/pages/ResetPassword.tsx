import React, { useState } from "react";

const ResetPasswordComponent = () => {
  const [resetPasswordErrors, setResetPasswordErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [resetPasswordData, setResetPasswordData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const checkEmailValidation = (value: string, isFocused: boolean) => {
    const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (isFocused) {
      setResetPasswordErrors({ ...resetPasswordErrors, email: "" });
    } else {
      setResetPasswordData({ ...resetPasswordData, email: value });
      if (!value) {
        setResetPasswordErrors({ ...resetPasswordErrors, email: "Email is required" });
      } else if (!emailValidationRegex.test(value)) {
        setResetPasswordErrors({ ...resetPasswordErrors, email: "Invalid email address" });
      }
    }
  };

  const checkPasswordValidation = (value: string, isFocused: boolean) => {
    const minimumPassLength = 8;
    const atLeastOneNumberRegex = /\d/;
    const atLeastOneSpecialCharacterRegex = /[!@#$%^&*]/;
    const atLeastOneCharacterRegex = /[a-zA-Z]/;
    if (isFocused) {
      setResetPasswordErrors({ ...resetPasswordErrors, password: "" });
    } else {
      setResetPasswordData({ ...resetPasswordData, password: value });
      if (!value) {
        setResetPasswordErrors({ ...resetPasswordErrors, password: "Password is required" });
      } else if (
        value.length < minimumPassLength ||
        !atLeastOneNumberRegex.test(value) ||
        !atLeastOneCharacterRegex.test(value) ||
        !atLeastOneSpecialCharacterRegex.test(value)
      ) {
        setResetPasswordErrors({
          ...resetPasswordErrors,
          password: "Password should be of 8 or more characters with a mix of letters, numbers & symbols",
        });
      }
    }
  };

  const checkConfirmPasswordValidation = (value: string, isFocused: boolean) => {
    if (isFocused) {
      setResetPasswordErrors({ ...resetPasswordErrors, confirmPassword: "" });
    } else {
      if (!value) {
        setResetPasswordErrors({ ...resetPasswordErrors, confirmPassword: "Confirm password is required" });
      } else if (value !== resetPasswordData.password) {
        setResetPasswordErrors({ ...resetPasswordErrors, confirmPassword: "Passwords didn't match" });
      }
    }
  };
  const resetPassword = () => {};
  return (
    <div className="page d-flex justify-content-center align-items-center">
      {/* <!-- reset password section start --> */}
      <div className="d-flex justify-content-center w-100">
        {/* <!-- reset password background start --> */}
        <div className="form-view">
          <div className="sub-section-name pl-4 text-center">Shopping App</div>
          {/* <!-- reset password area start --> */}
          <div className="w-100 pt-2 pb-2 pr-2 pl-2">
            <div className="form-card p-1">
              <div className="d-flex justify-content-center align-items-center pt-4 pb-4">
                <div className="w-75">
                  {/* <!-- form start --> */}
                  <div className="form-name text-center">Reset Password</div>
                  <div className="d-flex justify-content-center">
                    <div className="w-100">
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-100 input-field my-2"
                        name="Email"
                        onBlur={(e: any) => {
                          checkEmailValidation(e.target.value, false);
                        }}
                        onFocus={(e: any) => {
                          checkEmailValidation(e.target.value, true);
                        }}
                      />
                      {resetPasswordErrors.email ? <small className="text-danger">{resetPasswordErrors.email}</small> : null}
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-100 input-field my-2"
                        name="Password"
                        onBlur={(e: any) => {
                          checkPasswordValidation(e.target.value, false);
                        }}
                        onFocus={(e: any) => {
                          checkPasswordValidation(e.target.value, true);
                        }}
                      />
                      {resetPasswordErrors.password ? <small className="text-danger">{resetPasswordErrors.password}</small> : null}
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-100 input-field my-2"
                        name="ConfirmPassword"
                        onBlur={(e: any) => {
                          checkConfirmPasswordValidation(e.target.value, false);
                        }}
                        onFocus={(e: any) => {
                          checkConfirmPasswordValidation(e.target.value, true);
                        }}
                      />
                      {resetPasswordErrors.confirmPassword ? (
                        <small className="text-danger">{resetPasswordErrors.confirmPassword}</small>
                      ) : null}
                      <div className="mb-4 mt-5">
                        <button onClick={() => resetPassword()} className="form-button w-100">
                          SAVE
                        </button>
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
  );
};

export const ResetPassword = React.memo(ResetPasswordComponent);
