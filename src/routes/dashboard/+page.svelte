<script lang="ts">
	import dayjs from 'dayjs';
	import type { PageData } from './$types';

	import Window from '$lib/components/window.svelte';
	import Button from '$lib/components/button.svelte';

	export let data: PageData;

	type TransactionDateGroup = {
		[year: string]: {
			[month: string]: PageData['transactions'];
		};
	};

	$: transactionsDateGroups = data.transactions.reduce<TransactionDateGroup>((_groups, current) => {
		const groups = structuredClone(_groups);

		const date = dayjs(current.date);
		const month = date.month() + 1;
		const year = date.year();

		const groupYear = groups[year];
		if (!groupYear) groups[year] = {};

		const groupMonth = groups[year][month];
		if (!groupMonth) groups[year][month] = [];

		groups[year][month].push(current);

		return groups;
	}, {});
</script>

<Window>
	<form method="POST" action="?/add" class="w-full">
		<h1 class="text-3xl font-bold mb-2">Add money</h1>

		<div class="grid gap-2 md:grid-cols-3 mb-2">
			<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
				<label class="mb-1 block text-xs font-semibold" for="name">what</label>
				<input
					type="text"
					id="name"
					name="name"
					class="w-full font-bold outline-none bg-transparent"
					required
				/>
			</div>

			<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
				<label class="mb-1 block text-xs font-semibold" for="amount">how much</label>
				<div class="flex items-center gap-2">
					<div class="font-bold">RM</div>
					<input
						type="number"
						id="amount"
						name="amount"
						class="w-full font-bold outline-none bg-transparent"
						required
					/>
				</div>
			</div>

			<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
				<label class="mb-1 block text-xs font-semibold" for="paymentMethod">how</label>
				<select
					id="paymentMethod"
					name="paymentMethod"
					class="w-full font-bold outline-none bg-transparent"
					required
				>
					{#each data.paymentMethods as method}
						<option value={method.id}>{method.name}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="overflow-hidden border-2 border-solid border-black px-4 py-2 mb-2">
			<label class="mb-1 block text-xs font-semibold" for="description">so what is it</label>
			<textarea
				id="description"
				name="description"
				class="w-full font-bold outline-none bg-transparent resize-none"
				rows="2"
			/>
		</div>

		<div class="grid gap-2 md:grid-cols-2 mb-2">
			<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
				<label class="mb-1 block text-xs font-semibold" for="date">when</label>
				<input
					type="datetime-local"
					id="date"
					name="date"
					class="w-full font-bold outline-none bg-transparent"
					required
				/>
			</div>

			<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
				<label class="mb-1 block text-xs font-semibold" for="category">category</label>
				<select
					id="category"
					name="category"
					class="w-full font-bold outline-none bg-transparent"
					required
				>
					{#each data.categories as category}
						<option value={category.id}>{category.name}</option>
					{/each}
				</select>
			</div>

			<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
				<label class="mb-1 block text-xs font-semibold" for="isShared">shared?</label>
				<select
					id="isShared"
					name="isShared"
					class="w-full font-bold outline-none bg-transparent"
					required
				>
					<option value="false">No</option>
					<option value="true">Yes</option>
				</select>
			</div>
		</div>

		<Button>Add</Button>
	</form>
</Window>

<Window>
	<h1 class="text-3xl font-bold mb-4">Here money</h1>

	<div class="flex gap-6 flex-col">
		{#each Object.keys(transactionsDateGroups) as transactionYear}
			{#each Object.entries(transactionsDateGroups[transactionYear]).reverse() as [transactionMonth, transactions]}
				<div>
					<h2 class="text-2xl mb-2">
						{dayjs(`${transactionYear}/${transactionMonth}/1`).format('MMM YYYY')}
					</h2>

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
							{#each transactions.reverse() as transaction}
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
</Window>

<style></style>
