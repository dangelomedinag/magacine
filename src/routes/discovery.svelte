<script context="module">
	export async function load({ fetch }) {
		const reqs = [
			fetch('/api?s=saw').then((r) => r.json()),
			fetch('/api?s=blood').then((r) => r.json()),
			fetch('/api?s=horror').then((r) => r.json()),
			fetch('/api?s=horror&page=2').then((r) => r.json()),
			fetch('/api?s=comedy').then((r) => r.json()),
			fetch('/api?s=comedy&page=2').then((r) => r.json())
		];

		const data = await Promise.all(reqs).catch((err) => {
			return { status: data.status, error: new Error(err.message) };
		});
		// console.log(data);

		// const json = await data.json();

		return {
			props: {
				movies: data
			}
		};
	}
</script>

<script>
	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';

	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';
	export let movies;
	let act = 'suspense';

	const setTab = (tab) => (act = tab);
</script>

<NavbarTop>
	<button on:click={() => setTab('suspense')} class:active={act === 'suspense'}>Suspense</button>
	<button on:click={() => setTab('terror')} class:active={act === 'terror'}>Terror</button>
	<button on:click={() => setTab('comedy')} class:active={act === 'comedy'}>Comedy</button>
</NavbarTop>

<div class="content">
	{#if act === 'suspense'}
		<!-- content here -->
		<CarouselMovies
			movies={movies[0]}
			title="Suspense  ({movies[0].totalResults} results)"
			priority="small"
		/>
		<CarouselMovies
			movies={movies[1]}
			title="Suspense  ({movies[1].totalResults} results)"
			priority="small"
		/>
	{/if}
	{#if act === 'terror'}
		<!-- content here -->
		<CarouselMovies
			movies={movies[2]}
			title="Terror  ({movies[2].totalResults} results)"
			priority="small"
		/>
		<CarouselMovies
			movies={movies[3]}
			title="Terror  ({movies[3].totalResults} results)"
			priority="small"
		/>
	{/if}
	{#if act === 'comedy'}
		<!-- content here -->
		<CarouselMovies
			movies={movies[4]}
			title="Comedy  ({movies[4].totalResults} results)"
			priority="small"
		/>
		<CarouselMovies
			movies={movies[5]}
			title="Comedy  ({movies[5].totalResults} results)"
			priority="small"
		/>
	{/if}
	<!-- <CarouselMovies movies={stuff.fast} title="top releases" priority="small" /> -->
</div>

<style>
	.content {
		padding-top: 2em;
		padding-bottom: 2em;
	}
</style>
