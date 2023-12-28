import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRow, editRow } from "../Action/action";

const Table = () => {
  const acessState = useSelector((state) => state.list);
  console.log(acessState);
  const Dispatch = useDispatch();
  const navigate = useNavigate();

  const addUserRow = () => {
    navigate("/Form");
  };

  const userDeleteRow = (index) => {
    Dispatch(deleteRow(index));
  };

  const userEditRow = (index) => {
    //  Dispatch(editRow(index));
    navigate(`/Form/${index}`); 
    // Dispatch(editRow(index))
  };

  return (
    <div>
      <button onClick={addUserRow}>Add Table</button>
      <table className="table">
        <tr>
          <th>Sr.no</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        {acessState.map((each, index) => {
          return (
            <tr key={each.id}>
              <th className="view">{each.id}</th>
              <th className="view">{each.name}</th>
              <th className="view">{each.phone}</th>
              <th className="view">{each.email}</th>
              <th>
                <button
                  onClick={() => {
                    userDeleteRow(each.id);
                  }}
                >
                  Delete
                </button>
                /
                <button
                  onClick={() => {
                    userEditRow(each.id);
                  }}
                >
                  Edit
                </button>
              </th>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
