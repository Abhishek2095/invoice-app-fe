import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import ShowTable from "../../components/Table/Table";

const columns = [
  { field: "Name", header: "Name" },
  { field: "Description", header: "Description" },
  { field: "Stock", header: "Stock" },
  { field: "Price", header: "Price" },
  { field: "CreatedAt", header: "Created On", isUnixTime: true },
];

const ItemTable = ({ toggleModal, getRow, shouldReRender = false }) => {
  const [filteredItemList, setFilteredItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:8080/v1/item/items").then((response) => {
      setFilteredItemList(response.data.items);
    });
    console.log("fetched");
  }, [shouldReRender]);

  let PageSize = 4;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (filteredItemList)
      return filteredItemList.slice(firstPageIndex, lastPageIndex);
    else return [];
  }, [currentPage, PageSize, filteredItemList]);

  const handleChange = (event) => {
    const val = event.target.value;
    axios
      .get(`http://localhost:8080/v1/item/?field=name&value=${val}`)
      .then((response) => {
        setFilteredItemList(response.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <input type="text" placeholder="Type to search" onChange={handleChange} />
      <ShowTable
        data={currentTableData}
        columns={columns}
        toggleModal={toggleModal}
        getRow={getRow}
      />
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={filteredItemList.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default ItemTable;
