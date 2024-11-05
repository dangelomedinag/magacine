<script lang="ts">
	import { run } from 'svelte/legacy';

	import GridCards from '$components/gridMovies/GridCards.svelte';
	import SectionPage from '$components/ui/SectionPage.svelte';
	// icons
	import Icon from '$components/icons/icon.svelte';
	import Film from '$components/icons/solid/film.svg?raw';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();

	type Tab = 'week' | 'month' | 'year';
	type ButtonMouseEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

	let tabs: Tab[] = ['week', 'month', 'year'];
	let active: Tab | string = $state('week');
	const updateActiveTab = (e: ButtonMouseEvent) => {
		console.log('dasdas');
		const target = e.currentTarget;
		const tab = target?.dataset?.tab;
		active = tab ?? active;
	};

	let movies = $state(data.movies);
	run(() => {
		if (active) movies = { ...data.movies, results: data.movies.results.reverse() };
	});
</script>

<SectionPage>
	<span><Icon>{@html Film}</Icon>this {active}</span>
	<h1>Next Releases</h1>
	<div class="tabs">
		{#each tabs as element}
			<button data-tab={element} class:active={active === element} onclick={updateActiveTab}
				>{element}</button
			>
		{/each}
	</div>
</SectionPage>

<div class="content">
	<GridCards {movies} />
</div>
