import { render, screen } from "@testing-library/react";
import Balance from "../views/Balance";
import Buy from "../views/Buy";

const buyPageSetup = () => {
  const utils = render(<Buy />);
  const meterdata = utils.getByPlaceholderText("Meter number");
  const amountdata = utils.getByPlaceholderText(/Amount/i);
  return {
    meterdata,
    amountdata,
    ...utils,
  };
};

const balancePageSetup = () => {
  const utils = render(<Balance />);
  const meterdata = utils.getByPlaceholderText("Meter number");
  const amountdata = utils.getByPlaceholderText(/Amount/i);
  return {
    meterdata,
    amountdata,
    ...utils,
  };
};

test("It should show an error below amount input", () => {
  const { meterdata } = buyPageSetup();
  fireEvent.change(input, { target: { value: "234" } });
  expect(
    screen.getByText("Amount must be a multiple of 100 and less than 182,500")
  ).toBeInTheDocument();
});

test("It should show an error below meter number input", () => {
  const { meterdata } = buyPageSetup();
  fireEvent.change(input, { target: { value: "123" } });
  expect(
    screen.getByText("Invalid meter, only 6 digits accepted")
  ).toBeInTheDocument();
});

test("It should show an error below meter number input", () => {
  const { meterdata } = balancePageSetup();
  fireEvent.change(input, { target: { value: "123" } });
  expect(screen.getByText("Your meter is invalid")).toBeInTheDocument();
});
