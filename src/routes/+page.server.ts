import prisma from '$lib/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ cookies }) => {
	const userId = cookies.get('userId');

	if (userId) {
		throw redirect(301, '/dashboard');
	} else {
		cookies.delete('userId');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();

		if (!username) throw error(500, { message: 'username is missing!' });

		const user = await prisma.user.findUnique({
			where: {
				username
			}
		});

		if (user) {
			cookies.set('userId', user.id);
			throw redirect(302, '/dashboard');
		} else {
			if (!username) throw error(404, { message: 'user does not exist!' });
		}
	}
} satisfies Actions;
