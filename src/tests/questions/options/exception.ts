import { AppError } from "../../../error";

const TestQuestionOptionNotFound = new AppError({
  message: "Opção de resposta não encontrada!",
  statusCode: 404,
  errorSlug: "tests/questions/options/not-found",
});

export { TestQuestionOptionNotFound };
