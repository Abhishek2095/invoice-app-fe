import React, { useEffect } from "react";
import { useState } from "react";
import ShowTable from "../../components/Table/Table";

const Total = ({ data, columns, emptyMsg = "" }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(() => {
      if (!data || data.length === 0) return 0;
      return data.reduce((prev, curr) => prev + curr.Amount, 0);
    });
  }, [data]);

  return (
    <div className="total">
      <ShowTable data={data} columns={columns} emptyMsg={emptyMsg} />
      <div className="totalAmount">
        <div className="label float-left">Total</div>
        <div className="amount float-right">${total}</div>
      </div>
    </div>
  );
};

export default Total;
