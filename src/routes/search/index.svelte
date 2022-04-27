<script>
	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';

	import SearchMovies from '$lib/components/ui/searchMovies.svelte';
	import Toast from '$lib/components/ui/toast.svelte';
	import { page } from '$app/stores';
	let results = [];
	let value;
</script>

<SearchMovies bind:results bind:value>
	<CarouselMovies movies={results} title={value} priority="small" />

	<div slot="suggest" class="content">
		<Toast warn>
			Opps! parece que no se encontraron resultados para <span>"{value}"</span>
		</Toast>
		<div>
			<CarouselMovies movies={$page.stuff.shrek} title="sugesst" priority="small" />
		</div>
	</div>
</SearchMovies>
