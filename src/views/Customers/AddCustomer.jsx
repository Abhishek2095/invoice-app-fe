import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/Buttons/Button";
import FormInput from "../../components/Form/FormInput";
import "../style.css";

export const inputs = [
  {
    id: 1,
    name: "Name",
    type: "text",
    placeholder: "Name",
    label: "Username",
    pattern: "^[A-Za-z ]{2,}$",
    // required: true,
  },
  {
    id: 2,
    name: "Email",
    type: "email",
    placeholder: "Email",
    label: "Email",
    // required: true,
  },
  {
    id: 3,
    name: "PhoneNumber",
    type: "number",
    placeholder: "Phone Number",
    label: "Phone Number",
    // required: true,
  },
  {
    id: 4,
    name: "Address",
    type: "text",
    placeholder: "Address",
    label: "Address",
    // required: true,
  },
];

const AddCustomerForm = ({ toggleModal }) => {
  const [values, setValues] = useState({
    Name: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
  });
  const [formInputs, setFormInputs] = useState(inputs);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {}, [formInputs]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

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

        if (input.name === "Name" && !/^([a-zA-Z ]{3,})$/.test(values.Name)) {
          isErrorPresent = true;
          return {
            ...input,
            errMsg: `${input.label} must be at least 3 characters and contain only alphabets and space`,
          };
        }

        if (input.name === "Email" && !/^\S+@\S+\.\S+$/.test(values.Email)) {
          isErrorPresent = true;
          return {
            ...input,
            errMsg: `${input.label} is in invalid format`,
          };
        }

        if (
          input.name === "PhoneNumber" &&
          !/\b[0-9]{10}\b/.test(values.PhoneNumber)
        ) {
          isErrorPresent = true;
          return {
            ...input,
            errMsg: `${input.label} should contain only numbers and be 10 digits long`,
          };
        }

        return { ...input, errMsg: "" };
      })
    );

    if (isErrorPresent) return;

    const customer = {
      ...values,
    };

    const customerPayload = {
      name: customer.Name,
      email: customer.Email,
      phone_number: customer.PhoneNumber,
      address: customer.Address,
    };

    axios
      .post("http://localhost:8080/v1/customer/add", customerPayload)
      .then((response) => {
        toggleModal();
      })
      .catch((error) => {
        setErrorMsg("Something went wrong");
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="errorMsg">{errorMsg}</div>
      <form onSubmit={submitHandler}>
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
            <Button type="submit" onClick={onSubmit}>
              Submit
            </Button>
          </div>
          <div className="float-right">
            <Button onClick={toggleModal}>Close</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddCustomerForm;
