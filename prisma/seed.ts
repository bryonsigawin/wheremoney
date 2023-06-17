import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('Seeding DB...');

	await prisma.paymentMethod.createMany({
		data: [
			{
				name: 'GrabPay',
				value: 'ewallet_grabpay'
			},
			{
				name: 'MB Credit (AMEX)',
				value: 'credit_maybank_amex'
			},
			{
				name: 'MB Credit (MC)',
				value: 'credit_maybank_mastercard'
			},
			{
				name: 'MB Debit',
				value: 'debit_maybank'
			},
			{
				name: 'CIMB Debit',
				value: 'debit_cimb'
			},
			{
				name: 'Cash',
				value: 'cash'
			}
		]
	});

	console.log('Created payment methods...');

	await prisma.category.createMany({
		data: [
			{
				name: 'Eating Out',
				description: ''
			},
			{
				name: 'Groceries',
				description: ''
			},
			{
				name: 'Transportation',
				description: ''
			},
			{
				name: 'Entertainment',
				description: ''
			},
			{
				name: 'Family & Friends',
				description: ''
			},
			{
				name: 'Partner',
				description: ''
			},
			{
				name: 'Fixed Payments',
				description: ''
			},
			{
				name: 'Others',
				description: ''
			}
		]
	});

	console.log('Created categories...');

	await prisma.user.create({
		data: {
			id: 'clix00e3l0000uwe015urpnp1',
			username: 'admin',
			name: 'admin'
		}
	});

	console.log('Created default admin user...');

	await prisma.transaction.create({
		data: {
			createdAt: new Date(),
			updatedAt: new Date(),
			name: 'Example',
			amount: 20,
			date: new Date(),
			paymentMethodId: 1,
			userId: 'clix00e3l0000uwe015urpnp1',
			isShared: false
		}
	});

	console.log('Created dummy admin user transaction...');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
