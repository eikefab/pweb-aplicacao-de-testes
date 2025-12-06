import { AppError } from "../error";

const UserNotFound = new AppError({
  message: "Usuário não encontrado!",
  statusCode: 404,
  errorSlug: "users/not-found",
});

const UserEmailConflict = new AppError({
  message: "E-mail já utilizado.",
  statusCode: 409,
  errorSlug: "users/email-conflict",
});

const UserHasCreatedContent = new AppError({
  message: "Não é possível excluir usuário que criou testes ou questões.",
  statusCode: 409,
  errorSlug: "users/has-created-content",
});

export { UserNotFound, UserEmailConflict, UserHasCreatedContent };
