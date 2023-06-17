<script>
	import '@fontsource/iosevka-etoile/400.css';
	import '@fontsource/iosevka-etoile/400-italic.css';
	import '@fontsource/iosevka-etoile/700.css';
	import '@fontsource/iosevka-etoile/700-italic.css';

	import '../app.css';
</script>

<div
	class="grid min-h-screen gap-4 md:justify-items-center md:content-center py-14 md:px-6 pl-2 pr-6"
>
	<slot />
</div>

<style lang="postcss">
	:global(html) {
		@apply font-serif;
		background-color: #e8e1d4;
	}
</style>
