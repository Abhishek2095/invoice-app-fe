import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import ModalTest from "../../components/Modal/Modal";
import Total from "./Total";

const ViewInvoice = ({ invoice, setUpdatedStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoice, setInvoice] = useState({});
  const [customer, setCustomer] = useState({});

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  const itemColumn = [
    { field: "Name", header: "Name" },
    { field: "Quantity", header: "Quantity", prefix: "x" },
    { field: "Price", header: "Price", prefix: "$" },
    { field: "Amount", header: "Amount", prefix: "$" },
  ];

  const updateStatus = async () => {
    const invoiceId = invoice.Id;
    const updatedStatus = invoice.Status === "paid" ? "unpaid" : "paid";
    try {
      const updateInvoiceRequest = await axios.patch(
        `http://localhost:8080/v1/invoice/?invoice_id=${invoiceId}&status=${updatedStatus}`
      );
      setUpdatedStatus(updateInvoiceRequest.data.Status);
    } catch {
      console.log("bad request error - update invoice status");
    } finally {
      toggleModal();
    }
  };

  const showInvoice = async (row) => {
    setInvoice({});
    setCustomer({});
    const invoiceId = row.Id;
    let tempInvoice = null;
    try {
      const invoiceRequest = await axios.get(
        `http://localhost:8080/v1/invoice/${invoiceId}`
      );
      const itemsRequest = await axios.get(
        `http://localhost:8080/v1/item/items`
      );
      const itemList = itemsRequest.data?.items;
      tempInvoice = invoiceRequest.data;
      tempInvoice.InvoiceItems = tempInvoice?.InvoiceItems.map(
        (invoiceItem) => {
          const item = itemList.find((item) => item.Id === invoiceItem.ItemId);
          return {
            ...invoiceItem,
            Amount:
              parseInt(invoiceItem.Quantity) * parseInt(invoiceItem.Price),
            Name: item.Name,
          };
        }
      );
      setInvoice(tempInvoice);
    } catch (error) {
      console.log("bad request error - invoice");
      console.log(error);
    }
    const customerId = tempInvoice.CustomerId;
    try {
      const customerRequest = await axios.get(
        `http://localhost:8080/v1/customer/${customerId}`
      );
      setCustomer(customerRequest.data);
    } catch {
      console.log("bad request error - customer");
    } finally {
      toggleModal();
    }
  };

  return (
    <ModalTest show={isModalOpen} onRequestClose={toggleModal}>
      <h2>Invoice Details</h2>
      <hr />
      <div className="customer-container">
        {customer.Name}
        <br />
        {customer.PhoneNumber}
        <br />
        {customer.Email}
        <br />
        {customer.Address}
      </div>
      <Total data={invoice.InvoiceItems} columns={itemColumn} />
      <Button onClick={updateStatus} label="Update Status" />
    </ModalTest>
  );
};

export default ViewInvoice;
