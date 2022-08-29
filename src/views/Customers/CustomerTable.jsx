import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import ShowTable from "../../components/Table/Table";

const columns = [
  { field: "Name", header: "Name" },
  { field: "Email", header: "Email" },
  { field: "PhoneNumber", header: "Phone Number" },
  { field: "Address", header: "Address" },
  { field: "CreatedAt", header: "Created On", isUnixTime: true },
];

const CustomerTable = ({ toggleModal, getRow, shouldReRender = false }) => {
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:8080/v1/customer/customers")
      .then((response) => {
        setFilteredCustomerList(response.data);
      });
  }, [shouldReRender]);

  let PageSize = 4;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (filteredCustomerList)
      return filteredCustomerList.slice(firstPageIndex, lastPageIndex);
    else return [];
  }, [currentPage, PageSize, filteredCustomerList]);

  const handleChange = (event) => {
    const val = event.target.value;
    axios
      .get(`http://localhost:8080/v1/customer/?field=name&value=${val}`)
      .then((response) => {
        setFilteredCustomerList(response.data.customers || []);
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
        totalCount={filteredCustomerList.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default CustomerTable;
