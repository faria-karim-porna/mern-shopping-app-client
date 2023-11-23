import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../core/redux/reduxStore";
import { shallowEqual } from "react-redux";
import { Modal } from "react-bootstrap";
import { EnumModal } from "../core/enums/EnumModal";
import { UIAction } from "../core/redux/slices/UISlice";
import { useItem } from "../hooks/useItem";

const AddItemModalComponent = () => {
  const dispatch = useAppDispatch();
  const [successMessage, setSuccessMessage] = useState("");

  const store = useAppSelector(
    (state) => ({
      isModalOpen: state.UI.showModal === EnumModal.AddItemModal,
      personalData: state.UI.personalData,
    }),
    shallowEqual
  );

  const {
    checkNameValidation,
    checkQuantityValidation,
    checkUnitPriceValidation,
    checkEmptyFieldError,
    itemInfoErrors,
    itemData,
    setItemData,
    setItemInfoErrors,
  } = useItem();

  const isValidate = (): boolean => {
    if (
      itemInfoErrors.name ||
      itemInfoErrors.quantity ||
      itemInfoErrors.unitPrice ||
      !itemData.name ||
      !itemData.quantity ||
      !itemData.unitPrice
    ) {
      return false;
    }

    return true;
  };

  const addItem = () => {
    checkEmptyFieldError();
    if (isValidate()) {
      const date = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
      const time = new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
      const dateAndTime = `${date} (${time})`;

      const newItem = {
        name: itemData.name,
        unitPrice: parseFloat(itemData.unitPrice?.toString() ?? ""),
        quantity: parseInt(itemData.quantity?.toString() ?? ""),
        createdAt: dateAndTime,
        createdBy: store.personalData?.name,
        creatorId: store.personalData?.id,
      };
      fetch("https://mern-shopping-app-server-p7bccw89z-faria-karim-porna.vercel.app/api/addItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.items) {
            setSuccessMessage(data.message);
            dispatch(UIAction.setItemData(data.items));
          }
        });
    }
  };

  const closeModal = () => {
    setItemInfoErrors({
      name: "",
      unitPrice: "",
      quantity: "",
    });
    setItemData({
      name: "",
      unitPrice: "",
      quantity: "",
    });
    setSuccessMessage("");
    dispatch(UIAction.setModalView(EnumModal.None));
  };
  return (
    <>
      <Modal show={store.isModalOpen} className="p-1">
        <div className="d-flex justify-content-center align-items-center">
          {/* <!-- add item section start --> */}
          <div className="d-flex justify-content-center w-100">
            {/* <!-- add item background start --> */}
            <div className="form-view">
              {/* <!-- add item area start --> */}
              <div className="w-100 pt-2 pb-2 pr-2 pl-2">
                <div className="d-flex justify-content-center align-items-center pt-4 pb-4">
                  <div className="w-75">
                    {/* <!-- form start --> */}
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-name">
                        <div>Add New Item</div>
                        <div className="underline"></div>
                      </div>
                      <i className="fa fa-times font-20 cur-point" onClick={() => closeModal()}></i>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="w-100">
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-100 glass-effect py-2 px-3 my-2"
                          name="Name"
                          defaultValue={itemData.name}
                          onBlur={(e: any) => {
                            checkNameValidation(e.target.value, false);
                          }}
                          onFocus={(e: any) => {
                            checkNameValidation(e.target.value, true);
                          }}
                        />
                        {itemInfoErrors.name ? <small className="text-danger">{itemInfoErrors.name}</small> : null}
                        <input
                          type="text"
                          placeholder="Quantity"
                          className="w-100 glass-effect py-2 px-3 my-2"
                          name="Quantity"
                          defaultValue={itemData.quantity}
                          onBlur={(e: any) => {
                            checkQuantityValidation(e.target.value, false);
                          }}
                          onFocus={(e: any) => {
                            checkQuantityValidation(e.target.value, true);
                          }}
                        />
                        {itemInfoErrors.quantity ? <small className="text-danger">{itemInfoErrors.quantity}</small> : null}
                        <input
                          type="text"
                          placeholder="Unit Price"
                          className="w-100 glass-effect py-2 px-3 my-2"
                          name="Unit Price"
                          defaultValue={itemData.unitPrice}
                          onBlur={(e: any) => {
                            checkUnitPriceValidation(e.target.value, false);
                          }}
                          onFocus={(e: any) => {
                            checkUnitPriceValidation(e.target.value, true);
                          }}
                        />
                        {itemInfoErrors.unitPrice ? <small className="text-danger">{itemInfoErrors.unitPrice}</small> : null}
                        <div className="mb-4 mt-5">
                          <button onClick={() => addItem()} className="form-button w-100">
                            Add Item
                          </button>
                          {successMessage ? <small className="text-success mt-1">{successMessage}</small> : null}
                        </div>
                      </div>
                    </div>

                    {/* <!-- form end --> */}
                  </div>
                </div>
              </div>
              {/* <!-- add item area end --> */}
            </div>
            {/* <!-- add item background end --> */}
          </div>
          {/* <!-- add item section end --> */}
        </div>
      </Modal>
    </>
  );
};

export const AddItemModal = React.memo(AddItemModalComponent);
