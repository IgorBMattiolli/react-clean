export class UnexpedctedError extends Error {
  constructor() {
    super("ALgo de errado aconteceu. Tente novamente em breve.");
    this.name = "UnexpedctedError";
  }
}
