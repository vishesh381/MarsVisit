import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

describe("Form Validation", () => {
  test("Step 1 - Personal Info Validation", () => {
    const { getByText, getByLabelText } = render(<App />);

    fireEvent.click(getByText("Next")); 

    expect(screen.getByText("Full Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Date of Birth is required.")).toBeInTheDocument();
    expect(screen.getByText("Valid Email is required.")).toBeInTheDocument();
    expect(screen.getByText("Valid Phone number is required.")).toBeInTheDocument();
  });

  test("Step 2 - Travel Preferences Validation", () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText("Next")); 
    fireEvent.click(getByText("Next")); 

    expect(screen.getByText("Departure Date is required.")).toBeInTheDocument();
    expect(screen.getByText("Return Date is required.")).toBeInTheDocument();
    expect(screen.getByText("Accommodation selection is required.")).toBeInTheDocument();
  });

  test("Step 3 - Health & Safety Validation", () => {
    const { getByText, getByLabelText } = render(<App />);

    fireEvent.click(getByText("Next")); 
    fireEvent.click(getByText("Next")); 
    fireEvent.click(getByText("Next")); 

    expect(screen.getByText(/Health Declaration is required./i)).toBeInTheDocument();w
  });

  test("Valid Form Submission", () => {
    const { getByText, getByLabelText } = render(<App />);

    // Step 1 - Fill in valid details
    fireEvent.change(getByLabelText("Full Name"), { target: { value: "John Doe" } });
    fireEvent.change(getByLabelText("Date of Birth"), { target: { value: "1990-01-01" } });
    fireEvent.change(getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(getByLabelText("Phone"), { target: { value: "1234567890" } });
    fireEvent.click(getByText("Next"));

    // Step 2 - Fill in valid details
    fireEvent.change(getByLabelText("Departure Date"), { target: { value: "2025-05-01" } });
    fireEvent.change(getByLabelText("Return Date"), { target: { value: "2025-06-01" } });
    fireEvent.change(getByLabelText("Accommodation"), { target: { value: "Hotel" } });
    fireEvent.click(getByText("Next"));

    // Step 3 - Fill in valid details
    fireEvent.change(getByLabelText("Health Declaration"), { target: { value: "No" } });
    fireEvent.click(getByText("Next"));

    // Step 4 - Submit
    fireEvent.click(getByText("Submit"));

    expect(screen.getByText("Form Submitted Successfully!")).toBeInTheDocument();
  });
});
