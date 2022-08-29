import React, { useEffect, useState } from "react";
import ModalTest from "../../components/Modal/Modal";
import "../style.css";
import AddItemForm from "./AddItems";
import Button from "../../components/Buttons/Button";
import ItemTable from "./ItemTable";
import AddIcon from "@mui/icons-material/Add";

const ViewItems = () => {
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
        Items
        <div className="float-right">
          {/* <Button onClick={toggleModal} label="New Item" /> */}
          <Button
            onClick={toggleModal}
            label="New Item"
            icon={<AddIcon />}
            alignLabel="center"
          />
        </div>
        <hr></hr>
      </h1>
      <ModalTest show={isModalOpen} onRequestClose={toggleModal}>
        <h2>Add New Item</h2>
        <AddItemForm toggleModal={toggleModal} />
      </ModalTest>
      <ItemTable shouldReRender={shouldReRender} />
    </div>
  );
};

export default ViewItems;
