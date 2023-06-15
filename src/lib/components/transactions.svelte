<script lang="ts">
	import type { Transaction } from '@prisma/client';
	import Window from './window.svelte';

	export let transactions: Transaction[] = [];
</script>

<Window>
	<h1 class="text-3xl font-bold mb-2">Here money</h1>

	<table class="table-auto w-full text-left">
		<thead>
			<tr>
				<th>Name</th>
				<th>Category</th>
				<th>Description</th>
				<th>Amount</th>
			</tr>
		</thead>
		<tbody>
			{#each transactions as transaction}
				<tr>
					<td>{transaction.name}</td>
					<th />
					<td>{transaction.description}</td>
					<td>RM{transaction.amount.toFixed(2)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Window>
