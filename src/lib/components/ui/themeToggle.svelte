<script>
	/* icons */
	import Icon from '$icons/icon.svelte';
	import Sun from '$icons/solid/sun.svelte';
	import Moon from '$icons/solid/moon.svelte';
	/* icons */

	import { quintIn, quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { themeStore } from '$lib/stores/theme-store';
	let active = false;

	function handleChange(e) {
		console.log(e.target.checked);
		themeStore.toogleTheme();
	}
</script>

{#if $themeStore}
	<!-- <button on:click={themeStore.toogleTheme} disabled={active}>
		{#key $themeStore}
			<div
				in:fly|local={{ duration: 1000, x: 6, delay: 300, easing: quintOut }}
				out:fly|local={{ duration: 300, x: -6, easing: quintIn }}
				on:outrostart={() => {
					active = true;
				}}
				on:introend={() => {
					active = false;
				}}
			>
				{#if $themeStore === 'light'}
					<Icon style="color: #ffae17;">
						<Sun />
					</Icon>
				{:else}
					<Icon style="color: darkslateblue;">
						<Moon />
					</Icon>
				{/if}
				{$themeStore}
			</div>
		{/key}
	</button> -->
	<button class="toggle-switch" on:click={handleChange}>
		<div class="label">
			<!-- <input
				tabindex="0"
				id="theme"
				name="theme"
				type="checkbox"
				checked={$themeStore === 'light'}
				on:change={handleChange}
			/> -->
			<div class="input" data-theme={$themeStore} />
			<span class="slider" />
		</div>
	</button>
{/if}

<!-- <button on:click={toogleTheme}>x</button> -->
<style>
	/* * {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	
	body {
		background-color: #cfafaf;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	} */

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
		/* border: 1px solid var(--c-divider); */
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
		/* padding: 0.5em 0; */
	}

	.input[data-theme='light'] ~ .slider {
		/* background-color: var(--dark-icon); */
		/* background-color: var(--dark); */
		background-color: var(--light-bg);
		/* border: 1px solid rgb(0, 0, 0); */
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
		/* background-color: red; */
		/* transition: 0.3s; */

		transition-property: transform, box-shadow;
		transition-duration: 0.3s;
	}

	.input[data-theme='light'] ~ .slider::before {
		transform: translate(0%, -50%);
		/* background-color: var(--dark-bg); */
		background-color: var(--light-icon);
		box-shadow: none;
	}

	/* a {
		position: relative;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		top: 150px;
		left: 10px;
		font-size: 10px;
		text-decoration: none;
		color: var(--link);
		font-weight: bold;
		text-align: center;
	} */

	/* a:hover {
		color: var(--link-hover);
	} */

	/* button {
		background-color: transparent !important;
		border: none;
		opacity: 1 !important;

	}
	button:disabled {
		opacity: 0.3 !important;
		background-color: var(--c-divider);
		cursor: not-allowed !important;
	}

	div {
		display: flex;
		font-size: 0.9rem;
		justify-content: center;
		align-items: center;
		background-color: var(--c-main);
		border: 1px solid var(--c-divider);
		color: var(--c-text-base);
		border-radius: 50vh;
		padding: 0 0.5em;
	} */
</style>
