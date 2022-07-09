<script>
	import { onMount } from 'svelte';

	// components
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';
	import Alert from '$components/ui/alert.svelte';

	let movies = [];
	onMount(async () => {
		const reqs = [
			fetch('/api?s=saw').then((r) => {
				// if (!r.ok) throw r;
				return r.json();
			}),
			fetch('/api?s=blood').then((r) => {
				// if (!r.ok) throw r;
				return r.json();
			}),
			fetch('/api?s=horror').then((r) => {
				// if (!r.ok) throw r;
				return r.json();
			}),
			fetch('/api?s=horror&page=2').then((r) => {
				// if (!r.ok) throw r;
				return r.json();
			}),
			fetch('/api?s=comedy').then((r) => {
				// if (!r.ok) throw r;
				return r.json();
			}),
			fetch('/api?s=comedy&page=2').then((r) => {
				// if (!r.ok) throw r;
				return r.json();
			})
		];

		const res = await Promise.all(reqs);
		const data = res.map((e) => (e.message ? new Error(e.message) : e));

		movies = data;
	});

	let act = 'suspense';

	const setTab = (tab) => (act = tab);
</script>

<svelte:head>
	<title>Magacine - Discovery</title>
</svelte:head>

<NavbarTop>
	<button on:click={() => setTab('suspense')} class:active={act === 'suspense'}>Suspense</button>
	<button on:click={() => setTab('terror')} class:active={act === 'terror'}>Terror</button>
	<button on:click={() => setTab('comedy')} class:active={act === 'comedy'}>Comedy</button>
</NavbarTop>

<div class="content">
	{#if act === 'suspense'}
		<CarouselMovies
			movies={movies[0]}
			title="Suspense  {movies[0]?.totalResults ?? 'loading'} results)"
		/>
		<CarouselMovies
			movies={movies[1]}
			title="Suspense  {movies[1]?.totalResults ?? 'loading'} results)"
		/>
	{/if}
	{#if act === 'terror'}
		<CarouselMovies
			movies={movies[2]}
			title="Terror  {movies[2]?.totalResults ?? 'loading'} results)"
		/>
		<CarouselMovies
			movies={movies[3]}
			title="Terror  {movies[3]?.totalResults ?? 'loading'} results)"
		>
			<div slot="error" let:message>
				<Alert danger>
					<span>{message}</span>
				</Alert>
			</div>
		</CarouselMovies>
	{/if}
	{#if act === 'comedy'}
		<CarouselMovies
			movies={movies[4]}
			title="Comedy  {movies[4]?.totalResults ?? 'loading'} results)"
		/>
		<CarouselMovies
			movies={movies[5]}
			title="Comedy  {movies[5]?.totalResults ?? 'loading'} results)"
		/>
	{/if}
</div>

<style>
	.content {
		padding-top: 2em;
		padding-bottom: 2em;
	}
</style>
