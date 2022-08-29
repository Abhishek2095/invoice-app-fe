import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import ShowTable from "../../components/Table/Table";
import ModalTest from "../../components/Modal/Modal";
import "../style.css";
import axios from "axios";
import Button from "../../components/Buttons/Button";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import "../../components/Form/formInput.css";
import "./AddInvoice.css";
import AddIcon from "@mui/icons-material/Add";

const ViewInvoices = () => {
  const [filteredInvoiceList, setFilteredInvoiceList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoice, setInvoice] = useState({});
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/v1/invoice/").then((response) => {
      setFilteredInvoiceList(response.data);
      console.log(response.data);
    });
  }, []);

  const navigate = useNavigate();

  let PageSize = 4;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (filteredInvoiceList)
      return filteredInvoiceList.slice(firstPageIndex, lastPageIndex);
    else return [];
  }, [currentPage, PageSize, filteredInvoiceList]);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  const handleChange = (event) => {
    // const val = event.target.value;
    // axios
    //   .get(`http://localhost:8080/v1/invoice/?field=name&value=${val}`)
    //   .then((response) => {
    //     setFilteredInvoiceList(response.data || []);
    //   });
  };

  const showInvoice = async (row) => {
    setInvoice({});
    setCustomer({});
    const invoiceId = row.Id;
    try {
      const invoiceRequest = await axios.get(
        `http://localhost:8080/v1/invoice/${invoiceId}`
      );
      const itemsRequest = await axios.get(
        `http://localhost:8080/v1/item/items`
      );
      const itemList = itemsRequest.data?.items;
      let tempInvoice = invoiceRequest.data;
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
    const customerId = invoice?.CustomerId;
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
      setFilteredInvoiceList(
        filteredInvoiceList.map((currInvoice) => {
          if (invoice.Id === currInvoice.Id) {
            return {
              ...currInvoice,
              Status: updateInvoiceRequest.data.Status,
            };
          }
          return currInvoice;
        })
      );
    } catch {
      console.log("bad request error - update invoice status");
    } finally {
      toggleModal();
    }
  };

  const columns = [
    { field: "CreatedAt", header: "Date", isUnixTime: true },
    { field: "ReferenceNumber", header: "Number" },
    {
      field: "Status",
      header: "Status",
      type: "Status",
    },
    { field: "Amount", header: "Amount" },
  ];

  return (
    <div className="container">
      <h1>
        Invoices
        <div className="float-right">
          <Button
            onClick={() => {
              navigate("/add-invoice");
            }}
            label="New Invoice"
            icon={<AddIcon />}
            alignLabel="center"
          />
        </div>
        <hr></hr>
      </h1>
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
        <ShowTable data={invoice.InvoiceItems} columns={itemColumn} />
        <Button onClick={updateStatus} label="Update Status" />
      </ModalTest>
      {/* <input type="text" placeholder="Type to search" onChange={handleChange} /> */}
      <ShowTable
        data={currentTableData}
        columns={columns}
        getRow={showInvoice}
      />
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={filteredInvoiceList.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ViewInvoices;
