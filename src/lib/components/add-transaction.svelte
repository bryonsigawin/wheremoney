<script>
	import Button from './button.svelte';
	import Window from './window.svelte';
</script>

<Window>
	<h1 class="text-3xl font-bold mb-2">Where money</h1>

	<div class="grid gap-2">
		<div class="">
			<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
				<label class="block text-xs font-semibold" for="amount">amount</label>
				<input id="amount" class="font-bold outline-none bg-transparent" />
			</div>
		</div>
		<div class="">
			<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
				<label class="block text-xs font-semibold" for="amount">category</label>
				<input id="amount" class="font-bold outline-none bg-transparent" />
			</div>
		</div>
		<div class="">
			<div class="overflow-hidden border-2 border-solid border-black px-4 py-2">
				<label class="block text-xs font-semibold" for="amount">description</label>
				<input id="amount" class="font-bold outline-none bg-transparent" />
			</div>
		</div>

		<div class="">
			<Button type="submit">Add</Button>
		</div>
	</div>
</Window>
