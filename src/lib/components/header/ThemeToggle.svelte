<script lang="ts">
	import { setCookieColorTheme, timeoutPromise, toggleColorTheme } from '$helpers';
	import { themeStore } from '$lib/stores/theme-store';
	let loading = $state(false);
	let timeoutID: NodeJS.Timeout | undefined = undefined;
	// function handleChange() {
	// 	if (timeoutID) clearTimeout(timeoutID);

	// 	const theme = $themeStore === 'dark' ? 'light' : 'dark';
	// 	const rootAttrClassTheme = document.documentElement.dataset;
	// 	rootAttrClassTheme.rootTheme = theme;
	// 	themeStore.set(theme);

	// 	try {
	// 		loading = true;
	// 		timeoutID = setTimeout(() => {
	// 			fetch('/api/theme', {
	// 				method: 'PUT',
	// 				body: JSON.stringify({ theme })
	// 			});
	// 			return () => (timeoutID = undefined);
	// 		}, 1500);
	// 	} catch (error) {
	// 		console.log('error switch theme');
	// 	} finally {
	// 		loading = false;
	// 	}
	// }
	function handleChange() {
		if (timeoutID) clearTimeout(timeoutID);

		try {
			toggleColorTheme();
			loading = true;
			timeoutID = setTimeout(() => {
				setCookieColorTheme($themeStore);
				return () => (timeoutID = undefined);
			}, 1500);
		} catch (e) {
			console.log('error switch theme');
		} finally {
			loading = false;
		}
	}

	function getTheme(node: HTMLButtonElement) {
		loading = true;
		const rootAttrClassTheme = document.documentElement.dataset;
		themeStore.set(rootAttrClassTheme.rootTheme as string);
		loading = false;

		return {
			destroy() {
				loading = false;
			}
		};
	}
</script>

<!-- {#if $themeStore} -->
<button use:getTheme class="toggle-switch" disabled={loading} onclick={handleChange}>
	<div class="label">
		<div class="input"></div>
		<span class="slider"></span>
	</div>
</button>

<!-- {/if} -->

<style>
	.toggle-switch {
		--dark-icon: #cc9aff;
		--dark-bg: var(--c-divider);
		--light-icon: #ffaf54;
		--light-bg: var(--c-divider);
		--size: 1.2rem;
		--pad: 0.2rem;

		/* all: initial; */
		background-color: transparent;
		border: none;
		position: relative;
		display: flex;
		justify-content: start;
		align-items: center;
		width: calc(var(--size) * 2);
		padding: 0;
		margin: 0;
		margin-inline: 0.5rem;
	}

	.toggle-switch:disabled {
		background-color: red;
	}

	.toggle-switch:hover .label {
		background-color: var(--c-divider);
	}

	/* .toggle-switch:focus {
		outline: inherit;
	} */

	.label {
		position: absolute;
		width: 100%;
		height: calc(var(--size) + calc(var(--pad) * 2));
		border: 1px solid var(--c-divider);
		border-radius: 50vh;
		cursor: pointer;
	}

	.input {
		position: absolute;
	}

	.slider {
		width: 100%;
		height: 100%;
		border-radius: 50vh;
		transition: 0.3s;
	}

	.slider::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(calc(-100% + var(--pad)), -50%);
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		box-shadow: inset 6px -4px 0px 0px var(--dark-icon);
		transition-property: transform, box-shadow;
		transition-duration: 0.6s;
		transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	:global([data-root-theme='light']) .input ~ .slider::before {
		transform: translate(calc(0% - var(--pad)), -50%);
		background-color: var(--light-icon);
		box-shadow: inset 0px 0px 0px 0px var(--dark-icon);
	}
</style>
