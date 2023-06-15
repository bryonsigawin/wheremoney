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
		const date = data.get('date');
		const userId = cookies.get('userId');

		if (!amount || !name || !description || !userId || !date) {
			throw new Error('Fields are missing!');
		}

		const inputDate = new Date(`${date}`);

		const actualDate = new Date();
		actualDate.setDate(inputDate.getDate());
		actualDate.setMonth(inputDate.getMonth());

		await prisma.transaction.create({
			data: {
				amount: parseInt(amount.toString()),
				name: `${name}`,
				description: `${description}`,
				date: actualDate,
				userId
			}
		});
	}
} satisfies Actions;
