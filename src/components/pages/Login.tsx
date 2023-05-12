import React, { useState } from "react";
import { GlassmorphismBackground } from "../common/GlassmorphismBackground";

const LoginComponent = () => {
  const [loginErrors, setLoginErros] = useState({
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const checkEmailValidation = (value: string, isFocused: boolean) => {
    const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (isFocused) {
      setLoginErros({ ...loginErrors, email: "" });
    } else {
      setLoginData({ ...loginData, email: value });
      if (!value) {
        setLoginErros({ ...loginErrors, email: "Email is required" });
      } else if (!emailValidationRegex.test(value)) {
        setLoginErros({ ...loginErrors, email: "Invalid email address" });
      }
    }
  };

  const checkPasswordValidation = (value: string, isFocused: boolean) => {
    const minimumPassLength = 8;
    const atLeastOneNumberRegex = /\d/;
    const atLeastOneSpecialCharacterRegex = /[!@#$%^&*]/;
    const atLeastOneCharacterRegex = /[a-zA-Z]/;
    if (isFocused) {
      setLoginErros({ ...loginErrors, password: "" });
    } else {
      setLoginData({ ...loginData, password: value });
      if (!value) {
        setLoginErros({ ...loginErrors, password: "Password is required" });
      } else if (
        value.length < minimumPassLength ||
        !atLeastOneNumberRegex.test(value) ||
        !atLeastOneCharacterRegex.test(value) ||
        !atLeastOneSpecialCharacterRegex.test(value)
      ) {
        setLoginErros({
          ...loginErrors,
          password: "Password should be of 8 or more characters with a mix of letters, numbers & symbols",
        });
      }
    }
  };
  const login = () => {};
  return (
    <GlassmorphismBackground>
      <div className="d-flex justify-content-center align-items-center">
        {/* <!-- login section start --> */}
        <div className="d-flex justify-content-center w-100">
          {/* <!-- login background start --> */}
          <div className="form-view">
            <div className="sub-section-name pl-4 text-center">Shopping App</div>
            {/* <!-- login area start --> */}
            <div className="w-100 pt-2 pb-2 pr-2 pl-2">
              <div className="form-card p-1">
                <div className="d-flex justify-content-center align-items-center pt-4 pb-4">
                  <div className="w-75">
                    {/* <!-- form start --> */}
                    <div className="form-name text-center">Log In</div>
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
                        {loginErrors.email ? <small className="text-danger">{loginErrors.email}</small> : null}
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
                        {loginErrors.password ? <small className="text-danger">{loginErrors.password}</small> : null}
                        <div className="mb-4 mt-5">
                          <button onClick={() => login()} className="form-button w-100">
                            Log In
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
            {/* <!-- login area end --> */}
          </div>
          {/* <!-- login background end --> */}
        </div>
        {/* <!-- login section end --> */}
      </div>
    </GlassmorphismBackground>
  );
};

export const Login = React.memo(LoginComponent);
