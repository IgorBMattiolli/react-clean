import { InvalidFieldError } from "@/validation/errors/invalid-field-error";
import faker from "faker";
import { CompareFieldsValidation } from "./compare-fields-validation";

const makeSut = (
  field: string,
  fieldToCompare: string
): CompareFieldsValidation =>
  new CompareFieldsValidation(field, fieldToCompare);

describe("CompareFieldValidation", () => {
  test("Should return error if compare is insvalid", () => {
    const field = faker.random.word();
    const fieldToCompare = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word(),
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test("Should return falsy if value is valid", () => {
    const value = faker.random.word();
    const field = faker.random.word();
    const fieldToCompare = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });
    expect(error).toBeFalsy();
  });
});
