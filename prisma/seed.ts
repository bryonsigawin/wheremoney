import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('Seeding DB...');

	await prisma.user.create({
		data: {
			id: 'clix00e3l0000uwe015urpnp1',
			createdAt: new Date(),
			updatedAt: new Date(),
			username: 'admin',
			password: 'admin',
			name: 'admin'
		}
	});

	await prisma.transaction.create({
		data: {
			id: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
			name: 'Example',
			description: 'example transaction',
			amount: 20,
			date: new Date(),
			userId: 'clix00e3l0000uwe015urpnp1'
		}
	});
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
