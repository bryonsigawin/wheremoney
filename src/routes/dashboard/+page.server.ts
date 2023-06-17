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
			category: true,
			paymentMethod: true
		}
	});

	const paymentMethods = await prisma.paymentMethod.findMany({
		select: { name: true, id: true }
	});

	const categories = await prisma.category.findMany({
		select: { name: true, id: true }
	});

	return { paymentMethods, transactions, categories };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const userId = cookies.get('userId');
		const data = await request.formData();

		const name = data.get('name');
		const description = data.get('description');
		const amount = data.get('amount');
		const date = data.get('date');
		const categoryId = data.get('category');
		const paymentMethodId = data.get('paymentMethod');
		const isShared = data.get('isShared');

		if (!userId || !name || !amount || !paymentMethodId || !date || !categoryId || !isShared) {
			throw error(404, 'Fields are missing!');
		}

		await prisma.transaction.create({
			data: {
				userId,
				name: name.toString(),
				...(description ? { description: description.toString() } : {}),
				amount: parseInt(amount.toString()),
				paymentMethodId: parseInt(paymentMethodId.toString()),
				categoryId: categoryId.toString(),
				date: new Date(date.toString()),
				isShared: JSON.parse(`${isShared}`)
			}
		});
	}
} satisfies Actions;
