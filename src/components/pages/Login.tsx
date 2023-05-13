import React, { useState } from "react";
import { GlassmorphismBackground } from "../common/GlassmorphismBackground";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";

const LoginComponent = () => {
  const navigate = useNavigate();
  const { checkEmailValidation, checkPasswordValidation, checkEmptyFieldError, validationErrors, validationData } = useAuthentication();
  const [errorMessage, setErrorMessage] = useState("");
  const isValidate = (): boolean => {
    if (validationErrors.email || validationErrors.password || !validationData.email || !validationData.password) {
      return false;
    }
    return true;
  };
  const login = () => {
    checkEmptyFieldError();
    if (isValidate()) {
      const loginUser = {
        email: validationData.email,
        password: validationData.password,
      };

      fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            localStorage.setItem("token", data.data);
            navigate("/");
          } else {
            setErrorMessage(data.error);
          }
        });
    }
  };
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
              <div className="glass-effect p-1">
                <div className="d-flex justify-content-center align-items-center pt-4 pb-4">
                  <div className="w-75">
                    {/* <!-- form start --> */}
                    <div className="form-name">
                      <div>Login Form</div> <div className="underline"></div>
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
                        <div>
                          <Link to="/resetpassword">
                            <span className="link-text">Reset Password</span>
                          </Link>
                        </div>

                        <div className="mb-4 mt-3">
                          <button onClick={() => login()} className="form-button w-100">
                            Login
                          </button>
                          {errorMessage ? <small className="text-danger mt-1">{errorMessage}</small> : null}
                        </div>
                      </div>
                    </div>
                    {/* <!-- form end --> */}
                    <p>
                      <span>Don't Have An Account? </span>
                      <Link to="/signup">
                        <span className="link-text">Create One</span>
                      </Link>
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
