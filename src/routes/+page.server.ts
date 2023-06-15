import prisma from '$lib/prisma';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ cookies }) => {
	const user = await prisma.user.findFirst({
		select: {
			id: true,
			transactions: true
		}
	});

	if (user?.id) cookies.set('userId', user.id);

	return { user };
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request, cookies }) => {
		const data = await request.formData();

		const amount = data.get('amount');
		const name = data.get('name');
		const description = data.get('description');
		const userId = cookies.get('userId');

		if (!amount || !name || !description || !userId) throw new Error('Fields are missing!');

		await prisma.transaction.create({
			data: {
				amount: parseInt(amount.toString()),
				name: `${name}`,
				description: `${description}`,
				date: new Date(),
				userId
			}
		});
	}
} satisfies Actions;
