import { useMemo, useState } from "react";
import { useAppSelector } from "../core/redux/reduxStore";
import { shallowEqual } from "react-redux";

export const useAuthentication = () => {
  const store = useAppSelector(
    (state) => ({
      editingUserData: state.UI.editingUserData,
    }),
    shallowEqual
  );
  const [validationErrors, setValidationErros] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAndCondition: "",
  });

  const [validationData, setValidationData] = useState({
    name: store.editingUserData ? store.editingUserData.name : "",
    email: store.editingUserData ? store.editingUserData.email : "",
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
    // const atLeastOneSpecialCharacterRegex = /^(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$/;
    const atLeastOneCharacterRegex = /[a-zA-Z]/;
    if (isFocused) {
      setValidationErros({ ...validationErrors, password: "", confirmPassword: "" });
    } else {
      setValidationData({ ...validationData, password: value });
      if (!value) {
        setValidationErros({ ...validationErrors, password: "Password is required" });
      } else if (
        value.length < minimumPassLength ||
        !atLeastOneNumberRegex.test(value) ||
        !atLeastOneCharacterRegex.test(value)
      ) {
        setValidationErros({
          ...validationErrors,
          password: "Password should be of 8 or more characters with a mix of letters & numbers",
        });
      } else if (value !== validationData.confirmPassword) {
        setValidationErros({ ...validationErrors, confirmPassword: "Passwords didn't match" });
      }
    }
  };

  const checkConfirmPasswordValidation = (value: string, isFocused: boolean) => {
    if (isFocused) {
      setValidationErros({ ...validationErrors, confirmPassword: "" });
    } else {
      setValidationData({ ...validationData, confirmPassword: value });
      if (!value) {
        setValidationErros({ ...validationErrors, confirmPassword: "Confirm password is required" });
      } else if (value !== validationData.password) {
        setValidationErros({ ...validationErrors, confirmPassword: "Passwords didn't match" });
      }
    }
  };

  const setTermsAndCondition = () => {
    setValidationErros({ ...validationErrors, termsAndCondition: "" });
    setValidationData({ ...validationData, termsAndCondition: !validationData.termsAndCondition });
  };

  const checkEmptyFieldError = () => {
    setValidationErros({
      name: validationData.name ? validationErrors.name : "Name is required",
      email: validationData.email ? validationErrors.email : "Email is required",
      password: validationData.password ? validationErrors.password : "Password is required",
      confirmPassword: validationData.confirmPassword ? validationErrors.confirmPassword : "Confirm password is required",
      termsAndCondition: validationData.termsAndCondition ? validationErrors.termsAndCondition : "Terms & condition should be checked",
    });
  };

  useMemo(() => {
    setValidationData({
      ...validationData,
      name: store.editingUserData ? store.editingUserData.name : "",
      email: store.editingUserData ? store.editingUserData.email : "",
    });
  }, [store.editingUserData]);

  return {
    checkEmailValidation,
    checkNameValidation,
    checkPasswordValidation,
    checkConfirmPasswordValidation,
    setTermsAndCondition,
    checkEmptyFieldError,
    validationErrors,
    validationData,
    setValidationErros,
    setValidationData
  };
};
