<script lang="ts">
	import type { PageData } from './$types';

	import AddTransaction from '$lib/components/add-transaction.svelte';
	import Transactions from '$lib/components/transactions.svelte';

	export let data: PageData;
	console.log(data);
</script>

<div class="flex h-screen w-screen items-center justify-center flex-col gap-6">
	<form method="POST">
		<AddTransaction />
	</form>
	<Transactions transactions={data.user?.transactions} />
</div>
