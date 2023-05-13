import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../core/redux/reduxStore";
import { UIAction } from "../core/redux/slices/UISlice";
import { EnumModal } from "../core/enums/EnumModal";
import { UserType } from "../core/types/usersType";
import { shallowEqual } from "react-redux";
import { EnumAccessType } from "../core/enums/EnumAccessType";

const UsersViewComponent = () => {
  const dispatch = useAppDispatch();
  const [allData, setAllData] = useState<UserType[] | undefined>();
  const store = useAppSelector(
    (state) => ({
      usersData: state.UI.usersData,
      personalData: state.UI.personalData,
    }),
    shallowEqual
  );

  useEffect(() => {
    setAllData(store.usersData);
  }, [store.usersData]);

  const deleteData = (id?: number) => {
    const deletedUser = { id: id };
    fetch("http://localhost:5000/api/deleteUsers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(deletedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.users) {
          dispatch(UIAction.setUserData(data.users));
        }
      });
  };
  return (
    <div className="main w-100 px-4">
      <div className="d-flex justify-content-between mt-4">
        <input type="text" placeholder="Searh..." className="glass-effect py-2 px-3 my-2 w-50" name="Search" />
        <button onClick={() => dispatch(UIAction.setModalView(EnumModal.UserModal))} className="form-button px-4">
          Add User
        </button>
      </div>
      <div className="glass-effect mt-4">
        {(allData?.length ?? 0) > 0 ? (
          <div className="table-box table-responsive font-20">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Created By</th>
                  <th scope="col">Access Type</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allData?.map((data) => (
                  <tr key={data._id}>
                    <th scope="row">{data.id}</th>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.createdAt}</td>
                    <td>{data.createdBy}</td>
                    <td>{data.accessType}</td>
                    <td>
                      <div className="d-flex">
                        {store.personalData?.accessType === EnumAccessType.SuperAdmin ||
                        (store.personalData?.accessType === EnumAccessType.Admin &&
                          (data.accessType === EnumAccessType.Admin ||
                            data.accessType === EnumAccessType.Moderator ||
                            data.accessType === EnumAccessType.User)) ||
                        (store.personalData?.accessType === EnumAccessType.Moderator && data.accessType === EnumAccessType.User) ? (
                          <div className="edit-icon d-flex justify-content-center align-items-center mx-2">
                            <i className="fa fa-pencil"></i>
                          </div>
                        ) : null}{" "}
                        {store.personalData?.accessType === EnumAccessType.SuperAdmin ||
                        (store.personalData?.accessType === EnumAccessType.Admin &&
                          (data.accessType === EnumAccessType.Moderator || data.accessType === EnumAccessType.User)) ||
                        (store.personalData?.accessType === EnumAccessType.Moderator && data.accessType === EnumAccessType.User) ? (
                          <div
                            className="delete-icon d-flex justify-content-center align-items-center mx-2"
                            onClick={() => deleteData(data.id)}
                          >
                            <i className="fa fa-trash-o"></i>
                          </div>
                        ) : null}{" "}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-3 text-danger">There is no user</div>
        )}
      </div>
    </div>
  );
};

export const UsersView = React.memo(UsersViewComponent);
