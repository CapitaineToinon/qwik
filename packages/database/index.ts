import { PrismaClient, type User, type Todo, Prisma } from '@prisma/client'

const client = new PrismaClient()
export { client, Prisma, type User, type Todo }
