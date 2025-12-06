import { AppError } from "../../../error";

const TestQuestionAnswerNotFound = new AppError({
  message: "Resposta não encontrada!",
  statusCode: 404,
  errorSlug: "tests/questions/answers/not-found",
});

export { TestQuestionAnswerNotFound };
