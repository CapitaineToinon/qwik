import { z } from 'zod'

export const user = z.object({
	id: z.number().int().min(1),
	email: z.string().email().min(1),
})

export const createUser = z.object({
	email: z.string().email(),
})

export const createTodo = z.object({
	title: z.string().min(1),
	done: z.boolean().optional(),
})
