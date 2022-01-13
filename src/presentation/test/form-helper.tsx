import { fireEvent, screen } from "@testing-library/react";
import faker from "faker";

export const testButtonIsDisabled = (
  fieldName: string,
  isDisabled: boolean
): void => {
  const submitButton = screen.getByTestId(fieldName) as HTMLButtonElement;
  expect(submitButton.disabled).toBe(isDisabled);
};

export const testStatusForField = (
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || "Tudo certo!");
  expect(fieldStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};

export const populateField = (
  fieldName: string,
  value = faker.random.words()
): void => {
  const fieldInput = screen.getByTestId(fieldName);
  fireEvent.input(fieldInput, {
    target: { value },
  });
};
