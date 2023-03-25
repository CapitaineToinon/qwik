import { $trpc } from '@/lib/trpc'
import { component$ } from '@builder.io/qwik'
import { Form, routeAction$, routeLoader$, zod$ } from '@builder.io/qwik-city'
import { createUser } from '@speedsouls/zod'
import { useCurrentUser } from '../layout'

export const useEmail = routeLoader$(async (req) => {
	return req.query.get('email') ?? ''
})

export const useSignIn = routeAction$(
	async (params, { fail, redirect, ...req }) => {
		const user = await $trpc(req).auth.login(params)

		if (!user) {
			return fail(400, {
				message: 'Invalid credentials',
			})
		}

		const token = JSON.stringify(user)

		req.cookie.set('token', token, {
			httpOnly: true,
			path: '/',
			sameSite: 'lax',
			secure: false,
		})

		throw redirect(303, '/todos')
	},
	zod$(createUser)
)

export default component$(() => {
	const email = useEmail()
	const user = useCurrentUser()
	const action = useSignIn()

	if (user.value) {
		return (
			<>
				<h1 class="font-bold text-2xl">You are already logged in</h1>
			</>
		)
	}

	return (
		<>
			<h1 class="font-bold text-2xl">Login</h1>
			<Form action={action}>
				<fieldset class="flex flex-col gap-3">
					<input
						type="text"
						name="email"
						class="border"
						value={email.value}
					/>
					<button type="submit">Login</button>
				</fieldset>
			</Form>
		</>
	)
})
