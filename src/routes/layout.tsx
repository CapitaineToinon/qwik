import { component$, Slot } from '@builder.io/qwik'
import { Navbar } from '@/components/Navbar'
import { type RequestHandler, routeLoader$ } from '@builder.io/qwik-city'
import { user } from '@/zod'
import { appRouter } from '@/trpc'
import { prisma } from '@/lib/prisma'

export const onRequest: RequestHandler = ({ cookie, platform }) => {
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

	platform.user = getUser()
	platform.trpc = appRouter.createCaller({
		user: platform.user,
		db: prisma,
	})
}

export const useCurrentUser = routeLoader$(({ platform }) => {
	return platform.user
})

export default component$(() => {
	const user = useCurrentUser()

	return (
		<div class="container mx-auto max-w-md flex flex-col gap-3">
			<Navbar user={user.value} />
			<main>
				<Slot />
			</main>
		</div>
	)
})
