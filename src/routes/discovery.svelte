<!-- <script context="module">
	export const prerender = true;
	export async function load({ fetch }) {
		const reqs = [
			fetch('/api?s=saw').then((r) => {
				return r.json();
			}),
			fetch('/api?s=blood').then((r) => {
				return r.json();
			}),
			fetch('/api?s=horror').then((r) => {
				return r.json();
			}),
			fetch('/api?s=horror&page=2').then((r) => {
				return r.json();
			}),
			fetch('/api?s=comedy').then((r) => {
				return r.json();
			}),
			fetch('/api?s=comedy&page=2').then((r) => {
				return r.json();
			})
		];

		const res = await Promise.all(reqs);
		const data = res.map((e) => (e.message ? new Error(e.message) : e));

		return {
			props: {
				movies: data
			}
		};
	}
</script> -->
<script>
	import CarouselMovies from '$components/ui/CarouselMovies.svelte';

	import NavbarTop from '$components/ui/NavbarTop.svelte';
	import Toast from '$lib/components/ui/toast.svelte';
	import { onMount } from 'svelte';

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
	// export let movies;
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
		<!-- content here -->
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
		<!-- content here -->
		<CarouselMovies
			movies={movies[2]}
			title="Terror  {movies[2]?.totalResults ?? 'loading'} results)"
		/>
		<CarouselMovies
			movies={movies[3]}
			title="Terror  {movies[3]?.totalResults ?? 'loading'} results)"
		>
			<div slot="error" let:message>
				<Toast danger>
					<span>{message}</span>
				</Toast>
			</div>
		</CarouselMovies>
	{/if}
	{#if act === 'comedy'}
		<!-- content here -->
		<CarouselMovies
			movies={movies[4]}
			title="Comedy  {movies[4]?.totalResults ?? 'loading'} results)"
		/>
		<CarouselMovies
			movies={movies[5]}
			title="Comedy  {movies[5]?.totalResults ?? 'loading'} results)"
		/>
	{/if}
	<!-- <CarouselMovies movies={stuff.fast} title="top releases"  /> -->
</div>

<style>
	.content {
		padding-top: 2em;
		padding-bottom: 2em;
	}
</style>
