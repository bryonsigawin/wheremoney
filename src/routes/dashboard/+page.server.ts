import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ cookies }) => {
	const userId = cookies.get('userId');

	if (!userId) throw redirect(301, '/');

	const transactions = await prisma.transaction.findMany({
		where: { userId }
	});

	return { transactions };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
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
