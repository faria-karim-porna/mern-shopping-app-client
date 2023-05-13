import React from "react";
import { useAppDispatch } from "../core/redux/reduxStore";
import { UIAction } from "../core/redux/slices/UISlice";
import { EnumModal } from "../core/enums/EnumModal";

const ItemsViewComponent = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="main w-100 px-4">
      <div className="d-flex justify-content-between mt-4">
        <input type="text" placeholder="Searh..." className="glass-effect py-2 px-3 my-2 w-50" name="Search" />
        <button onClick={() => dispatch(UIAction.setModalView(EnumModal.UserModal))} className="form-button px-4">
          Add Item
        </button>
      </div>
      <div className="glass-effect mt-4">
        <div className="table-box table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const ItemsView = React.memo(ItemsViewComponent);
