<script>
	import '@fontsource/iosevka-etoile/400.css';
	import '@fontsource/iosevka-etoile/400-italic.css';
	import '@fontsource/iosevka-etoile/700.css';
	import '@fontsource/iosevka-etoile/700-italic.css';

	import '../app.css';
</script>

<div class="grid min-h-screen w-screen gap-6 justify-items-center content-center pt-10 px-6">
	<slot />
</div>

<style lang="postcss">
	:global(html) {
		@apply font-serif;
		background-color: #e8e1d4;
	}
</style>
