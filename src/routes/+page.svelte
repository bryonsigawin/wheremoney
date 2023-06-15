<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Window from '$lib/components/window.svelte';
</script>

<Window>
	<form method="POST">
		<div class="flex gap-2 items-center">
			<div>Hewwo</div>
			<input
				type="text"
				id="username"
				name="username"
				class="border-2 border-solid border-black px-4 py-2 w-full font-bold outline-none bg-transparent"
				required
			/>
		</div>
		<div class="mt-5">
			<Button>Submit</Button>
		</div>
	</form>
</Window>
