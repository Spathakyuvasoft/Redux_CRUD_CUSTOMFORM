import { useState, useEffect } from "react";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteRow, userSubmit, updateRow } from "../Action/action";
import { useNavigate, useParams } from "react-router-dom";

const Form = () => {
  const [formData, setForm] = useState({ name: "", phone: "", email: "" });

  const [errorObject, seterrorObject] = useState({});
  const [Statue, setStatue] = useState(false);
  const [SelectedId, setSelectedId] = useState("");

  const Dispatch = useDispatch();

  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  const acessState = useSelector((state) => state.list);
  const acessStateId = useSelector((state) => state.id);
  const acessStateRoutedId = useSelector((state) => state.routingId);

  useEffect(() => {
    if (userId && acessState.length !== 0) {
      const informationFilter = acessState.find(
        (each) => parseInt(each.id) === parseInt(userId)
      );
      const { name, phone, email } = informationFilter;
      setForm({ name, phone, email });
      setStatue(true);
      setSelectedId(userId);
    }

    return () => {
      setForm({ name: "", phone: "", email: "" });
    };
  }, [userId]);

  const handle = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = (event) => {
    event.preventDefault();

    const empty1 = {};
    if (formData.name === "") {
      empty1.name1 = "*Name Required";
    } else if (formData.name.length <= 2) {
      empty1.name1 = "*Name characters should be greater than 2";
    }

    if (formData.phone === "") {
      empty1.phone1 = "*Phone Required";
    } else if (formData.phone.length !== 10) {
      empty1.phone1 = "*Phone number length to be 10";
    }

    if (formData.email === "") {
      empty1.email1 = "*Email Required";
    } else if (!formData.email.includes("@")) {
      empty1.email1 = "*Email must include @ format";
    }

    const objectLength = Object.keys(empty1).length;

    if (objectLength === 0) {
      // setNumber(number + 1);
      // formData.id = number;
      Dispatch(userSubmit(formData));
      setForm({
        name: "",
        phone: "",
        email: "",
      });
      seterrorObject({});
    } else {
      seterrorObject(empty1);
    }
  };

  //   const editRow = (index) => {
  //     const informationFilter = list.find((each) => each.id === index);
  //     const { name, phone, email } = informationFilter;
  //     setForm({ name, phone, email });
  //     setStatue(true);
  //     setSelectedId(index);
  //   };

  //   const updateRow = () => {
  //     const Latest = list.findIndex((each) => each.id === SelectedId);
  //     const ones = {
  //       name: formData.name,
  //       phone: formData.phone,
  //       email: formData.email,
  //       id: SelectedId,
  //     };
  //     list.splice(Latest, 1, ones);
  //     const listing = [...list];
  //     console.log(listing);
  //     setList(listing);
  //     setForm({ name: "", phone: "", email: "" });
  //     setStatue(false);
  //   };

  const deleteRow1 = (index) => {
    Dispatch(deleteRow(parseInt(index)));
  };

  const usercheckTable = () => {
    navigate("/");
  };

  const userUpdate = () => {
    const Latest = acessState.findIndex(
      (each) => parseInt(each.id) === parseInt(SelectedId)
    );
    const ones = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      id: userId,
    };
    Dispatch(updateRow({ Latest, ones }));
    // acessState.splice(Latest, 1, ones);
    // const listing = [...list];

    // setList(listing);
    setForm({ name: "", phone: "", email: "" });
    setStatue(false);
  };

  return (
    <div>
      <div className="form">
        <form onSubmit={formSubmit}>
          <label>Name:</label>
          <br />
          <input
            onChange={handle}
            type="text"
            name="name"
            value={formData.name}
          />
          {Object.keys(errorObject).length === 0 ? null : (
            <p className="Required">{errorObject.name1}</p>
          )}
          <br />
          <label>phone:</label>
          <br />
          <input
            onChange={handle}
            type="text"
            name="phone"
            value={formData.phone}
          />
          {Object.keys(errorObject).length === 0 ? null : (
            <p className="Required">{errorObject.phone1}</p>
          )}
          <br />
          <label>Email:</label>
          <br />
          <input
            onChange={handle}
            type="text"
            name="email"
            value={formData.email}
          />
          {Object.keys(errorObject).length === 0 ? null : (
            <p className="Required">{errorObject.email1}</p>
          )}
          <br />

          {Statue ? "" : <button type="submit">Submit</button>}
        </form>
        {Statue ? <button onClick={userUpdate}>Update</button> : ""}
      </div>
      <button onClick={usercheckTable}>Check table</button>
    </div>
  );
};

export default Form;
