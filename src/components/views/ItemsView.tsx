import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../core/redux/reduxStore";
import { UIAction } from "../core/redux/slices/UISlice";
import { EnumModal } from "../core/enums/EnumModal";
import { shallowEqual } from "react-redux";
import { ItemType } from "../core/types/itemsType";
import { EnumAccessType } from "../core/enums/EnumAccessType";

const ItemsViewComponent = () => {
  const dispatch = useAppDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [allData, setAllData] = useState<ItemType[] | undefined>();
  const store = useAppSelector(
    (state) => ({
      itemsData: state.UI.itemsData,
      personalData: state.UI.personalData,
    }),
    shallowEqual
  );

  useEffect(() => {
    const allItemData = store.itemsData;
    if (searchKey) {
      const filteredData = allItemData?.filter(
        (item) =>
          item.id?.toString().includes(searchKey) ||
          item.name?.toLowerCase().includes(searchKey) ||
          item.quantity?.toString().includes(searchKey) ||
          item.unitPrice?.toString().includes(searchKey) ||
          item.createdAt?.toLowerCase().includes(searchKey) ||
          item.createdBy?.toLowerCase().includes(searchKey)
      );
      setAllData(filteredData);
    } else {
      setAllData(allItemData);
    }
  }, [searchKey, store.itemsData]);

  const deleteData = (id?: number) => {
    const deletedItem = { id: id };
    fetch("http://localhost:5000/api/deleteItems", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(deletedItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          dispatch(UIAction.setItemData(data.items));
        }
      });
  };
  return (
    <div className="main w-100 px-4">
      <div className="d-flex justify-content-between mt-4">
        <input
          type="text"
          placeholder="Searh..."
          className="glass-effect py-2 px-3 my-2 w-50"
          name="Search"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchKey(e.target.value)}
        />
        {store.personalData?.accessType !== EnumAccessType.User ? (
          <button onClick={() => dispatch(UIAction.setModalView(EnumModal.AddItemModal))} className="form-button px-4">
            Add Item
          </button>
        ) : null}
      </div>
      <div className="glass-effect mt-4">
        {(allData?.length ?? 0) > 0 ? (
          <div className="table-box table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Created By</th>
                  {store.personalData?.accessType !== EnumAccessType.User && store.personalData?.accessType !== EnumAccessType.Moderator ? (
                    <th scope="col">Action</th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {allData?.map((data) => (
                  <tr key={data._id}>
                    <th scope="row">{data.id}</th>
                    <td>{data.name}</td>
                    <td>{data.quantity}</td>
                    <td>{data.unitPrice}</td>
                    <td>{data.createdAt}</td>
                    <td>{data.createdBy}</td>
                    {store.personalData?.accessType !== EnumAccessType.User &&
                    store.personalData?.accessType !== EnumAccessType.Moderator ? (
                      <td>
                        <div className="d-flex">
                          <div
                            className="edit-icon d-flex justify-content-center align-items-center mx-2"
                            onClick={() => {
                              dispatch(UIAction.setEditingItemData(data));
                              dispatch(UIAction.setModalView(EnumModal.EditItemModal));
                            }}
                          >
                            <i className="fa fa-pencil"></i>
                          </div>
                          <div
                            className="delete-icon d-flex justify-content-center align-items-center mx-2"
                            onClick={() => deleteData(data.id)}
                          >
                            <i className="fa fa-trash-o"></i>
                          </div>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-3 text-danger">No product is available yet</div>
        )}
      </div>
    </div>
  );
};

export const ItemsView = React.memo(ItemsViewComponent);
