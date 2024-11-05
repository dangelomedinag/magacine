<script lang="ts">
	// import { run } from 'svelte/legacy';

	import GridCards from '$components/gridMovies/GridCards.svelte';
	import SectionPage from '$components/ui/SectionPage.svelte';
	// icons
	import Icon from '$components/icons/icon.svelte';
	import Film from '$components/icons/solid/film.svg?raw';
	import Tabs from '$components/ui/Tabs.svelte';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();

	let tabs = ['week', 'month', 'year'] as const;
	let active: (typeof tabs)[number] = $state('week');
	let movies = $state(data.movies);
	$effect(() => {
		if (active) movies = { ...data.movies, results: data.movies.results?.reverse() };
	});
</script>

<SectionPage>
	<span><Icon>{@html Film}</Icon>this {active}</span>
	<h1>Next Releases</h1>
	<Tabs {tabs} bind:active></Tabs>
</SectionPage>

<div class="content">
	<GridCards {movies} />
</div>
