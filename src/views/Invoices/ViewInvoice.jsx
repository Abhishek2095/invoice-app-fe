// // import { Button } from "@mui/material";
// // import React from "react";
// // import ModalTest from "../../components/Modal/Modal";
// // import Total from "./Total";

// const ViewInvoice = ({ invoice }) => {
//   const itemColumn = [
//     { field: "Name", header: "Name" },
//     { field: "Quantity", header: "Quantity", prefix: "x" },
//     { field: "Price", header: "Price", prefix: "$" },
//     { field: "Amount", header: "Amount", prefix: "$" },
//   ];

//   return (
//     <ModalTest show={isModalOpen} onRequestClose={toggleModal}>
//       <h2>Invoice Details</h2>
//       <hr />
//       <div className="customer-container">
//         {customer.Name}
//         <br />
//         {customer.PhoneNumber}
//         <br />
//         {customer.Email}
//         <br />
//         {customer.Address}
//       </div>
//       <Total data={invoice.InvoiceItems} columns={itemColumn} />
//       <Button onClick={updateStatus} label="Update Status" />
//     </ModalTest>
//   );
// };

// // export default ViewInvoice;
