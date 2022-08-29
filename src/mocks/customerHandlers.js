// src/mocks/handlers.js
import { rest } from "msw";

export const customers = [
  {
    Id: "36f0e051-ec1f-45e0-a655-00d7c7281749",
    Name: "testCustomer",
    Email: "abns@gmail.com",
    PhoneNumber: "1232343456",
    Address: "sd sff",
    CreatedAt: 1660631732,
    UpdatedAt: 1660631732,
  },
  {
    Id: "5e6d9a08-9c7c-48b9-9f8e-aa468975fbb4",
    Name: "testCustomer",
    Email: "abns@gmail.com",
    PhoneNumber: "1232343456",
    Address: "sd sff",
    CreatedAt: 1660631731,
    UpdatedAt: 1660631731,
  },
  {
    Id: "5ef2a1c3-1f31-4528-bee6-6dc3955888a4",
    Name: "testCustomer1",
    Email: "testcustomer@one.com",
    PhoneNumber: "9876543210",
    Address: "Street 5 House 456",
    CreatedAt: 1659032989,
    UpdatedAt: 1659032989,
  },
  {
    Id: "810fbb1b-3ef6-48ec-9ebc-803d75919e17",
    Name: "testCustomer2",
    Email: "somecustomer@one.com",
    PhoneNumber: "9876543219",
    Address: "Street 5 House 466",
    CreatedAt: 1659033087,
    UpdatedAt: 1659033087,
  },
  {
    Id: "88f91f0f-fa06-4243-b6ea-7b4a71da0037",
    Name: "someName",
    Email: "some@yahoo.com",
    PhoneNumber: "2342342345",
    Address: "jsf sfbjsf fkbjs",
    CreatedAt: 1660652054,
    UpdatedAt: 1660652054,
  },
  {
    Id: "8954458d-574f-4c6a-8884-b8ef1edbd0ed",
    Name: "customer",
    Email: "custoemr@gmail.com",
    PhoneNumber: "7899877898",
    Address: "shdjfg sjhfbsf b",
    CreatedAt: 1660631909,
    UpdatedAt: 1660631909,
  },
  {
    Id: "9c09dae1-7cb4-49c4-bcd3-d6f8b02037b2",
    Name: "abhishek",
    Email: "abhi@gmail.com",
    PhoneNumber: "8767656543",
    Address: "sdh sajd akjdb",
    CreatedAt: 1660735761,
    UpdatedAt: 1660735761,
  },
  {
    Id: "be18a2f5-6828-440b-9b14-bdb1ad82cfa6",
    Name: "testCustomer",
    Email: "abns@gmail.com",
    PhoneNumber: "1232343456",
    Address: "sd sff",
    CreatedAt: 1660631729,
    UpdatedAt: 1660631729,
  },
];

export const fetchCustomers = rest.get(
  "http://localhost:8080/v1/customer/customers",
  async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(customers));
  }
);

// export const fetchCustomers = rest.get(
//   "http://localhost:8080/v1/customer/customers",
//   async (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json([
//         {
//           Id: "36f0e051-ec1f-45e0-a655-00d7c7281749",
//           Name: "testCustomer",
//           Email: "abns@gmail.com",
//           PhoneNumber: "1232343456",
//           Address: "sd sff",
//           CreatedAt: 1660631732,
//           UpdatedAt: 1660631732,
//         },
//         {
//           Id: "9c09dae1-7cb4-49c4-bcd3-d6f8b02037b2",
//           Name: "abhishek",
//           Email: "abhi@gmail.com",
//           PhoneNumber: "8767656543",
//           Address: "sdh sajd akjdb",
//           CreatedAt: 1660735761,
//           UpdatedAt: 1660735761,
//         },
//       ])
//     );
//   }
// );

export const saveCustomer = rest.post(
  "http://localhost:8080/v1/customer/add",
  async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "star",
        email: "star@gmail.com",
        phone_number: "9876543219",
        address: "Street 5 House 466",
        CreatedAt: 1659033087,
        UpdatedAt: 1659033087,
      })
    );
  }
);

export const saveCustomerFail = rest.post(
  "http://localhost:8080/v1/customer/add",
  async (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({
        error: "something went wrong",
      })
    );
  }
);

export const customerHandler = [fetchCustomers, saveCustomer, saveCustomerFail];
