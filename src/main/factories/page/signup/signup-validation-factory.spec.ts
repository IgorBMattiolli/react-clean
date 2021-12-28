import { ValidationComposite } from "@/validation/validators";
import { ValidationBuilder } from "@/validation/validators/builder/validation-builder";
import { makeSignupValidation } from "./signup-validation-factory";

describe("SignupValidationFactory", () => {
  test("Should compose ValidationComposite with correct validations", () => {
    const composite = makeSignupValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field("name").minLength(5).required().build(),
        ...ValidationBuilder.field("email").required().email().build(),
        ...ValidationBuilder.field("password").required().minLength(5).build(),
        ...ValidationBuilder.field("passwordConfirmation")
          .required()
          .sameAs("password")
          .build(),
      ])
    );
  });
});
