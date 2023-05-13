import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../core/redux/reduxStore";
import { UIAction } from "../core/redux/slices/UISlice";
import { EnumModal } from "../core/enums/EnumModal";
import { UserType } from "../core/types/usersType";
import { shallowEqual } from "react-redux";

const UsersViewComponent = () => {
  const dispatch = useAppDispatch();
  const [allData, setAllData] = useState<UserType[] | undefined>();
  const store = useAppSelector(
    (state) => ({
      usersData: state.UI.usersData,
    }),
    shallowEqual
  );

  useEffect(() => {
    setAllData(store.usersData);
  }, []);
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
          <div className="table-box table-responsive">
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
                    <td>Edit Delete</td>
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
