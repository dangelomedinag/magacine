<script>
	import '../app.css';
	import '../styles/_global.css';

	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

{@render children?.()}
