import React, { useState } from "react";

const SignUpComponent = () => {
  const [validationErrors, setValidationErros] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAndCondition: "",
  });

  const [validationData, setValidationData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAndCondition: false,
  });

  const checkEmailValidation = (value: string, isFocused: boolean) => {
    const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (isFocused) {
      setValidationErros({ ...validationErrors, email: "" });
    } else {
      setValidationData({ ...validationData, email: value });
      if (!value) {
        setValidationErros({ ...validationErrors, email: "Email is required" });
      } else if (!emailValidationRegex.test(value)) {
        setValidationErros({ ...validationErrors, email: "Invalid email address" });
      }
    }
  };

  const checkNameValidation = (value: string, isFocused: boolean) => {
    const noNumberAndSpecialCharRegex = /^[a-zA-Z\s]+$/;
    if (isFocused) {
      setValidationErros({ ...validationErrors, name: "" });
    } else {
      setValidationData({ ...validationData, name: value });
      if (!value) {
        setValidationErros({ ...validationErrors, name: "Name is required" });
      } else if (!noNumberAndSpecialCharRegex.test(value)) {
        setValidationErros({ ...validationErrors, name: "Name should not contain special characters or numbers" });
      }
    }
  };

  const checkPasswordValidation = (value: string, isFocused: boolean) => {
    const minimumPassLength = 8;
    const atLeastOneNumberRegex = /\d/;
    const atLeastOneSpecialCharacterRegex = /[!@#$%^&*]/;
    const atLeastOneCharacterRegex = /[a-zA-Z]/;
    if (isFocused) {
      setValidationErros({ ...validationErrors, password: "" });
    } else {
      setValidationData({ ...validationData, password: value });
      if (!value) {
        setValidationErros({ ...validationErrors, password: "Password is required" });
      } else if (
        value.length < minimumPassLength ||
        !atLeastOneNumberRegex.test(value) ||
        !atLeastOneCharacterRegex.test(value) ||
        !atLeastOneSpecialCharacterRegex.test(value)
      ) {
        setValidationErros({
          ...validationErrors,
          password: "Password should be of 8 or more characters with a mix of letters, numbers & symbols",
        });
      }
    }
  };

  const checkConfirmPasswordValidation = (value: string, isFocused: boolean) => {
    if (isFocused) {
      setValidationErros({ ...validationErrors, confirmPassword: "" });
    } else {
      if (!value) {
        setValidationErros({ ...validationErrors, confirmPassword: "Confirm password is required" });
      } else if (value !== validationData.password) {
        setValidationErros({ ...validationErrors, confirmPassword: "Passwords didn't match" });
      }
    }
  };

  const checkEmptyFieldErrorOnSignUp = () => {
    setValidationErros({
      name: validationData.name ? validationErrors.name : "Name is required",
      email: validationData.email ? validationErrors.email : "Email is required",
      password: validationData.password ? validationErrors.password : "Password is required",
      confirmPassword: validationData.confirmPassword ? validationErrors.confirmPassword : "Confirm password is required",
      termsAndCondition: validationData.termsAndCondition ? validationErrors.termsAndCondition : "Terms & condition should be checked",
    });
  };

  const isValidate = (): boolean => {
    if (
      validationErrors.name ||
      validationErrors.email ||
      validationErrors.password ||
      validationErrors.confirmPassword ||
      !validationErrors.termsAndCondition ||
      !validationData.name ||
      !validationData.email ||
      !validationData.password ||
      !validationData.confirmPassword
    ) {
      return false;
    }
    return true;
  };

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
    <div className="page d-flex justify-content-center align-items-center">
      {/* <!-- sign up section start --> */}
      <div className="d-flex justify-content-center w-100">
        {/* <!-- sign up background start --> */}
        <div className="form-view">
          <div className="sub-section-name pl-4 text-center">Shopping App</div>
          {/* <!-- sign up area start --> */}
          <div className="w-100 pt-2 pb-2 pr-2 pl-2">
            <div className="form-card p-1">
              <div className="d-flex justify-content-center align-items-center pt-4 pb-4">
                <div className="w-75">
                  {/* <!-- form start --> */}
                  <div className="form-name text-center">Sign Up</div>
                  <div className="d-flex justify-content-center">
                    <div className="w-100">
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-100 input-field my-2"
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
                        className="w-100 input-field my-2"
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
                        className="w-100 input-field my-2"
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
                        className="w-100 input-field my-2"
                        name="ConfirmPassword"
                        onBlur={(e: any) => {
                          checkConfirmPasswordValidation(e.target.value, false);
                        }}
                        onFocus={(e: any) => {
                          checkConfirmPasswordValidation(e.target.value, true);
                        }}
                      />
                      {validationErrors.confirmPassword ? <small className="text-danger">{validationErrors.confirmPassword}</small> : null}

                      <div className="checkbox-field">
                        <label className="checkbox-container">
                          <p className="checkbox-text">
                            Agree To Our
                            <span className="link-text">Terms And Conditions</span>
                          </p>
                          <input
                            type="checkbox"
                            name="Terms"
                            onChange={() => setValidationData({ ...validationData, termsAndCondition: !validationData.termsAndCondition })}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      {validationErrors.termsAndCondition ? <small className="text-danger">{validationErrors.termsAndCondition}</small> : null}
                      <div className="mb-4 mt-5">
                        <button onClick={() => signUp()} className="form-button w-100">
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <!-- form end --> */}
                  <p className="text-center">
                    Don't Have An Account?
                    <span className="link-text">Create One</span>
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
  );
};

export const SignUp = React.memo(SignUpComponent);
