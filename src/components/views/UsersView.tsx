import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../core/redux/reduxStore";
import { UIAction } from "../core/redux/slices/UISlice";
import { EnumModal } from "../core/enums/EnumModal";
import { UserType } from "../core/types/usersType";
import { shallowEqual } from "react-redux";
import { EnumAccessType } from "../core/enums/EnumAccessType";
import { Utility } from "../utils/utility";

const UsersViewComponent = () => {
  const dispatch = useAppDispatch();
  const [allData, setAllData] = useState<UserType[] | undefined>();
  const [searchKey, setSearchKey] = useState("");
  const store = useAppSelector(
    (state) => ({
      usersData: state.UI.usersData,
      personalData: state.UI.personalData,
    }),
    shallowEqual
  );

  useEffect(() => {
    const usersWithoutSelf = store.usersData?.filter((user) => user.id !== store.personalData?.id);
    if (searchKey) {
      const filteredData = usersWithoutSelf?.filter(
        (user) =>
          user.id?.toString().includes(searchKey) ||
          user.name?.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.accessType?.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.createdAt?.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.createdBy?.toLowerCase().includes(searchKey.toLowerCase())
      );
      setAllData(filteredData);
    } else {
      setAllData(usersWithoutSelf);
    }
  }, [searchKey, store.usersData]);

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
  const isDesktop = useMemo(
    () => Utility.BrowserWindowUtil.DeviceRenderCategory.Desktop.some(Utility.BrowserWindowUtil.IsCurrentRenderDevice),
    []
  );
  const isTablet = useMemo(
    () => Utility.BrowserWindowUtil.DeviceRenderCategory.Tablet.some(Utility.BrowserWindowUtil.IsCurrentRenderDevice),
    []
  );
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
        <button onClick={() => dispatch(UIAction.setModalView(EnumModal.AddUserModal))} className="form-button px-4">
          {isDesktop || isTablet ? (
            <>
              <i className="fa fa-plus plus-icon mr-1" aria-hidden="true"></i> Add User
            </>
          ) : (
            <i className="fa fa-plus plus-icon mr-1" aria-hidden="true"></i>
          )}
        </button>
      </div>

      <div className="glass-effect mt-4">
        {(allData?.length ?? 0) > 0 ? (
          <div className={`table-box table-responsive ${isDesktop ? "font-20" : isTablet ? "font-16" : "font-12"} table-scroll`}>
            <table className="table">
              <thead>
                {isDesktop ? (
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Access Type</th>
                    <th scope="col">Actions</th>
                  </tr>
                ) : isTablet ? (
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">User Info</th>
                    <th scope="col">Creation Info</th>
                    <th scope="col">Actions</th>
                  </tr>
                ) : (
                  <tr>
                    <th scope="col">User Info</th>
                    <th scope="col">Actions</th>
                  </tr>
                )}
              </thead>
              {isDesktop ? (
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
                            <div
                              className="edit-icon d-flex justify-content-center align-items-center mx-2"
                              onClick={() => {
                                dispatch(UIAction.setEditingUserData(data));
                                dispatch(UIAction.setModalView(EnumModal.EditUserModal));
                              }}
                            >
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
              ) : isTablet ? (
                <tbody>
                  {allData?.map((data) => (
                    <tr key={data._id}>
                      <th scope="row">{data.id}</th>
                      <td>
                        <div>
                          <span className="fw-bold">Name: </span>
                          <span>{data.name}</span>
                        </div>
                        <div>
                          <span className="fw-bold">Email: </span>
                          <span>{data.email}</span>
                        </div>
                        <div>
                          <span className="fw-bold">Access Type: </span>
                          <span>{data.accessType}</span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span className="fw-bold">Created At: </span>
                          <span>{data.createdAt}</span>
                        </div>
                        <div>
                          <span className="fw-bold">Created By: </span>
                          <span>{data.createdBy}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          {store.personalData?.accessType === EnumAccessType.SuperAdmin ||
                          (store.personalData?.accessType === EnumAccessType.Admin &&
                            (data.accessType === EnumAccessType.Admin ||
                              data.accessType === EnumAccessType.Moderator ||
                              data.accessType === EnumAccessType.User)) ||
                          (store.personalData?.accessType === EnumAccessType.Moderator && data.accessType === EnumAccessType.User) ? (
                            <div
                              className="edit-icon d-flex justify-content-center align-items-center mx-2"
                              onClick={() => {
                                dispatch(UIAction.setEditingUserData(data));
                                dispatch(UIAction.setModalView(EnumModal.EditUserModal));
                              }}
                            >
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
              ) : (
                <tbody>
                  {allData?.map((data) => (
                    <tr key={data._id}>
                      <td>
                        <div>
                          <span className="fw-bold"># </span>
                          <span>{data.id} </span>
                          <span>{data.name}</span>
                        </div>
                        <div>
                          <span className="fw-bold">Email: </span>
                          <span>{data.email}</span>
                        </div>
                        <div>
                          <span className="fw-bold">Access Type: </span>
                          <span>{data.accessType}</span>
                        </div>
                        <div>
                          <span className="fw-bold">Created At: </span>
                          <span>{data.createdAt}</span>
                        </div>
                        <div>
                          <span className="fw-bold">Created By: </span>
                          <span>{data.createdBy}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          {store.personalData?.accessType === EnumAccessType.SuperAdmin ||
                          (store.personalData?.accessType === EnumAccessType.Admin &&
                            (data.accessType === EnumAccessType.Admin ||
                              data.accessType === EnumAccessType.Moderator ||
                              data.accessType === EnumAccessType.User)) ||
                          (store.personalData?.accessType === EnumAccessType.Moderator && data.accessType === EnumAccessType.User) ? (
                            <div
                              className="edit-icon d-flex justify-content-center align-items-center mx-2"
                              onClick={() => {
                                dispatch(UIAction.setEditingUserData(data));
                                dispatch(UIAction.setModalView(EnumModal.EditUserModal));
                              }}
                            >
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
              )}
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
