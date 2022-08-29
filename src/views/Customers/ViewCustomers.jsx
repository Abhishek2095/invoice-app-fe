import React, { useEffect, useState } from "react";
import AddCustomerForm from "./AddCustomer";
import ModalTest from "../../components/Modal/Modal";
import "../style.css";
import Button from "../../components/Buttons/Button";
import CustomerTable from "./CustomerTable";
import AddIcon from "@mui/icons-material/Add";

const ViewCustomers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldReRender, setShouldReRender] = useState(false);

  useEffect(() => {
    setShouldReRender((prev) => !prev);
  }, [isModalOpen]);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="container">
      <h1>
        Customers
        <div className="float-right">
          {/* <Button onClick={toggleModal} label="New Customer" /> */}
          <Button
            onClick={toggleModal}
            label="New Customer"
            icon={<AddIcon />}
            alignLabel="center"
          />
        </div>
      </h1>

      <ModalTest show={isModalOpen} onRequestClose={toggleModal}>
        <h2>Add New Customer</h2>
        <AddCustomerForm toggleModal={toggleModal} />
      </ModalTest>
      <CustomerTable shouldReRender={shouldReRender} />
    </div>
  );
};

export default ViewCustomers;
