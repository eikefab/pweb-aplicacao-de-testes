import { AppError } from "../error";

const TestNotFound = new AppError({
  message: "Teste não encontrado!",
  statusCode: 404,
  errorSlug: "tests/not-found",
});

export { TestNotFound };
