<script>
	// import { onDestroy } from 'svelte';
	import SessionModal from '$components/ui/navbar/sessionModal.svelte';
	import Icon from '$components/ui/icons/icon.svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import Modal from '$components/ui/movie/modal.svelte';
	import CarouselMovies from './CarouselMovies.svelte';
	import { page } from '$app/stores';
	import ThemeToggle from '$components/ui/themeToggle.svelte';

	export let search = true,
		bell = true,
		profile = true;

	let modal;
	let searchInput = false;
	let result;

	function submit(e) {
		result = null;
		modal.open();
		let query = e.target.x.value.trim();
		console.log(query);
		let url = new URL(location);
		console.log(url);

		fetch(url.origin + '/api/?s=' + query)
			.then((r) => {
				if (!r.ok) {
					loading = false;
					throw ok;
				}
				return r.json();
			})
			.then((j) => {
				console.log(j);
				result = j;
			})
			.catch((error) => {
				result = Error('sdads');
				console.log('fallllaaaaaa');
			});
	}

	afterNavigate(({ from, to }) => {
		if (from?.href !== to?.href) {
			modal.close();
		}
	});

	// $: console.log(modal?.open);
</script>

<nav class="navbar">
	<div class="content navbar-wrapper">
		{#if searchInput}
			<form on:submit|preventDefault={submit}>
				<input class="searchBox" type="search" name="x" id="x" />
			</form>
			<button
				on:click={() => {
					searchInput = !searchInput;
					modal.close();
				}}
				style="display: inline-flex;"
			>
				close
				<Icon name="x" type="solid" />
			</button>
		{:else}
			<div class="left">
				<a href="/">
					<Icon name="home" type="solid" />
				</a>
				<ThemeToggle />
			</div>
			<div class="center">
				<slot />
			</div>
			<div class="right">
				{#if bell}
					<button
						on:click={() => {
							console.log('click');
						}}
					>
						<Icon name="bell" />
					</button>
				{/if}
				{#if search}
					<button
						on:click={() => {
							searchInput = !searchInput;
						}}
					>
						<Icon name="search" type="solid" />
					</button>
				{/if}
				{#if profile}
					<SessionModal />
				{/if}
			</div>
		{/if}
	</div>
</nav>
<!-- {#if searchInput} -->
<Modal bind:this={modal} Zindex="49" btnClose={false}>
	<!-- {#if result} -->
	<CarouselMovies position="static" movies={result} title={result?.search}>
		<svelte:fragment slot="error">nothing result</svelte:fragment>
	</CarouselMovies>

	<!-- {/if} -->
	<svelte:fragment slot="action">
		<button on:click={modal.close} class="cta">close</button>
	</svelte:fragment>
</Modal>
<!-- {/if} -->

<!-- <button on:click={modal.open}>clic</button> -->
<style>
	:root {
		--navbar-item-gap: 0.5em;
	}

	.navbar {
		--icon-size: 1.2rem;

		position: sticky;
		top: 0;
		z-index: 51;
		/* position: relative; */
		width: 100%;
		background-color: var(--navbar-bg);
		border-bottom: 1px solid var(--c-divider);
		box-shadow: var(--shadow-short);
	}

	.navbar-wrapper {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.navbar-wrapper  :global(button),
	.navbar-wrapper  :global(a)/* ,
	.left > :global(button),
	.right > :global(button),
	.center > :global(button),
	.left > :global(a),
	.right > :global(a),
	.center > :global(a) */ {
		background-color: transparent;
		color: inherit;
		border: 2px solid transparent;
		/* background-color: brown; */
		opacity: var(--navbar-item-opacity);
		/* max-height: 100%; */
		padding: 0;
		margin: 0;
		/* display: block; */
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 0.7em 0.5em;
		/* line-height: 1em; */
		text-decoration: none;
		cursor: pointer;
	}

	.left > :global(button:hover),
	.right > :global(button:hover),
	.center > :global(button:hover),
	.left > :global(a:hover),
	.right > :global(a:hover),
	.center > :global(a:hover),
	.center > :global(button.active),
	.center > :global(a.active) {
		/* background-color: rgba(255 255 255 / 7%); */
		opacity: 1;
		color: var(--navbar-item-hover);
	}
	.center > :global(button.active) {
		border-bottom: 2px solid var(--c-front);
	}

	.center {
		order: 3;
		width: 100%;
		/* background-color: var(--c-main); */
		/* display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto; */
	}

	.center > :global(button) {
		flex: 1 1 100%;
		font-weight: bold;
	}

	@media (min-width: 576px) {
		.navbar-wrapper {
			flex-wrap: nowrap;
		}
		.center {
			width: auto;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.center > :global(button) {
			flex: 0 1 auto;
		}
	}

	/* search box */

	form {
		padding: 0;
		margin: 0;
		/* width: 100%; */
		/* background-color: red; */
	}

	.searchBox {
		/* padding: 0.2em; */
		width: 100%;
		/* font-size: 1rem; */
		/* line-height: 1rem; */
		height: 100%;
	}
</style>
