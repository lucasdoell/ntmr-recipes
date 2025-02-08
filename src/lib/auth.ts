import { db } from '$lib/server/db.server';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

export const auth = betterAuth({
	database: prismaAdapter(db, {
		provider: 'postgresql'
	}),
	emailAndPassword: {
		enabled: true
	},
	advanced: {
		generateId: () => crypto.randomUUID()
	}
});
