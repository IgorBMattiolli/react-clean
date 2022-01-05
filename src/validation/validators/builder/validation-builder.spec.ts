import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  CompareFieldsValidation,
} from "@/validation/validators";
import { ValidationBuilder as sut } from "./validation-builder";
import faker from "faker";
describe("ValidationBuilder", () => {
  test("Should return RequireFieldValidation", () => {
    const field = faker.database.column();
    const validations = sut.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test("Should return EmailValidation", () => {
    const field = faker.database.column();
    const validations = sut.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test("Should return MinLengthValidation", () => {
    const field = faker.database.column();
    const minLength = 5;
    const validations = sut.field(field).minLength(minLength).build();
    expect(validations).toEqual([new MinLengthValidation(field, minLength)]);
  });

  test("Should return CompareFieldsValidation", () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const validations = sut.field(field).sameAs(fieldToCompare).build();
    expect(validations).toEqual([
      new CompareFieldsValidation(field, fieldToCompare),
    ]);
  });

  test("Should return a list of validations", () => {
    const field = faker.database.column();
    const minLength = 6;
    const validations = sut
      .field(field)
      .required()
      .minLength(minLength)
      .email()
      .build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, minLength),
      new EmailValidation(field),
    ]);
  });
});
