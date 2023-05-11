import React, { useState } from "react";

const SignUpComponent = () => {
  const [validationErrors, setValidationErros] = useState({
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
      if (!value) {
        setValidationErros({ ...validationErrors, email: "Email is required" });
      } else if (emailValidationRegex.test(value)) {
        console.log("value", value);
        setValidationErros({ ...validationErrors, email: "Invalid email address" });
      }
    }
  };

  const signUp = (): void => {
    const id = 1;
    const newUser = {
      id: id,
      name: (document.getElementsByName("Name")[0] as HTMLInputElement).value,
      email: (document.getElementsByName("Email")[0] as HTMLInputElement).value,
      password: (document.getElementsByName("Password")[0] as HTMLInputElement).value,
      createdAt: new Date(),
      createdBy: "Faria",
      accessType: "SuperAdmin",
    };

    console.log("New User", newUser);

    // fetch("http://localhost:5000/api/createAccount", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newUser),
    // }).then((res) => console.log(res));
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
                      <input type="text" placeholder="Name" className="w-100 input-field my-2" name="Name" />
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
                      {validationErrors.email ? <p className="text-danger">{validationErrors.email}</p> : null}
                      <input type="password" placeholder="Password" className="w-100 input-field my-2" name="Password" />
                      <input type="password" placeholder="Confirm Password" className="w-100 input-field my-2" name="ConfirmPassword" />
                      <div className="checkbox-field">
                        <label className="checkbox-container">
                          <p className="checkbox-text">
                            Agree To Our
                            <span className="link-text">Terms And Conditions</span>
                          </p>
                          <input type="checkbox" name="Terms" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="mb-4 mt-5">
                        <button onClick={() => signUp()} className="log-in-button w-100">
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
