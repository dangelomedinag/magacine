<script>
	// import { onDestroy } from 'svelte';
	import SessionModal from '$components/ui/navbar/sessionModal.svelte';
	import Icon from '$components/ui/icons/icon.svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import Modal from '$components/ui/movie/modal.svelte';
	import CarouselMovies from './CarouselMovies.svelte';
	// import { page } from '$app/stores';
	import ThemeToggle from '$components/ui/themeToggle.svelte';
	import NavbarSearchForm from '$components/ui/navbar-search-form.svelte';

	import HeaderSticky from './headerSticky.svelte';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import Toast from './toast.svelte';

	export let search = true,
		bell = true,
		profile = true;

	let modal;
	let modalSession;
	let searchInput = false;
	let result;

	function submit(e) {
		// result = null;
		// modal.open();
		e.target.x.blur();

		let query = e.target.x.value.trim();
		let url = new URL(location);

		result = fetch(url.origin + '/api/?limit=3&s=' + query).then(async (r) => {
			if (!r.ok) {
				const error = await r.json();
				throw error;
			}

			return r.json();
		});

		modal.open();
	}

	afterNavigate(({ from, to }) => {
		if (from?.href !== to?.href) {
			modal.close();
		}
	});

	let lastScroll = 0;

	let navbar;

	onMount(() => {
		let leftContainer;

		function alternatedNavbar(e) {
			let currentScroll = window.pageYOffset;

			if (!leftContainer) leftContainer = document.querySelector('div.left').offsetHeight;

			if (window.scrollY > 10) {
				if (currentScroll - lastScroll > 0) {
					console.log(leftContainer);
					navbar.style.transform = `translateY(-${leftContainer + 2}px)`;

					document.querySelector('div.center').classList.add('block');
				} else {
					navbar.style.transform = `translateY(0px)`;

					document.querySelector('div.center').classList.remove('block');
				}
			}

			lastScroll = currentScroll;
		}

		if (!matchMedia('(min-width: 576px)').matches) {
			window.addEventListener('scroll', alternatedNavbar);
		}

		return () => window.removeEventListener('scroll', alternatedNavbar);
	});

	afterNavigate(() => {
		navbar.style.transform = `translateY(0px)`;
	});

	function toggleRenderSearchBox() {
		searchInput = !searchInput;
	}
</script>

<!-- <nav class="navbar" class:scroll-down={down} class:scroll-up={up}> -->
<nav class="navbar" bind:this={navbar}>
	<div class="content navbar-wrapper">
		<div class="left">
			<!-- <a href="/">
				<Icon name="home" type="solid" />
			</a> -->
			<ThemeToggle />
		</div>
		<div class="center">
			{#if searchInput}
				<NavbarSearchForm
					on:submit={submit}
					on:close={() => {
						toggleRenderSearchBox();
						modal.close();
					}}
				/>
			{:else}
				<slot />
				{#if search}
					<button class="search-second" style="margin-left: auto;" on:click={toggleRenderSearchBox}>
						<Icon name="search" type="solid" />
					</button>
				{/if}
			{/if}
		</div>
		<div class="right">
			{#if search}
				<button class="search-first" on:click={toggleRenderSearchBox}>
					<Icon name="search" type="solid" />
				</button>
			{/if}
			{#if bell}
				<button
					on:click={() => {
						console.log('click');
					}}
				>
					<Icon name="bell" />
				</button>
			{/if}
			{#if profile}
				{#if $session.user}
					<button on:click={modalSession.open}>
						<Icon name="user-circle" type="solid" />
					</button>
				{/if}
			{/if}
		</div>
	</div>
</nav>

<Modal bind:this={modalSession} Zindex="110" btnClose={false}>
	<header class="modal-header">
		{$session.user.name}
	</header>

	<ul class="list">
		<li class="list__item list__item--block">
			<a class="list__link" href="/profile">
				<Icon name="user-circle" />
				<span class="list__label">Profile</span></a
			>
		</li>
		<li class="list__item">
			<a class="list__link" href="/settings">
				<Icon name="cog" />
				<span class="list__label">Settings</span></a
			>
		</li>
		<li class="list__item">
			<a class="list__link" href="/help">
				<Icon name="information-circle" />
				<span class="list__label">help</span></a
			>
		</li>
	</ul>
	<svelte:fragment slot="action">
		<a class="list__logout" href="/auth/logout">logout <Icon name="logout" /></a>
		<button href="/auth/logout" on:click={modalSession.close} class="cta">close</button>
	</svelte:fragment>
</Modal>

<Modal bind:this={modal} Zindex="110" btnClose={false}>
	<header class="modal-header">
		search: {result?.search ?? ''}
	</header>

	{#await result}
		<p>loading...</p>
	{:then response}
		<ul class="list">
			{#each response.results as movie}
				<li
					class=" list__item--block"
					style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--c-divider);"
				>
					<span style="padding-left: 1em;">
						<div
							style="width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
						>
							{movie.title} - {movie.year}
						</div>
						<div style="font-weight: lighter;">{movie.type}</div>
					</span>
					<img
						src={movie.poster}
						alt={movie.title}
						style="max-height: 70px; display: block; width: 50px; object-fit: cover;"
					/>
				</li>
			{/each}
			<li class=" list__item--block" style="text-align: center; padding-top: 0.5em;">
				{response.totalResults} total results
			</li>
		</ul>
	{:catch error}
		<p>Opps! error:</p>
		<Toast danger>
			<span>
				{error.message}
			</span>
		</Toast>
	{/await}

	<svelte:fragment slot="action">
		{#await result then response}
			<a href="/search?s={response.search}" class="cta">show all</a>
		{/await}
		<button
			on:click={() => {
				modal.close();
				searchInput = false;
			}}>close</button
		>
	</svelte:fragment>

	<!-- {#if result}
		<ul class="list">
			{#each result.results as movie}
				<li
					class=" list__item--block"
					style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--c-divider);"
				>
					<span style="padding-left: 1em;">
						<div
							style="width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
						>
							{movie.title} - {movie.year}
						</div>
						<div style="font-weight: lighter;">{movie.type}</div>
					</span>
					<img
						src={movie.poster}
						alt={movie.title}
						style="max-height: 70px; display: block; width: 50px; object-fit: cover;"
					/>
				</li>
			{/each}
			<li class=" list__item--block" style="text-align: center; padding-top: 0.5em;">
				{result.totalResults} total results
			</li>
		</ul>
	{/if} -->
	<!-- <CarouselMovies position="static" movies={result} title={result?.search}>
		<svelte:fragment slot="error">nothing result</svelte:fragment>
	</CarouselMovies> -->

	<!-- <svelte:fragment slot="action">
		{#if result}
			<a href="/search?{result.query}" class="cta">show all</a>
		{/if}
		<button
			on:click={() => {
				modal.close();
				searchInput = false;
			}}>close</button
		>
	</svelte:fragment> -->
</Modal>

<style>
	:root {
		--navbar-item-gap: 0.5em;
	}

	.navbar {
		--icon-size: 1.2rem;
		/* position: fixed; */
		/* top: 0; */
		/* left: 0; */
		width: 100%;
		transition: transform 300ms ease;
		transform: translateY(0);
		/* z-index: 10; */
		position: sticky;
		top: 0;
		z-index: 51;
		/* position: relative; */
		/* width: 100%; */
		overflow: hidden;
		background-color: var(--navbar-bg);
		border-bottom: 1px solid var(--c-divider);
		box-shadow: var(--shadow-short);
	}

	.navbar-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}

	.left,
	.center,
	.right {
		display: flex;
		/* justify-content: flex-start; */
		/* justify-content: stretch; */
		/* align-items: center; */
		/* height: 100%; */
	}

	/* .center { */
	/* height: 50px; */
	/* } */

	.left > :global(button),
	.right > :global(button),
	.center > :global(button),
	.left > :global(a),
	.right > :global(a),
	.center > :global(a) {
		background-color: transparent;
		color: inherit;
		border: 2px solid transparent;
		border: none;
		opacity: var(--navbar-item-opacity);
		padding: 0;
		margin: 0;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 0.9em 0.5em;
		line-height: 1rem;
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
		opacity: 1;
		color: var(--navbar-item-hover);
	}
	.center > :global(button.active) {
		border-bottom: 2px solid var(--c-front);
	}

	.center {
		order: 3;
		width: 100%;
	}

	.center > :global(button) {
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
		.search-first {
			display: inline-flex;
		}
		.search-second {
			display: none !important;
		}
	}

	.search-second {
		display: none;
	}

	:global(.center.block) > :global(button + .search-second) {
		display: inline-flex;
	}

	/* modal session */
	.modal-header {
		text-align: center;
	}

	.list {
		list-style: none;
		padding: 1em 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.2em;
	}

	.list__item {
		flex-basis: 33%;
		flex-grow: 1;
		flex-shrink: 1;
		/* max-width: 300px; */
		text-decoration: none;
		/* margin: 0.2em 0; */
		font-weight: bold;
		border-color: var(--c-divider);
		border-width: 1px;
		border-style: solid;
		border-radius: 5px;
		/* background-color: var(--c-front); */
	}
	.list__item:hover {
		/* border-color: rgba(255 255 255 / 15%); */
		background-color: var(--c-divider);
	}
	.list__item:hover .list__link {
		color: var(--c-front);
	}

	.list__item--block {
		flex-basis: 100%;
	}

	.list__link {
		padding: 0.5em;
		display: flex;
		align-items: center;
		color: var(--c-text-base);
		text-decoration: none;
	}

	.list__label {
		padding-left: 0.5em;
	}

	.list__logout {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
	}
</style>
