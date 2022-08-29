import React from "react";
import timeConverter from "../utils/timeConverter";
import "./styles.css";
const ShowTable = ({
  data = null,
  columns = null,
  hover = true,
  toggleModal = null,
  getRow = null,
  emptyMsg = "No Rows to show",
  skipHeaders = false,
}) => {
  const getCaps = (head, field) => {
    if (head) return head.toUpperCase();
    return field.toUpperCase();
  };

  if (!data || data.length === 0) {
    return <p>{emptyMsg}</p>;
  }

  const getData = ({ row, col, i }) => {
    if (col.type === "Status") {
      return (
        <td key={i}>
          <div
            className={`status ${row[col.field]}`}
            // onClick={col.handleClick(row)}
          >
            {row[col.field].toUpperCase()}
          </div>
        </td>
      );
    }
    if (col.type === "delete") {
      return <td onClick={() => col.onClick(row)}>{col.icon}</td>;
    }
    if (
      col.hasOwnProperty("isEditable") &&
      col.hasOwnProperty("type") &&
      col.hasOwnProperty("onChange") &&
      col.isEditable
    ) {
      return (
        <td key={i}>
          <input
            type={col.type}
            value={row[col.field]}
            onChange={(event) => col.onChange(event, row)}
          />
        </td>
      );
    }
    if (col.hasOwnProperty("isUnixTime") && col.isUnixTime) {
      return <td key={i}>{timeConverter(row[col.field])}</td>;
    }
    if (col.hasOwnProperty("prefix")) {
      return (
        <td key={i}>
          {col.prefix}
          {row[col.field]}
        </td>
      );
    }
    return <td key={i}>{row[col.field]}</td>;
  };

  const rowClicked = (row) => {
    getRow(row);
    if (toggleModal) toggleModal();
  };

  return (
    <table>
      {skipHeaders ? null : (
        <thead>
          <tr>
            {columns.map(({ header, field }, i) => (
              <th key={i}>{getCaps(header, field)}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {data.map((row, idx) => (
          <tr
            className={`${hover && "hover"}`}
            key={idx}
            onClick={() => (getRow ? rowClicked(row) : null)}
          >
            {columns.map((col, i) =>
              // <td key={i}>{getData({ row, col })}</td>
              getData({ row, col, i })
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShowTable;
