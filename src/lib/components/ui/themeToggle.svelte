<script>
	/* icons */
	import Icon from '$icons/icon.svelte';
	import Sun from '$icons/solid/sun.svelte';
	import Moon from '$icons/solid/moon.svelte';
	/* icons */

	import { themeStore } from '$lib/stores/theme-store';

	function handleChange(e) {
		// console.log(e.target.checked);
		themeStore.toogleTheme();
	}
</script>

{#if $themeStore}
	<button class="toggle-switch" on:click={handleChange}>
		<div class="label">
			<div class="input" data-theme={$themeStore} />
			<span class="slider" />
		</div>
	</button>
{/if}

<style>
	.toggle-switch {
		--dark-icon: #cc9aff;
		--dark-bg: #43384a;
		--light-icon: #ffaf54;
		--light-bg: #dfdfdf;

		all: initial;
		position: relative;
		display: flex;
		justify-content: start;
		align-items: center;
		width: 3rem;
		padding: 0;
		margin: 0;
	}

	.toggle-switch:focus-visible {
		outline: -webkit-focus-ring-color auto 1px;
	}

	.label {
		position: absolute;
		width: 100%;
		height: 60%;
		background-color: var(--dark-bg);
		border-radius: 50vh;
		cursor: pointer;
	}

	.input {
		position: absolute;
		display: none;
	}

	.slider {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50vh;
		transition: 0.3s;
		border: 1px solid var(--c-divider);
	}

	.input[data-theme='light'] ~ .slider {
		background-color: var(--light-bg);
	}

	.slider::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-100%, -50%);
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		box-shadow: inset 6px -4px 0px 0px var(--dark-icon);
		background-color: var(--dark-bg);
		transition-property: transform, box-shadow;
		transition-duration: 0.3s;
	}

	.input[data-theme='light'] ~ .slider::before {
		transform: translate(0%, -50%);
		background-color: var(--light-icon);
		box-shadow: none;
	}
</style>
