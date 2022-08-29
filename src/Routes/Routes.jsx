import { Routes, Route } from "react-router-dom";
import React from "react";
import ViewInvoices from "../views/Invoices/ViewInvoices";
import AddInvoice from "../views/Invoices/AddInvoice";
const ViewCustomers = React.lazy(() =>
  import("../views/Customers/ViewCustomers")
);
const ViewItems = React.lazy(() => import("../views/Items/ViewItems"));

const RouteList = [
  {
    path: "/",
    Component: <ViewCustomers />,
    fallback: <>LOADING CUSTOMERS...</>,
  },
  {
    path: "/customers",
    Component: <ViewCustomers />,
    fallback: <>LOADING CUSTOMERS...</>,
  },
  {
    path: "/items",
    Component: <ViewItems />,
    fallback: <>LOADING ITEMS...</>,
  },
  {
    path: "/invoices",
    Component: <ViewInvoices />,
    fallback: <>LOADING INVOICES...</>,
  },
  {
    path: "/add-invoice",
    Component: <AddInvoice />,
    fallback: <>LOADING INVOICES...</>,
  },
];

const InvoiceAppRoutes = () => {
  return (
    <Routes>
      {RouteList.map(({ path, Component, fallback }, i) => (
        <Route
          key={i}
          exact
          path={path}
          element={
            <React.Suspense fallback={fallback}>{Component}</React.Suspense>
          }
        />
      ))}
    </Routes>
  );
};
export default InvoiceAppRoutes;
