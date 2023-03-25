import { initTRPC } from '@trpc/server'
import type { client, User } from '@speedsouls/database'

type Context = {
	db: typeof client
	user: User | null
}

export const t = initTRPC.context<Context>().create()
