import '@total-typescript/ts-reset'
import type { User } from '@prisma/client'
import type { appRouter } from './trpc'

declare global {
	interface QwikCityPlatform {
		user: User | null
		trpc: ReturnType<typeof appRouter.createCaller>
	}
}
