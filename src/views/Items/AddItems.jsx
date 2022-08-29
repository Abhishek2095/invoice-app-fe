import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/Buttons/Button";
import FormInput from "../../components/Form/FormInput";
import "../style.css";
import { itemInputs } from "./const";

const AddItemForm = ({ toggleModal }) => {
  const [values, setValues] = useState({
    Name: "",
    Description: "",
    Stock: "",
    Price: "",
  });
  const [formInputs, setFormInputs] = useState(itemInputs);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {}, [formInputs]);

  const onChange = (e) => {
    if (
      ["Price", "Stock"].includes(e.target.name) &&
      parseInt(e.target.value) < 0
    )
      return;
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const item = {
      ...values,
      IsActive: true,
    };

    const itemPayload = {
      name: item.Name,
      description: item.Description,
      price: parseInt(item.Price),
      stock: parseInt(item.Stock),
      is_active: item.IsActive,
    };

    let isErrorPresent = false;
    setFormInputs(
      formInputs.map((input) => {
        if (values[`${input.name}`] === "") {
          isErrorPresent = true;
          return {
            ...input,
            errMsg: `${input.label} is required`,
          };
        }

        if (
          input.name === "Name" &&
          !/^([a-zA-Z0-9 ]{3,})$/.test(values.Name)
        ) {
          isErrorPresent = true;
          return {
            ...input,
            errMsg: `${input.label} must be at least 3 characters and contain only alphabets and space`,
          };
        }

        if (input.name === "Price" && !/\b[0-9]{1,}\b/.test(values.Price)) {
          isErrorPresent = true;
          return {
            ...input,
            errMsg: `${input.label} must be numeric`,
          };
        }

        if (input.name === "Stock" && !/\b[0-9]{1,}\b/.test(values.Stock)) {
          isErrorPresent = true;
          return {
            ...input,
            errMsg: `${input.label} must be numeric`,
          };
        }

        return { ...input, errMsg: "" };
      })
    );

    if (isErrorPresent) return;

    axios
      .post("http://localhost:8080/v1/item/add", itemPayload)
      .then((response) => {
        console.log(response.data);
        toggleModal();
      })
      .catch((error) => {
        setErrorMsg("Something went wrong");
      });
  };

  return (
    <>
      <div className="errorMsg">{errorMsg}</div>
      <form onSubmit={onSubmit}>
        {/* {err ? <p>Some error</p> : <p></p>} */}
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <div>
          <div className="float-left">
            <Button type="submit">Submit</Button>
          </div>
          <div className="float-right">
            <Button onClick={toggleModal}>Close</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddItemForm;
