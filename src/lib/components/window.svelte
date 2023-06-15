<div class="border-2 border-solid border-black shadowed w-full max-w-5xl">
	<div class="border-[3px] border-solid border-white border-r-gray-400 border-b-gray-400">
		<div class="p-8 border-t-4 border-solid border-black">
			<slot />
		</div>
	</div>
</div>

<style>
	.shadowed {
		box-shadow: 10px 15px 0 rgba(0 0 0 / 0.5);
	}
</style>
