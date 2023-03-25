import { t } from '../server'
import { createUser } from '@speedsouls/zod'

export const authRouter = t.router({
	login: t.procedure.input(createUser).query(async ({ ctx, input }) => {
		return await ctx.db.user.findUnique({
			where: input,
		})
	}),
})
