import { useState } from "react";

export const useAuthentication = () => {
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
      setValidationErros({ ...validationErrors, password: "", confirmPassword: "" });
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

  return {
    checkEmailValidation,
    checkNameValidation,
    checkPasswordValidation,
    checkConfirmPasswordValidation,
    setTermsAndCondition,
    checkEmptyFieldError,
    validationErrors,
    validationData,
  };
};
