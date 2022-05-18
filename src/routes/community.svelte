<script>
	import { page } from '$app/stores';

	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';

	// export let movies;
	// let act = 'series';
	let input;
	let autocomplete = [];
	let suggestions = false;
	let movies = { results: [], totalResults: 0 };

	function showSuggestions() {
		const value = input.value.trim();
		if (value.length < 1) autocomplete = [];

		if (value.length >= 1 && value.length <= 3)
			autocomplete = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8'];
		else if (value.length >= 4 && value.length <= 6)
			autocomplete = ['asjdas', 'lkdask', 'dalsdkas'];
		else if (value.length >= 7 && value.length <= 8)
			autocomplete = ['lkdask', 'item1', 'item2', 'item3'];
	}

	const setTab = (tab) => (act = tab);
</script>

<NavbarTop />

<div class="content">
	<div class="search-container">
		<div class="search-box">
			<input
				bind:this={input}
				type="search"
				name="mysearch"
				id="mysearch"
				on:focus={() => {}}
				on:blur={() => {}}
				on:input={showSuggestions}
				autocomplete="off"
			/>
			<button>x</button>
		</div>
		<div class="autocomplete-container">
			{#each autocomplete as item}
				<button class="item">{item}</button>
			{:else}
				<!--  -->
			{/each}
		</div>
	</div>
	<CarouselMovies
		details={false}
		movies={$page.stuff.suggest}
		title="Top rated ({$page.stuff.suggest.totalResults} results)"
		priority="small"
	/>
</div>

<style>
	.content {
		margin-top: 1em;
		height: 600px;
	}

	.search-container {
		position: relative;
		/* display: flex; */
		/* height: 50px; */
		/* outline: 1px solid red; */
	}

	.search-box {
		display: flex;
	}

	#mysearch {
		color: white;
		font-size: 2rem;
		font-weight: bold;
		display: block;
		height: 100%;
		width: 100%;
		background-color: transparent;
		border: none;
		/* outline: none; */
	}

	.autocomplete-container {
		position: absolute;
		background-color: burlywood;
		display: block;
		z-index: 50;
		bottom: 0;
		transform: translateY(100%);
	}

	.item {
		outline: 1px solid red;
		display: block;
	}
</style>
