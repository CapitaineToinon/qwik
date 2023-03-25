import { Cookie, z } from '@builder.io/qwik-city'
import { user } from '@speedsouls/zod'
import { client } from '@speedsouls/database'
import { appRouter } from '@speedsouls/trpc'

type Context = {
	trpc: ReturnType<typeof appRouter.createCaller>
	user: z.infer<typeof user> | null
}

export function $ctx({
	cookie,
	sharedMap,
}: {
	cookie: Cookie
	sharedMap: Map<string, any>
}): Context {
	if (sharedMap.has('ctx')) {
		return sharedMap.get('ctx') as Context
	}

	const getUser = () => {
		const token = cookie.get('token')

		if (!token) {
			return null
		}

		const result = user.safeParse(token.json())

		if (!result.success) {
			cookie.delete('token', { path: '/' })
			return null
		}

		return result.data
	}

	const currentUser = getUser()

	const trpc = appRouter.createCaller({
		user: currentUser,
		db: client,
	})

	const ctx = {
		user: currentUser,
		trpc,
	}

	sharedMap.set('ctx', ctx)

	return ctx
}
