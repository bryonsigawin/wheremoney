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
				name: 'Maybank Credit (AMEX)',
				value: 'credit_maybank_amex'
			},
			{
				name: 'Maybank Credit (MasterCard)',
				value: 'credit_maybank_mastercard'
			},
			{
				name: 'Maybank Debit',
				value: 'debit_maybank_mastercard'
			}
		]
	});

	console.log('Created payment methods...');

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
			userId: 'clix00e3l0000uwe015urpnp1'
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
