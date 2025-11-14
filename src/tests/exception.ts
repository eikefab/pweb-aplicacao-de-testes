import { AppError } from "../error";

const TestNotFound = new AppError({
  message: "Teste não encontrado!",
  statusCode: 404,
  errorSlug: "tests/not-found",
});

const TestInvalidDateRange = new AppError({
  message: "O intervalo de datas é inválido!",
  statusCode: 400,
  errorSlug: "tests/invalid-date-range",
});

export { TestNotFound, TestInvalidDateRange };
