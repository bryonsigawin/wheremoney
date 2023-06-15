import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ cookies }) => {
	const userId = cookies.get('userId');

	if (userId) throw redirect(301, '/dashboard');
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();

		if (!username) throw new Error('Username is missing!');

		const user = await prisma.user.findUnique({
			where: {
				username
			}
		});

		if (user) {
			cookies.set('userId', user.id);
			throw redirect(302, '/dashboard');
		} else {
			throw new Error('user does not exist!');
		}
	}
} satisfies Actions;
