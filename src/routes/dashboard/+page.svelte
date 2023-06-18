<script lang="ts">
	import type { PageData } from './$types';

	import Window from '$lib/components/window.svelte';
	import Button from '$lib/components/button.svelte';

	import Transactions from './transactions.svelte';

	export let data: PageData;
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

	<Transactions transactions={data.transactions} />
</Window>

<style></style>
