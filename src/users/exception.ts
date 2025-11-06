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

export { UserNotFound, UserEmailConflict };
