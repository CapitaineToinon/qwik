import { t } from "../server";
import { authRouter } from "./auth";
import { todoRouter } from "./todo";
import { userRouter } from "./user";

export const appRouter = t.router({
    auth: authRouter,
    todo: todoRouter,
    user: userRouter,
});