import { component$ } from '@builder.io/qwik'
import { Form, routeAction$, routeLoader$, zod$ } from '@builder.io/qwik-city'
import { createTodo } from '@/zod'

export const useTodos = routeLoader$(async ({ platform }) => {
	return {
		todos: await platform.trpc.todo.list(),
	}
})

export const useCreateTodo = routeAction$(async (params, { platform }) => {
	await platform.trpc.todo.create(params)
}, zod$(createTodo))

export default component$(() => {
	const todos = useTodos()
	const action = useCreateTodo()

	return (
		<>
			<h1 class="text-2xl font-bold">Todos</h1>

			<ul>
				{todos.value.todos.map((todo) => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>

			<Form
				action={action}
				spaReset
			>
				<fieldset
					disabled={action.isRunning}
					class="flex flex-col gap-3"
				>
					<input
						type="text"
						name="title"
						class="border"
					/>
					{action.value?.fieldErrors?.title && (
						<div>{action.value.fieldErrors.title}</div>
					)}
					<button type="submit">Create todo</button>
				</fieldset>
			</Form>
		</>
	)
})
