import { $ctx } from './context'

export function $trpc(params: Parameters<typeof $ctx>[0]) {
	return $ctx(params).trpc
}
