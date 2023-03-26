import { initTRPC } from '@trpc/server'
import type { PrismaClient, User } from '@prisma/client'

type Context = {
	db: PrismaClient
	user: User | null
}

export const t = initTRPC.context<Context>().create()
