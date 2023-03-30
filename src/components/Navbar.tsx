import { useSignOut } from '@/routes/sign-out'
import { component$ } from '@builder.io/qwik'
import { Form, Link } from '@builder.io/qwik-city'
import type { User } from '@prisma/client'

export const Navbar = component$<{ user: User | null }>((props) => {
	const action = useSignOut()

	return (
		<nav class="border-b">
			<ul class="flex gap-3 py-3">
				<li>
					<Link href="/">Home</Link>
				</li>
				{!!props.user && (
					<>
						<li>
							<Link href="/todos">Todos</Link>
						</li>
						<li>
							<Form
								action={action}
								spaReset
							>
								<button type="submit">Sign out</button>
							</Form>
						</li>
					</>
				)}
				{!props.user && (
					<>
						<li>
							<Link href="/sign-up">Sign up</Link>
						</li>
						<li>
							<Link href="/sign-in">Sign in</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	)
})
