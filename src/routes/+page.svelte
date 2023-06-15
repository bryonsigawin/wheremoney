<script lang="ts">
	import type { PageData } from './$types';

	import AddTransaction from '$lib/components/add-transaction.svelte';
	import Transactions from '$lib/components/transactions.svelte';

	export let data: PageData;
	console.log(data);
</script>

<div class="grid min-h-screen w-screen place-content-center gap-6 pt-10">
	<form method="POST" action="?/add">
		<AddTransaction />
	</form>
	<Transactions transactions={data.user?.transactions} />
</div>
