import { ValidationComposite } from "@/validation/validators";
import { ValidationBuilder } from "@/validation/validators/builder/validation-builder";
import { Validation } from "@/presentation/protocols/validation";

export const makeSignupValidation = (): Validation => {
  return ValidationComposite.build([
    ...ValidationBuilder.field("name").minLength(5).required().build(),
    ...ValidationBuilder.field("email").required().email().build(),
    ...ValidationBuilder.field("password").required().minLength(5).build(),
    ...ValidationBuilder.field("passwordConfirmation")
      .required()
      .sameAs("password")
      .build(),
  ]);
};
