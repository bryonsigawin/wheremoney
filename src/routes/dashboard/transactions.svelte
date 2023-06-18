<script lang="ts">
	import dayjs from 'dayjs';

	import type { PageData } from './$types';

	export let transactions: PageData['transactions'] = [];

	type TransactionDateGroup = {
		[year: string]: {
			[month: string]: {
				totalAmount: number;
				transactions: PageData['transactions'];
			};
		};
	};

	$: transactionsDateGroups = transactions.reduce<TransactionDateGroup>((_groups, current) => {
		const groups = structuredClone(_groups);

		const date = dayjs(current.date);
		const month = date.month();
		const year = date.year();

		const groupYear = groups[year];
		if (!groupYear) groups[year] = {};

		const groupMonth = groups[year][month];
		if (!groupMonth) groups[year][month] = { totalAmount: 0, transactions: [] };

		groups[year][month].totalAmount += current.amount;
		groups[year][month].transactions.push(current);

		return groups;
	}, {});
</script>

<div class="flex gap-8 flex-col">
	{#each Object.keys(transactionsDateGroups) as transactionYear}
		{#each Object.entries(transactionsDateGroups[transactionYear]).reverse() as [transactionMonth, monthData]}
			<div>
				<div class="mb-6 flex justify-end items-end gap-6">
					<h2 class="text-2xl align-bottom mr-auto">
						{dayjs()
							.year(parseInt(transactionYear))
							.month(parseInt(transactionMonth))
							.format('MMM YYYY')}
					</h2>

					<div class="text-right">
						<div class="text-xs">transactions</div>
						<div>{monthData.transactions.length}</div>
					</div>

					<div class="text-right">
						<div class="text-xs">total amount</div>
						<div>RM {monthData.totalAmount.toFixed(2)}</div>
					</div>
				</div>

				<table class="table-auto w-full text-left text-xs md:text-sm md:whitespace-nowrap">
					<thead>
						<tr class="border-b border-black mb-4">
							<th class="px-2 pb-2">when</th>
							<th class="px-2 pb-2">how</th>
							<th class="px-2 pb-2">what</th>
							<th class="px-2 pb-2">how much</th>
							<th class="px-2 pb-2" />
						</tr>
					</thead>
					<tbody>
						{#each monthData.transactions.reverse() as transaction}
							<tr>
								<td class="p-2 w-0">
									<div>{dayjs(transaction.date).format('YYYY-MM-DD')}</div>
									<div class="text-xs opacity-75">
										{dayjs(transaction.date).format('hh:mm:ssA')}
									</div>
								</td>
								<td class="p-2 w-0 align-top">
									<div>{transaction.paymentMethod?.name}</div>
								</td>
								<td class="p-2 align-top">
									<div>
										{#if transaction.category}
											{transaction.category.name} - {transaction.name}
										{:else}
											{transaction.name}
										{/if}
									</div>
									{#if transaction.description}
										<div class="text-xs opacity-75">
											{#if transaction.isShared}
												[Shared]
											{/if}
											{transaction.description}
										</div>
									{/if}
								</td>
								<td class="w-0 p-2">
									<div class="flex justify-between items-center gap-3">
										<div>RM</div>
										<div>{transaction.amount.toFixed(2)}</div>
									</div>
								</td>
								<td class="w-0 p-2 text-xs">
									<form method="POST" action="?/delete">
										<input
											type="hidden"
											name="transactionId"
											value={transaction.id}
											class="hidden"
										/>
										<button>Delete</button>
									</form>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/each}
	{/each}
</div>
