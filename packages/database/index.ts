import { PrismaClient, User, Todo, Prisma } from "@prisma/client";

const client = new PrismaClient();

export {
    client,
    Prisma,
    type User,
    type Todo,
}

