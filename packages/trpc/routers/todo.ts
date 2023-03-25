import { t } from '../server'
import { auth } from '../middlewares'
import { createTodo } from '@speedsouls/zod'

export const todoRouter = t.router({
	list: t.procedure.use(auth).query(async ({ ctx }) => {
		return await ctx.db.todo.findMany({
			where: {
				userId: ctx.user.id,
			},
		})
	}),
	create: t.procedure
		.use(auth)
		.input(createTodo)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.todo.create({
				data: {
					title: input.title,
					done: input.done ?? false,
					userId: ctx.user.id,
				},
			})
		}),
})
