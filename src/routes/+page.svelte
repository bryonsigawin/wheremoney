<script lang="ts">
	import type { PageData } from './$types';

	import AddTransaction from '$lib/components/add-transaction.svelte';

	export let data: PageData;
	console.log(data);
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<AddTransaction />
</div>
