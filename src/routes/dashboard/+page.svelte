<script lang="ts">
	import type { PageData } from './$types';

	import Window from '$lib/components/window.svelte';
	import Button from '$lib/components/button.svelte';

	export let data: PageData;
</script>

<Window>
	<form method="POST" class="w-full">
		<h1 class="text-3xl font-bold mb-2">Add money</h1>

		<div class="grid gap-2">
			<div class="">
				<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
					<label class="block text-xs font-semibold" for="amount">amount</label>
					<input
						type="number"
						id="amount"
						name="amount"
						class="w-full font-bold outline-none bg-transparent"
						required
					/>
				</div>
			</div>
			<div class="">
				<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
					<label class="block text-xs font-semibold" for="amount">name</label>
					<input
						type="text"
						id="name"
						name="name"
						class="w-full font-bold outline-none bg-transparent"
						required
					/>
				</div>
			</div>
			<div class="">
				<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
					<label class="block text-xs font-semibold" for="amount">description</label>
					<input
						id="description"
						name="description"
						class="w-full font-bold outline-none bg-transparent"
						required
					/>
				</div>
			</div>
			<div class="">
				<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
					<label class="block text-xs font-semibold" for="amount">When</label>
					<input
						type="date"
						id="date"
						name="date"
						class="w-full font-bold outline-none bg-transparent"
						required
					/>
				</div>
			</div>

			<div class="">
				<Button>Add</Button>
			</div>
		</div>
	</form>
</Window>

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
			{#each data.transactions as transaction}
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
