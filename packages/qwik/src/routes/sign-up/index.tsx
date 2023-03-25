import { $trpc } from '@/lib/trpc'
import { component$ } from '@builder.io/qwik'
import { Form, routeAction$, zod$ } from '@builder.io/qwik-city'
import { createUser } from '@speedsouls/zod'
import { useCurrentUser } from '../layout'
import { TRPCError } from '@trpc/server'

export const useSignUp = routeAction$(
	async (params, { fail, redirect, ...req }) => {
		try {
			const user = await $trpc(req).user.create(params)
			throw redirect(
				303,
				`/sign-in?${new URLSearchParams({ email: user.email })}`
			)
		} catch (e) {
			if (e instanceof TRPCError) {
				if (e.code === 'CONFLICT') {
					return fail(400, {
						message: e.message,
					})
				}
			}

			throw e
		}
	},
	zod$(createUser)
)

export default component$(() => {
	const user = useCurrentUser()
	const action = useSignUp()

	if (user.value) {
		return (
			<>
				<h1 class="font-bold text-2xl">You are already logged in</h1>
			</>
		)
	}

	return (
		<>
			<h1 class="font-bold text-2xl">Sign Up</h1>
			{action.value?.failed && (
				<pre>{JSON.stringify(action.value, null, 2)}</pre>
			)}
			<Form action={action}>
				<fieldset class="flex flex-col gap-3">
					<input
						type="text"
						name="email"
						class="border"
					/>
					<button type="submit">Login</button>
				</fieldset>
			</Form>
		</>
	)
})
