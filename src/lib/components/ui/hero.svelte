<script>
	import { imgs } from '$lib/imgs';
	import { quintInOut, elasticInOut, cubicInOut } from 'svelte/easing';
	import { fade, scale, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let words = [
		{ word: 'Movies', imgs: imgs.movie },
		{ word: 'Series', imgs: imgs.serie },
		{ word: 'Animations', imgs: imgs.anim },
		{ word: 'All', imgs: imgs.serie }
	];
	export let frequency = 3000;

	let urls = words[0].imgs;
	let word = words[0].word;
	let currentPage = 1;
	let i = 1;
	let interval;

	function play() {
		if (i > words.length) i = 1;
		else if (i < 2) i += 1;

		word = words[i - 1].word;
		urls = words[i - 1].imgs;
		currentPage = i;
		i++;
	}

	onMount(() => {
		interval = setInterval(play, frequency);
		return () => clearInterval(interval);
	});

	function setPage(pag) {
		if (interval) clearInterval(interval);
		i = pag;
		currentPage = pag;
		word = words[pag - 1].word;
		urls = words[pag - 1].imgs;

		interval = setInterval(play, frequency);
	}
</script>

<section>
	<div class="imgs-wrapper">
		<!-- {#each urls as src (src)} -->
		<img src={urls[0]} alt="hero spider man" loading="lazy" />
		<img src={urls[1]} alt="hero spider man" loading="lazy" />
		<img src={urls[2]} alt="hero spider man" loading="lazy" />
		<img src={urls[3]} alt="hero spider man" loading="lazy" />
		<!-- {/each} -->
	</div>

	<div class="copy">
		<h1>
			{#key word}
				<span in:slide out:slide|local class="firstline">{word}<span class="comma">,</span> </span>
			{/key}
			<span class="secondline">in one place.</span>
		</h1>
		<p>
			Everything you want to see, without limits or commercials, and more movies and series are
			added every week!
		</p>
		<div class="indicators">
			{#each words as _, i}
				{@const index = i + 1}
				<button class="page" on:click={() => setPage(index)} disabled={currentPage == index} />
			{/each}
		</div>
		<!-- <div class="cta-wrapper">
			<a href={'#'}
				>discovery
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
				</svg>
			</a>
		</div> -->
	</div>
</section>

<style>
	section {
		position: relative;
		/* display: flex;
		justify-content: center;
		align-items: center; */
		/* flex-wrap: wrap; */
		background-color: var(--c-front);
		margin-bottom: 3em;
		border-bottom: 2px solid var(--c-front);
	}

	section > * {
		flex-basis: calc(100% / 4);
	}

	.imgs-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 300px;
	}

	.imgs-wrapper > * {
		flex-basis: calc(100% / 4);
	}
	.imgs-wrapper::before {
		content: '';
		position: absolute;
		/* z-index: 10; */
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-image: linear-gradient(to right, var(--c-main) 0, rgba(230, 57, 70, 0.6) 300%);
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
		/* border-bottom: 1px solid var(--c-front); */
	}

	img {
		min-width: 0;
		max-width: 100%;
		height: 100%;
		/* display: block; */
		object-fit: cover;
		object-position: top;
	}

	.copy {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		/* align-items: center; */
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding: var(--gap-content);
		text-align: left;
	}

	.page {
		width: 6px;
		height: 6px;
		padding: 0;
		margin: 0 0.5em;
		opacity: 0.2;
		border-radius: 50vh;
		border: none;
		/* border: 2px solid transparent; */
	}

	.page:disabled {
		width: 12px;
		opacity: 1;
		background-color: var(--c-front);
		cursor: not-allowed;
	}

	.page:not(:disabled):hover,
	.page:not(:disabled):focus {
		/* border: 2px solid var(--c-front); */
		outline: 3px solid var(--c-front);
		outline-offset: 3px;
		cursor: pointer;
	}

	h1 {
		font-weight: bold;
		font-size: 2rem;
		margin-bottom: 0;
		overflow: hidden;
	}

	p {
		opacity: 0.5;
	}

	.firstline {
		display: block;
		color: var(--c-front);
		/* text-transform: uppercase; */
	}
	.comma {
		color: white;
	}

	.secondline {
		/* font-weight: lighter; */
		display: block;
	}
	.cta-wrapper {
		margin: 0 auto;
	}

	a {
		/* background-color: var(--c-front); */
		color: var(--c-front);
		font-weight: lighter;
		padding: 0;
		text-decoration: none;
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		padding: 0.2em 0.8em;
		border-radius: 50vh;
	}

	a:hover {
		/* text-decoration: underline;
		background-color: var(--c-front); */
		color: white;
	}

	svg {
		width: 1rem;
		height: 1rem;
	}

	.indicators {
		margin: 0 auto;
	}
</style>
