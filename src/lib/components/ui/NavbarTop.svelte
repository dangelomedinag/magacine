<script>
	// import { onDestroy } from 'svelte';
	import SessionModal from '$components/ui/navbar/sessionModal.svelte';
	import Icon from '$components/ui/icons/icon.svelte';
	import { goto } from '$app/navigation';

	export let search = true,
		bell = true,
		profile = true;

	let searchInput = false;
</script>

<nav class="navbar">
	<div class="content navbar-wrapper">
		<div class="left">
			<a href="/">
				<Icon name="home" type="solid" />
			</a>
		</div>
		<div class="center">
			{#if searchInput}
				<form
					on:submit|preventDefault={(e) => {
						console.log(location);
						const u = new URL(location.origin + '/search');
						console.log(u);
						u.searchParams.set('s', e.target.query.value);
						goto(u.href);
					}}
				>
					<input type="search" id="searchig" name="query" />
				</form>
			{:else}
				<slot />
			{/if}
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
				<button on:click={() => (searchInput = !searchInput)}>
					<Icon name="search" type="solid" />
				</button>
			{/if}
			{#if profile}
				<SessionModal />
			{/if}
		</div>
	</div>
</nav>

<!-- {#if searching}
	<div class="filter-sticky">
		<SearchMovies bind:results bind:value>
			<CarouselMovies movies={results} title={value} priority="small" />

			<div slot="suggest" class="content">
				<Toast warn>
					Opps! parece que no se encontraron resultados para <span>"{value}"</span>
				</Toast>
				<div>
					<CarouselMovies movies={stuff.shrek} title="sugesst" priority="small" />
				</div>
			</div>
		</SearchMovies>
	</div>
{/if} -->
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
		background-color: var(--c-main-content);
		border-bottom: 1px solid rgba(128, 128, 128, 0.1);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
	}

	.navbar-wrapper {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.left > :global(button),
	.right > :global(button),
	.center > :global(button),
	.left > :global(a),
	.right > :global(a),
	.center > :global(a) {
		background-color: transparent;
		color: inherit;
		border: 1px solid transparent;
		/* background-color: brown; */
		opacity: 0.5;
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
		border-bottom: 1px solid var(--c-front);
		opacity: 1;
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
</style>
