<script lang="ts">
	// import MovieItem from '$components/gridMovies/movieItem.svelte';
	import Icon from '$components/icons/icon.svelte';
	import Search from '$icons/solid/search.svg?raw';
	import SectionPage from '$components/ui/SectionPage.svelte';
	// import type { MovieResult, MoviesResponse } from '$lib/types';
	import GridCards from '$components/gridMovies/GridCards.svelte';
	import Paginator from './Paginator.svelte';
	import { onMount } from 'svelte';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();
	let arr = $state(data.movies);
	let arrSliced = $state(arr);
	let showPaginator = $state(false);
	let url: URL = $state();
	let active = $state(0);
	let preview = $state(true);
	// $: console.log(active);

	onMount(async () => {
		url = new URL(location.toString());
		const page = url.searchParams.get('page');

		if (page && +page > 1) showPaginator = false;
		else preview = false;

		if (!data.stream) {
			showPaginator = true;
			return;
		}

		await new Promise((res) => setTimeout(res, 3000));
		const rest = await data.stream.data;
		const all_ressult = rest.map((y) => y.results).flat();
		arr = { ...arr, results: [...arr.results, ...all_ressult] };

		if (page && +page > 1) {
			setPage(+page - 1);
		}
		preview = false;
		showPaginator = true;
	});

	afterNavigate(({ type, to }) => {
		if (type === 'popstate') {
			const page = to?.url.searchParams.get('page');

			if (page && +page > 0) setPage(+page - 1);
			else setPage(0);
		}
	});

	async function setPage(page: number, cb?: () => Promise<void>) {
		const curr = arr.results.slice(10 * page, 10 * (page + 1));
		arrSliced = { ...arr, results: curr };
		active = page;

		if (cb) await cb();

		// window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}
</script>

<SectionPage>
	<span><Icon>{@html Search}</Icon> page: {active + 1}</span>
	<h1>{data.movies?.search}</h1>
</SectionPage>

<Paginator {showPaginator} {active} {url} {arr} {setPage} />

<div class="content" class:opacity={preview}>
	<GridCards movies={arrSliced} full seeAll={false} />

	<Paginator {showPaginator} {active} {url} {arr} {setPage} />
</div>

<style>
	/* @media (min-width: 576px) {} */
	/* @media (min-width: 768px) {} */
	/* @media (min-width: 992px) {} */
	/* @media (min-width: 1200px) {} */
	.opacity {
		cursor: not-allowed;
		pointer-events: none;
		opacity: 0.2;
	}
</style>
