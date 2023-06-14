import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = [
	{
		id: 'cliueff3f0000uw6otkz3vmqa',
		name: 'George',
		username: 'admin',
		password: 'admin'
	}
];

async function main() {
	console.log('Seeding DB...');

	for (const p of seedData) {
		const user = await prisma.user.create({
			data: p
		});

		console.log(
			`created user ${user.id}(${user.name}) with creds ${user.username} / ${user.password}`
		);
	}
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
