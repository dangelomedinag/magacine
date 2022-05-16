<script>
	import { page } from '$app/stores';

	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import Hero from '$lib/components/ui/hero.svelte';
	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';

	export let movies;
	let act = 'series';

	const setTab = (tab) => (act = tab);
</script>

<NavbarTop />

<div class="content">
	<h1>Community</h1>
	<p>
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt voluptate accusantium
		expedita fugit ea voluptates vel veritatis modi assumenda facilis, sint necessitatibus quia nam
		temporibus esse id dicta consequuntur est!
	</p>
</div>
