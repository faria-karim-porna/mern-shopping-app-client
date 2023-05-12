import React, { useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { GlassmorphismBackground } from "../common/GlassmorphismBackground";
import { Link } from "react-router-dom";

const SignUpComponent = () => {
  const {
    checkEmailValidation,
    checkNameValidation,
    checkPasswordValidation,
    checkConfirmPasswordValidation,
    setTermsAndCondition,
    checkEmptyFieldErrorOnSignUp,
    isValidate,
    validationErrors,
    validationData,
  } = useAuthentication();

  const signUp = (): void => {
    checkEmptyFieldErrorOnSignUp();
    if (isValidate()) {
      const id = 1;
      const newUser = {
        id: id,
        name: validationData.name,
        email: validationData.email,
        password: validationData.password,
        createdAt: new Date(),
        createdBy: "Faria",
        accessType: "SuperAdmin",
      };

      // fetch("http://localhost:5000/api/createAccount", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newUser),
      // }).then((res) => console.log(res));
    }
  };
  return (
    <GlassmorphismBackground>
      <div className="d-flex justify-content-center align-items-center">
        {/* <!-- sign up section start --> */}
        <div className="d-flex justify-content-center w-100">
          {/* <!-- sign up background start --> */}
          <div className="form-view">
            <div className="sub-section-name pl-4 text-center">Shopping App</div>
            {/* <!-- sign up area start --> */}
            <div className="w-100 pt-2 pb-2 pr-2 pl-2">
              <div className="glass-effect p-1">
                <div className="d-flex justify-content-center align-items-center pt-4 pb-4">
                  <div className="w-75">
                    {/* <!-- form start --> */}
                    <div className="form-name">
                      <div>Create An Account</div>
                      <div className="underline"></div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="w-100">
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-100 glass-effect py-2 px-3 my-2"
                          name="Name"
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
                          placeholder="Password"
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
                          placeholder="Confirm Password"
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

                        <div className="checkbox-field">
                          <label className="checkbox-container">
                            <p className="checkbox-text">
                              <span>Agree To Our</span>
                              <span className="link-text">Terms And Conditions</span>
                            </p>
                            <input type="checkbox" name="Terms" onChange={() => setTermsAndCondition()} />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                        {validationErrors.termsAndCondition ? (
                          <small className="text-danger">{validationErrors.termsAndCondition}</small>
                        ) : null}
                        <div className="mb-4 mt-5">
                          <button onClick={() => signUp()} className="form-button w-100">
                            Sign Up
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* <!-- form end --> */}
                    <p>
                      <span>Already Have An Account? </span>
                      <Link to="/login">
                        <span className="link-text">Login Here</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- sign up area end --> */}
          </div>
          {/* <!-- sign up background end --> */}
        </div>
        {/* <!-- sign up section end --> */}
      </div>
    </GlassmorphismBackground>
  );
};

export const SignUp = React.memo(SignUpComponent);
