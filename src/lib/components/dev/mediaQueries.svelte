<script lang="ts">
	let { top = 'initial', left = 'initial', right = 'initial', bottom = 'initial' } = $props();
</script>

<div style:top style:left style:right style:bottom></div>

<style>
	div {
		position: fixed;
		background-color: #555;
		color: white;
		z-index: 999;
		padding: 5px;
		opacity: 0.4;
	}

	div::before {
		content: 'init';
	}

	@media (min-width: 576px) {
		div {
			background-color: blue;
		}
		div::before {
			content: '576px';
		}
	}
	@media (min-width: 768px) {
		div {
			background-color: red;
		}
		div::before {
			content: '768px';
		}
	}
	@media (min-width: 992px) {
		div {
			background-color: green;
		}
		div::before {
			content: '992px';
		}
	}
	@media (min-width: 1200px) {
		div {
			background-color: purple;
		}
		div::before {
			content: '1200px';
		}
	}
</style>
