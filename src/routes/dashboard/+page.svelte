<script lang="ts">
	import type { PageData } from './$types';

	import Window from '$lib/components/window.svelte';
	import Button from '$lib/components/button.svelte';

	export let data: PageData;
</script>

<Window>
	<form method="POST" class="w-full">
		<h1 class="text-3xl font-bold mb-2">Add money</h1>

		<div class="grid gap-2 md:grid-cols-3 mb-2">
			<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
				<label class="block text-xs font-semibold" for="amount">what</label>
				<input
					type="text"
					id="name"
					name="name"
					class="w-full font-bold outline-none bg-transparent"
					required
				/>
			</div>

			<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
				<label class="block text-xs font-semibold" for="amount">how much</label>
				<input
					type="number"
					id="amount"
					name="amount"
					class="w-full font-bold outline-none bg-transparent"
					required
				/>
			</div>

			<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
				<label class="block text-xs font-semibold" for="amount">how</label>
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

		<div class="grid gap-2 md:grid-cols-2 mb-2">
			<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
				<label class="block text-xs font-semibold" for="amount">when</label>
				<input
					type="datetime-local"
					id="date"
					name="date"
					class="w-full font-bold outline-none bg-transparent"
					required
				/>
			</div>

			<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
				<label class="block text-xs font-semibold" for="amount">category</label>
				<input
					type="text"
					id="category"
					name="category"
					class="w-full font-bold outline-none bg-transparent"
				/>
			</div>
		</div>

		<Button>Add</Button>
	</form>
</Window>

<Window>
	<h1 class="text-3xl font-bold mb-2">Here money</h1>

	<table class="table-auto w-full text-left">
		<thead>
			<tr>
				<th>when</th>
				<th>what</th>
				<th>how much</th>
				<th>how</th>
			</tr>
		</thead>
		<tbody>
			{#each data.transactions as transaction}
				<tr>
					<td>{new Date(transaction.date).toLocaleString()}</td>
					<td>{transaction.name}</td>
					<td>RM{transaction.amount.toFixed(2)}</td>
					<td>{transaction.paymentMethod.name}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Window>
