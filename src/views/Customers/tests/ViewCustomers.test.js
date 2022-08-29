import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import ViewCustomers from "../ViewCustomers";
import "@testing-library/jest-dom/extend-expect";
import { setupServer } from "msw/node";
import {
  customerHandler,
  customers,
  saveCustomer,
  saveCustomerFail,
} from "../../../mocks/customerHandlers";
import { inputs } from "../AddCustomer";
import userEvent from "@testing-library/user-event";
import timeConverter from "../../../components/utils/timeConverter";

const server = new setupServer(...customerHandler);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("static tests", () => {
  it("should show empty customer list", () => {
    render(<ViewCustomers />);
    const headingElem = screen.queryByRole("heading");
    expect(headingElem).toHaveTextContent("Customers");
    expect(screen.getByText("No Rows to show")).toBeInTheDocument();
    const newCustomerButton = screen.getByRole("button");
    expect(newCustomerButton).toHaveTextContent(/^New Customer$/);
  });

  it("should show empty add customer form", () => {
    render(<ViewCustomers />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const titleValue = screen.getByText("Add New Customer");
    expect(titleValue).toBeInTheDocument();

    inputs.forEach((input) => {
      expect(screen.getByText(input.label)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(input.placeholder)
      ).toBeInTheDocument();
    });

    const [submitButton, closeButton] = screen.getAllByRole("button").slice(-2);
    expect(submitButton).toHaveTextContent(/^Submit$/);
    expect(closeButton).toHaveTextContent(/^Close$/);
  });
});

describe("HTTP tests", () => {
  it("should show customer table", async () => {
    render(<ViewCustomers />);
    const tableElement = await screen.findByRole("table");
    expect(tableElement).toBeInTheDocument();
    const table = screen.getByRole("table");

    const columnNames = within(table).getAllByRole("columnheader");
    const tableHeaders = [
      "NAME",
      "EMAIL",
      "PHONE NUMBER",
      "ADDRESS",
      "CREATED ON",
    ];
    tableHeaders.forEach((header, idx) =>
      expect(columnNames[idx]).toHaveTextContent(header)
    );

    const listSize = 4;
    let currentIdx = 0;
    customers.forEach((customer) => {
      if (currentIdx === listSize) {
        currentIdx = 0;
        const nextPage = screen.getAllByRole("listitem")[3];
        fireEvent.click(nextPage);
      }
      const cells = within(table)
        .getAllByRole("cell")
        .splice(currentIdx * 5, 5);
      expect(cells[0]).toHaveTextContent(customer.Name);
      expect(cells[1]).toHaveTextContent(customer.Email);
      expect(cells[2]).toHaveTextContent(customer.PhoneNumber);
      expect(cells[3]).toHaveTextContent(customer.Address);
      expect(cells[4]).toHaveTextContent(timeConverter(customer.CreatedAt));
      currentIdx++;
    });
  });

  it("post customer success", async () => {
    server.use(saveCustomer);
    render(<ViewCustomers />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    const submitButton = screen.getAllByRole("button")[1];
    const [nameInput, emailInput, addressInput] = screen
      .getAllByRole("textbox")
      .slice(-3);
    const phoneNumberInput = screen.getByRole("spinbutton");

    // const inputFields = [nameInput, emailInput, phoneNumberInput, addressInput];
    const userData = {
      name: "star",
      email: "star@gmail.com",
      phone_number: "9876543219",
      address: "Street 5 House 466",
    };

    const user = userEvent.setup();

    await user.type(nameInput, userData.name);
    expect(nameInput).toHaveValue(userData.name);
    await user.type(emailInput, userData.email);
    expect(emailInput).toHaveValue(userData.email);
    await user.type(phoneNumberInput, userData.phone_number);
    expect(phoneNumberInput).toHaveValue(parseInt(userData.phone_number));
    await user.type(addressInput, userData.address);
    expect(addressInput).toHaveValue(userData.address);

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(submitButton).not.toBeInTheDocument();
    });
  });

  it("post customer fail", async () => {
    server.use(saveCustomerFail);

    render(<ViewCustomers />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    const submitButton = screen.getAllByRole("button")[1];
    const [nameInput, emailInput, addressInput] = screen
      .getAllByRole("textbox")
      .slice(-3);
    const phoneNumberInput = screen.getByRole("spinbutton");
    // const inputFields = [nameInput, emailInput, phoneNumberInput, addressInput];
    const userData = {
      name: "star",
      email: "star@gmail.com",
      phone_number: "9876543219",
      address: "Street 5 House 466",
    };

    const user = userEvent.setup();

    await user.type(nameInput, userData.name);
    expect(nameInput).toHaveValue(userData.name);
    await user.type(emailInput, userData.email);
    expect(emailInput).toHaveValue(userData.email);
    await user.type(phoneNumberInput, userData.phone_number);
    expect(phoneNumberInput).toHaveValue(parseInt(userData.phone_number));
    await user.type(addressInput, userData.address);
    expect(addressInput).toHaveValue(userData.address);

    fireEvent.click(submitButton);
    await waitFor(() => {
      // expect(screen.getByRole("blah")).toHaveTextContent("Customers");
      // expect(screen.getByRole("blah")).toHaveTextContent("Customers");
      // screen.getByRole("blah");
      expect(screen.getByText(/^Something went wrong$/)).toBeInTheDocument();
    });
  });
});
