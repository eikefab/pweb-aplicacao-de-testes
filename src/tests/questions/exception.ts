import { AppError } from "../../error";

const TestQuestionNotFound = new AppError({
  message: "Pergunta de teste não encontrada!",
  statusCode: 404,
  errorSlug: "tests/questions/not-found",
});

export { TestQuestionNotFound };
