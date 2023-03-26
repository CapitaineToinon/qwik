import { t } from '@/trpc/server'
import { createUser } from '@/zod'

export const authRouter = t.router({
	login: t.procedure.input(createUser).query(async ({ ctx, input }) => {
		return await ctx.db.user.findUnique({
			where: input,
		})
	}),
})
