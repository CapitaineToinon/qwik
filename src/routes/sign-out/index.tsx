import { component$ } from '@builder.io/qwik'
import { Form, globalAction$ } from '@builder.io/qwik-city'

export const useSignOut = globalAction$((_, { cookie, redirect }) => {
	cookie.delete('token', {
		path: '/',
	})

	throw redirect(303, '/sign-in')
})

export default component$(() => {
	const action = useSignOut()

	return (
		<Form action={action}>
			<button type="submit">Logout</button>
		</Form>
	)
})
