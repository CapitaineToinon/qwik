import { component$, useComputed$ } from '@builder.io/qwik'
import { Form, routeAction$, routeLoader$, zod$ } from '@builder.io/qwik-city'
import { createTodo, toggleTodo } from '@/zod'

export const useTodos = routeLoader$(async ({ platform }) => {
	return await platform.trpc.todo.list()
})

export const useToggleTodo = routeAction$(async (params, { platform }) => {
	await platform.trpc.todo.toggle(params)
}, zod$(toggleTodo))

export const useCreateTodo = routeAction$(async (params, { platform }) => {
	await platform.trpc.todo.create(params)
}, zod$(createTodo))

export default component$(() => {
	const todos = useTodos()
	const createTodoAction = useCreateTodo()
	const toggleTodoAction = useToggleTodo()

	const done = useComputed$(
		() => todos.value.filter((todo) => todo.done).length
	)

	return (
		<>
			<h1 class="text-2xl font-bold">
				Todos ({done.value}/{todos.value.length})
			</h1>

			<ul>
				{todos.value.map((todo) => (
					<li key={todo.id}>
						<Form action={toggleTodoAction}>
							<input
								type="hidden"
								name={toggleTodo.keyof().Enum.id}
								value={todo.id}
							/>
							<button class="flex gap-1">
								<span class={todo.done ? 'line-through' : ''}>
									{todo.title}
								</span>
								{todo.done && <span>✅</span>}
							</button>
						</Form>
					</li>
				))}
			</ul>

			<Form
				action={createTodoAction}
				spaReset
			>
				<fieldset
					disabled={createTodoAction.isRunning}
					class="flex flex-col gap-3"
				>
					<input
						type="text"
						name={createTodo.keyof().Enum.title}
						class="border"
					/>
					{createTodoAction.value?.fieldErrors?.title && (
						<div>{createTodoAction.value.fieldErrors.title}</div>
					)}
					<button type="submit">Create todo</button>
				</fieldset>
			</Form>
		</>
	)
})
