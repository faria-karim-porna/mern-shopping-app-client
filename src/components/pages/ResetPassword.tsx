import React from "react";

const ResetPasswordComponent = () => {
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
              <div className="d-flex justify-content-center align-items-center text-center pt-4 pb-4">
                <div className="w-75">
                  {/* <!-- form start --> */}
                  <div className="form-name">Reset Password</div>
                  <div className="d-flex justify-content-center">
                    <div className="w-100">
                      <input type="email" placeholder="Email" className="w-100 input-field my-2" name="Email" />
                      <input type="password" placeholder="New Password" className="w-100 input-field my-2" name="Password" />
                      <input type="password" placeholder="Confirm New Password" className="w-100 input-field my-2" name="ConfirmPassword" />
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
