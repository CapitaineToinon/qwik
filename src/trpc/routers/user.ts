import { t } from '@/trpc/server'
import { createUser } from '@/zod'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'

export const userRouter = t.router({
	create: t.procedure.input(createUser).mutation(async ({ ctx, input }) => {
		try {
			return await ctx.db.user.create({
				data: input,
			})
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					throw new TRPCError({
						code: 'CONFLICT',
					})
				}
			}

			throw e
		}
	}),
})
