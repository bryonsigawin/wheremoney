import prisma from '$lib/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ cookies }) => {
	const userId = cookies.get('userId');

	if (!userId) throw redirect(301, '/');

	const user = await prisma.user.findUnique({
		where: { id: userId }
	});

	if (!user) {
		cookies.delete('userId');
		throw redirect(301, '/');
	}

	const transactions = await prisma.transaction.findMany({
		where: { userId },
		include: {
			categories: true,
			paymentMethod: true
		}
	});

	const paymentMethods = await prisma.paymentMethod.findMany({
		select: { name: true, id: true }
	});

	return { paymentMethods, transactions };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const userId = cookies.get('userId');
		const data = await request.formData();

		const name = data.get('name');
		const amount = data.get('amount');
		const paymentMethodId = data.get('paymentMethod');
		const date = data.get('date');
		const category = data.get('category');

		if (!userId || !name || !amount || !paymentMethodId || !date || !category) {
			throw error(404, 'Fields are missing!');
		}

		await prisma.transaction.create({
			data: {
				userId,
				name: name.toString(),
				amount: parseInt(amount.toString()),
				paymentMethodId: parseInt(paymentMethodId.toString()),
				date: new Date(date.toString())
			}
		});
	}
} satisfies Actions;
