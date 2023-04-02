import { t } from '@/trpc/server'
import { auth } from '@/trpc/middlewares'
import { createTodo, toggleTodo } from '@/zod'
import { TRPCError } from '@trpc/server'

export const todoRouter = t.router({
	list: t.procedure.use(auth).query(async ({ ctx }) => {
		return await ctx.db.todo.findMany({
			where: {
				userId: ctx.user.id,
			},
		})
	}),
	toggle: t.procedure
		.use(auth)
		.input(toggleTodo)
		.mutation(async ({ ctx, input }) => {
			const todo = await ctx.db.todo.findUnique({
				where: input,
			})

			if (!todo) {
				throw new TRPCError({
					code: 'NOT_FOUND',
				})
			}

			if (todo.userId !== ctx.user.id) {
				throw new TRPCError({
					code: 'FORBIDDEN',
				})
			}

			return await ctx.db.todo.update({
				where: {
					id: todo.id,
				},
				data: {
					done: !todo.done,
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
