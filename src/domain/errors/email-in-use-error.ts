export class EmailInUseError extends Error {
  constructor() {
    super("Este email ja está em uso");
    this.name = "EmailInUseError";
  }
}
