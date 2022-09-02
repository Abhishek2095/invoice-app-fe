import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import axios from "axios";
import React, { useState } from "react";
import Button from "../../components/Buttons/Button";
import FormInput from "../../components/Form/FormInput";
import ModalTest from "../../components/Modal/Modal";
import ShowTable from "../../components/Table/Table";
import CustomerTable from "../Customers/CustomerTable";
import ItemTable from "../Items/ItemTable";
import "./AddInvoice.css";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import Total from "./Total";

const AddInvoice = () => {
  const getDateString = (days = 0) => {
    const currentDate = new Date();
    const requiredDate = new Date();
    requiredDate.setDate(currentDate.getDate() + days);
    return requiredDate.toISOString().substring(0, 10);
  };

  const [errors, setErrors] = useState({
    customerSelection: "",
    itemSelection: "",
  });

  const [customer, setCustomer] = useState({});
  const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
  const [isItemModalOpen, setItemModalOpen] = useState(false);

  const [invoice, setInvoice] = useState({
    CustomerId: "",
    ReferenceNumber: "",
    Items: [],
    IssueDate: getDateString(),
    DueDate: getDateString(1),
    Notes: "",
    Status: "unpaid",
  });

  const [itemList, setItemList] = useState([]);
  const navigate = useNavigate();

  function toggleCustomerModal() {
    setCustomerModalOpen(!isCustomerModalOpen);
  }
  function toggleItemModal() {
    setItemModalOpen(!isItemModalOpen);
  }

  const invoiceOnSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(invoice);
    // console.log(itemList);
    // console.log(customer);
    // console.log(event);

    if (invoice.CustomerId === "") {
      setErrors({ ...errors, customerSelection: "Please select customer" });
      return;
    }
    if (itemList.length === 0) {
      setErrors({
        ...errors,
        itemSelection: "Please select at least 1 item before proceeding",
      });
    }

    const invoicePayload = {
      customer_id: invoice.CustomerId,
      reference_number: invoice.ReferenceNumber,
      items: itemList.map((item) => {
        console.log(item);
        return { id: item.Id, quantity: parseInt(item.Quantity) };
      }),

      due_date: parseInt(invoice.DueDate),
      notes: invoice.Notes,
      status: invoice.Status,
    };

    console.log("invoicePayload");
    console.log(invoicePayload);
    axios
      .post("http://localhost:8080/v1/invoice/", invoicePayload)
      .then((response) => {
        console.log("response data " + response.data);
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
    navigate("/invoice");
  };

  const getCustomer = (customer) => {
    setCustomer(customer);
    setInvoice({ ...invoice, CustomerId: customer.Id });
    setErrors({ ...errors, customerSelection: "" });
  };

  const customerInfo = (
    <>
      {customer.Name}
      <br />
      {customer.PhoneNumber}
      <br />
      {customer.Email}
      <br />
      {customer.Address}
    </>
  );

  const inputs = [
    {
      id: 1,
      name: "IssueDate",
      type: "date",
      label: "IssueDate",
      disabled: true,
    },
    {
      id: 2,
      name: "DueDate",
      type: "date",
      label: "DueDate",
      min: getDateString(1),
      max: getDateString(30),
    },
    {
      id: 3,
      name: "ReferenceNumber",
      type: "text",
      placeholder: "#12345",
      label: "ReferenceNo",
    },
  ];

  const getItem = (item) => {
    setErrors({ ...errors, itemSelection: "" });
    item = {
      ...item,
      Quantity: 1,
      Amount: item.Price,
      rowId: itemList.length + 1,
    };
    setItemList([...itemList, item]);
    setInvoice({ ...invoice, Items: [...invoice.Items, item] });
  };

  const quantityChangeHandle = (event, row) => {
    if (event.target.value < 1) return;
    setItemList((current) =>
      current.map((item) => {
        if (item.rowId === row.rowId) {
          return {
            ...item,
            Quantity: event.target.value,
            Amount: event.target.value * item.Price,
          };
        }
        return item;
      })
    );
  };

  const itemDeleteHandler = (row) => {
    const updatedItemList = itemList.filter((item) => row.rowId !== item.rowId);
    setItemList(updatedItemList);
  };

  const itemColumn = [
    { field: "Name", header: "Name" },
    {
      field: "Quantity",
      header: "Quantity",
      isEditable: true,
      type: "number",
      onChange: quantityChangeHandle,
    },
    { field: "Price", header: "Price", prefix: "$" },
    { field: "Amount", header: "Amount", prefix: "$" },
    {
      field: "",
      header: "",
      type: "delete",
      onClick: itemDeleteHandler,
      icon: <Delete />,
    },
  ];

  const itemTotalColumn = [
    { field: "Name", header: "Name" },
    { field: "Quantity", header: "Quantity", prefix: "x" },
    { field: "Amount", header: "Amount", prefix: "$" },
  ];

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    // console.log(event);
    setInvoice({ ...invoice, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>
          New Invoice
          <div className="float-right">
            <Button
              onClick={invoiceOnSubmitHandler}
              label="Save Invoice"
              icon={<SaveIcon />}
              alignLabel="center"
            />
          </div>
        </h1>
        <div className="form-container">
          <div className="customerInfo-date-inputs">
            <div className="customer-container">
              <div className="customer-container-header">
                <div className="input-title">Bill To</div>
                <div className="add-customer">
                  <Button
                    onClick={toggleCustomerModal}
                    buttonStyle="text-type"
                    label={invoice.CustomerId === "" ? "Change" : "Bill To"}
                  />
                </div>
              </div>
              <div>{invoice.CustomerId !== "" ? customerInfo : null}</div>
              {errors.customerSelection === "" ? null : (
                <div className="errorMsg">{errors.customerSelection}</div>
              )}
              <ModalTest
                show={isCustomerModalOpen}
                onRequestClose={toggleCustomerModal}
              >
                <CustomerTable
                  toggleModal={toggleCustomerModal}
                  getRow={getCustomer}
                />
              </ModalTest>
            </div>
            <div className="dateInputs">
              {inputs.map((input, idx) => (
                <div className="dateContainer" key={idx}>
                  <FormInput
                    key={input.id}
                    {...input}
                    value={invoice[input.name]}
                    onChange={onChange}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="itemsList">
            {errors.itemSelection === "" ? null : (
              <div className="errorMsg">{errors.itemSelection}</div>
            )}
            <ShowTable data={itemList} columns={itemColumn} emptyMsg="" />
            <ModalTest show={isItemModalOpen} onRequestClose={toggleItemModal}>
              <ItemTable toggleModal={toggleItemModal} getRow={getItem} />
            </ModalTest>
            <div className="add-item">
              <Button
                onClick={toggleItemModal}
                icon={<ShoppingBasketIcon />}
                alignLabel="end"
                buttonStyle="text-type"
                label="Add Item"
              />
            </div>
          </div>

          <div className="notes-total">
            <div className="notes">
              Notes
              <textarea
                className="notes-textarea"
                placeholder="add notes here..."
                name="Notes"
                value={invoice.Notes}
                onChange={onChange}
              />
            </div>
            <Total data={itemList} columns={itemTotalColumn} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddInvoice;
