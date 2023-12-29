import { useState, useEffect } from "react";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteRow, userSubmit, updateRow } from "../Action/action";
import { useNavigate, useParams } from "react-router-dom";

const Form = () => {
  const [formData, setForm] = useState({ name: "", phone: "", email: "" });

  const [errorObject, seterrorObject] = useState({});
  const [Status, setStatus] = useState(false);
  const [SelectedId, setSelectedId] = useState("");

  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  const acessStateTable = useSelector((state) => state.userTableInformation);

  useEffect(() => {
    if (userId) {
      const userInformationFilter = acessStateTable.find(
        (each) => parseInt(each.id) === parseInt(userId)
      );

      if (userInformationFilter) {
        const { name, phone, email } = userInformationFilter;
        setForm({ name, phone, email });
        setStatus(true);
        setSelectedId(userId);
      }
    }

    return () => {
      setForm({ name: "", phone: "", email: "" });
    };
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = (event) => {
    event.preventDefault();

    const emptyObject = {};
    if (formData.name === "") {
      emptyObject.userName = "*Name Required";
    } else if (formData.name.length <= 2) {
      emptyObject.userName = "*Name characters should be greater than 2";
    }

    if (formData.phone === "") {
      emptyObject.userPhone = "*Phone Required";
    } else if (formData.phone.length !== 10) {
      emptyObject.userPhone = "*Phone number length to be 10";
    }

    if (formData.email === "") {
      emptyObject.userEmail = "*Email Required";
    } else if (!formData.email.includes("@")) {
      emptyObject.userEmail = "*Email must include @ format";
    }

    const objectLength = Object.keys(emptyObject).length;

    if (objectLength === 0) {
      Dispatch(userSubmit(formData));
      setForm({
        name: "",
        phone: "",
        email: "",
      });
      seterrorObject({});
    } else {
      seterrorObject(emptyObject);
    }
  };

  const usercheckTable = () => {
    navigate("/");
  };

  const userUpdate = () => {
    const acessUserIndex = acessStateTable.findIndex(
      (each) => parseInt(each.id) === parseInt(SelectedId)
    );
    const userUpdatedRow = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      id: userId,
    };
    Dispatch(updateRow({ acessUserIndex, userUpdatedRow }));

    setForm({ name: "", phone: "", email: "" });
    setStatus(false);
  };

  return (
    <div className="formPage">
      <div className="form">
        <form onSubmit={formSubmit}>
          <label>Name:</label>
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={formData.name}
          />
          {Object.keys(errorObject).length === 0 ? null : (
            <p className="Required">{errorObject.userName}</p>
          )}
          <br />
          <label>phone:</label>
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="phone"
            value={formData.phone}
          />
          {Object.keys(errorObject).length === 0 ? null : (
            <p className="Required">{errorObject.userPhone}</p>
          )}
          <br />
          <label>Email:</label>
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={formData.email}
          />
          {Object.keys(errorObject).length === 0 ? null : (
            <p className="Required">{errorObject.userEmail}</p>
          )}
          <br />

          {Status ? "" : <button type="submit">Submit</button>}
        </form>
        {Status ? <button onClick={userUpdate}>Update</button> : ""}
      </div>
      <button onClick={usercheckTable}>Check table</button>
    </div>
  );
};

export default Form;
