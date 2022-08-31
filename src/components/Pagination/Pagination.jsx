import React from "react";
import { DOTS, getPaginationRange } from "./getPaginationRange";
import "./pagination.css";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = getPaginationRange({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="pagination-container" key={currentPage}>
      <li
        className={`pagination-item${currentPage === 1 ? " disabled" : ""}`}
        onClick={onPrevious}
        key={`prev-page${currentPage === 1 ? " disabled" : " enabled"}`}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li className="pagination-item dots" key={index}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={`pagination-item${
              currentPage === pageNumber ? " selected" : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
            key={`${pageNumber}${
              currentPage === pageNumber ? " selected" : " not selected"
            }`}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`pagination-item${
          currentPage === lastPage ? " disabled" : ""
        }`}
        onClick={onNext}
        key={`right arrow${
          currentPage === lastPage ? " disabled" : " enabled"
        }`}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
