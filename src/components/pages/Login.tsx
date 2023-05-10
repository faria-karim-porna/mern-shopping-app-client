import React from "react";

const LoginComponent = () => {
  const login = () => {};
  return (
    <div className="page d-flex justify-content-center align-items-center">
      {/* <!-- login section start --> */}
      <div className="d-flex justify-content-center w-100">
        {/* <!-- login background start --> */}
        <div className="login-view">
          <div className="sub-section-name pl-4 text-center">Shopping App</div>
          {/* <!-- login area start --> */}
          <div className="w-100 pt-2 pb-2 pr-2 pl-2">
            <div className="login-form-card p-1">
              <div className="d-flex justify-content-center align-items-center text-center pt-4 pb-4">
                <div className="w-75">
                  {/* <!-- form start --> */}
                  <div className="form-name">Log In</div>
                  <div className="d-flex justify-content-center">
                    <div className="w-100">
                      <input type="email" placeholder="Email" className="w-100 input-field my-2" name="Email" />
                      <input type="password" placeholder="Password" className="w-100 input-field my-2" name="Password" />
                      <div className="mb-4 mt-5">
                        <button onClick={() => login()} className="log-in-button w-100">
                          Log In
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <!-- form end --> */}
                  <p className="login-text text-center">
                    Don't Have An Account?
                    <span className="login-link-text">Create One</span>
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
  );
};

export const Login = React.memo(LoginComponent);
