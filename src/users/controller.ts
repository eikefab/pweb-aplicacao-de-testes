import type { Request, Response } from "express";
import { loginSchema, registerSchema, updateSchema } from "./validator";
import { delUser, fetchUsers, login, registerUser, updateUser } from "./service";
import { getToken } from "./auth/token";

export async function register(request: Request, response: Response) {
    const data = registerSchema.parse(request.body);

    const [user] = await registerUser(data);

    if (!user) {
        throw new Error("server/user-not-created");
    }

    const token = getToken({ id: user.id, email: user.email });

    return response
        .status(200)
        .json({ 
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }, 
            token 
        });
}

export async function authenticate(request: Request, response: Response) {
    const data = loginSchema.parse(request.body);

    const user = await login(data);

    if (!user) {
        throw new Error("server/user-not-found");
    }

    const token = getToken({ id: user.id, email: user.email });

    return response
        .status(200)
        .json({ 
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }, 
            token 
    });
}

export async function updateUserByToken(request: Request, response: Response) {
    const user = request.user;
    const data = updateSchema.parse(request.body);

    await updateUser(data, user.id);

    return response.status(204).send();
}

export async function getUsers(_request: Request, response: Response) {
    const users = await fetchUsers();

    return response.status(200).json({ 
        users: users.map((user) => {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
            };
        }) 
    });
}

export async function deleteUser(request: Request, response: Response) {
    const { id } = request.params;
    const numericalId = Number(id);

    // TODO: validar corretamente o número

    await delUser(numericalId);

    return response.status(204).send();
}
