import React, { ChangeEvent, useState } from "react";
// import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../core/redux/reduxStore";
import { shallowEqual } from "react-redux";
import { Modal } from "react-bootstrap";
import { EnumModal } from "../core/enums/EnumModal";
import { useAuthentication } from "../hooks/useAuthentication";
import { EnumAccessType } from "../core/enums/EnumAccessType";
import { UIAction } from "../core/redux/slices/UISlice";
import { useItem } from "../hooks/useItem";

const EditItemModalComponent = () => {
  const dispatch = useAppDispatch();
  const [successMessage, setSuccessMessage] = useState("");

  const store = useAppSelector(
    (state) => ({
      isModalOpen: state.UI.showModal === EnumModal.EditItemModal,
      personalData: state.UI.personalData,
      editingItemData: state.UI.editingItemData,
    }),
    shallowEqual
  );

  const { checkNameValidation, checkQuantityValidation, checkUnitPriceValidation, checkEmptyFieldError, itemInfoErrors, itemData } =
    useItem();

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

  const editItem = () => {
    checkEmptyFieldError();
    if (isValidate()) {
      const editedItem = {
        id: store.editingItemData?.id,
        name: itemData.name,
        unitPrice: parseFloat(itemData.unitPrice?.toString() ?? ""),
        quantity: parseInt(itemData.quantity?.toString() ?? ""),
      };
      fetch("http://localhost:5000/api/updateItems", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editedItem),
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
    setSuccessMessage("");
    dispatch(UIAction.setEditingItemData(undefined));
    dispatch(UIAction.setModalView(EnumModal.None));
  };
  return (
    <>
      <Modal show={store.isModalOpen} className="p-1">
        <div className="d-flex justify-content-center align-items-center">
          {/* <!-- edit item section start --> */}
          <div className="d-flex justify-content-center w-100">
            {/* <!-- edit item background start --> */}
            <div className="form-view">
              {/* <!-- edit item area start --> */}
              <div className="w-100 pt-2 pb-2 pr-2 pl-2">
                <div className="d-flex justify-content-center align-items-center pt-4 pb-4">
                  <div className="w-75">
                    {/* <!-- form start --> */}
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-name">
                        <div>Edit Item</div>
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
                          defaultValue={store.editingItemData?.name}
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
                          defaultValue={store.editingItemData?.quantity}
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
                          defaultValue={store.editingItemData?.unitPrice}
                          onBlur={(e: any) => {
                            checkUnitPriceValidation(e.target.value, false);
                          }}
                          onFocus={(e: any) => {
                            checkUnitPriceValidation(e.target.value, true);
                          }}
                        />
                        {itemInfoErrors.unitPrice ? <small className="text-danger">{itemInfoErrors.unitPrice}</small> : null}
                        <div className="mb-4 mt-5">
                          <button onClick={() => editItem()} className="form-button w-100">
                            Edit Item
                          </button>
                          {successMessage ? <small className="text-success mt-1">{successMessage}</small> : null}
                        </div>
                      </div>
                    </div>

                    {/* <!-- form end --> */}
                  </div>
                </div>
              </div>
              {/* <!-- edit item area end --> */}
            </div>
            {/* <!-- edit item background end --> */}
          </div>
          {/* <!-- edit item section end --> */}
        </div>
      </Modal>
    </>
  );
};

export const EditItemModal = React.memo(EditItemModalComponent);
