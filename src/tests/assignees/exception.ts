import { AppError } from "../../error";

const TestAssigneeNotFound = new AppError({
  message: "Candidato do Teste não encontrado!",
  statusCode: 404,
  errorSlug: "tests/assignees/not-found",
});

export { TestAssigneeNotFound };
