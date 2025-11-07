import { AppError } from "../../error";

const TestAssigneeNotFound = new AppError({
  message: "Candidato do Teste não encontrado!",
  statusCode: 404,
  errorSlug: "tests/assignees/not-found",
});

const TestAssigneeAlreadyExists = new AppError({
  message: "Candidato do Teste já cadastrado no teste!",
  statusCode: 409,
  errorSlug: "tests/assignees/already-exists",
});

export { TestAssigneeNotFound, TestAssigneeAlreadyExists };
