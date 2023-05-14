import { useMemo, useState } from "react";
import { useAppSelector } from "../core/redux/reduxStore";
import { shallowEqual } from "react-redux";

export const useItem = () => {
  const store = useAppSelector(
    (state) => ({
      editingItemData: state.UI.editingItemData,
    }),
    shallowEqual
  );

  const [itemInfoErrors, setItemInfoErrors] = useState({
    name: "",
    unitPrice: "",
    quantity: "",
  });

  const [itemData, setItemData] = useState({
    name: store.editingItemData ? store.editingItemData.name : "",
    unitPrice: store.editingItemData ? store.editingItemData.unitPrice : "",
    quantity: store.editingItemData ? store.editingItemData.quantity : "",
  });

  const checkNameValidation = (value: string, isFocused: boolean) => {
    if (isFocused) {
      setItemInfoErrors({ ...itemInfoErrors, name: "" });
    } else {
      setItemData({ ...itemData, name: value });
      if (!value) {
        setItemInfoErrors({ ...itemInfoErrors, name: "Name is required" });
      }
    }
  };

  const checkUnitPriceValidation = (value: string, isFocused: boolean) => {
    const positiveFloatingPointRegex = /^\+?(?:\d+|\d+\.\d+)$/;
    if (isFocused) {
      setItemInfoErrors({ ...itemInfoErrors, unitPrice: "" });
    } else {
      setItemData({ ...itemData, unitPrice: value });
      if (!value) {
        setItemInfoErrors({ ...itemInfoErrors, unitPrice: "Unit price is required" });
      } else if (!positiveFloatingPointRegex.test(value)) {
        setItemInfoErrors({ ...itemInfoErrors, unitPrice: "Unit price can not be negative and should not contain any char" });
      }
    }
  };

  const checkQuantityValidation = (value: string, isFocused: boolean) => {
    const positiveIntegerRegex = /^[1-9]\d*$/;
    if (isFocused) {
      setItemInfoErrors({ ...itemInfoErrors, quantity: "" });
    } else {
      setItemData({ ...itemData, quantity: value });
      if (!value) {
        setItemInfoErrors({ ...itemInfoErrors, quantity: "Quantity is required" });
      } else if (!positiveIntegerRegex.test(value)) {
        setItemInfoErrors({ ...itemInfoErrors, quantity: "Quantity should be positive integer" });
      }
    }
  };

  const checkEmptyFieldError = () => {
    setItemInfoErrors({
      name: itemData.name ? itemInfoErrors.name : "Name is required",
      unitPrice: itemData.unitPrice ? itemInfoErrors.unitPrice : "Unit price is required",
      quantity: itemData.quantity ? itemInfoErrors.quantity : "Quantity is required",
    });
  };

  useMemo(() => {
    setItemData({
      ...itemData,
      name: store.editingItemData ? store.editingItemData.name : "",
      unitPrice: store.editingItemData ? store.editingItemData.unitPrice : "",
      quantity: store.editingItemData ? store.editingItemData.quantity : "",
    });
  }, [store.editingItemData]);

  return {
    checkUnitPriceValidation,
    checkNameValidation,
    checkQuantityValidation,
    checkEmptyFieldError,
    itemInfoErrors,
    itemData,
  };
};
