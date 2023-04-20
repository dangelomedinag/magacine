<script>
	import { imgs } from '$lib/imgs';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import SectionPage from './SectionPage.svelte';

	export let words = [
		{ word: 'Movies', imgs: imgs.movie },
		{ word: 'Series', imgs: imgs.serie },
		{ word: 'Animations', imgs: imgs.anim },
		{ word: 'All', imgs: imgs.serie }
	];
	export let copy = 'in one place.';
	export let paragraph =
		'Everything you want to see, without limits or commercials, and more movies and series are added every week!';
	export let frequency = 3000;

	let urls = words[0].imgs;
	let word = words[0].word;
	let currentPage = 1;
	let i = 1;
	let interval;

	function play() {
		// if (Boolean(words.length)) {
		// 	return () => clearInterval(interval);
		// }
		if (words.length <= 1) {
			return () => clearInterval(interval);
		}

		if (i > words.length) i = 1;
		else if (i < 2) i += 1;

		word = words[i - 1].word;
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

		interval = setInterval(play, frequency);
	}
</script>

<SectionPage>
	<svelte:fragment slot="background">
		<div class="imgs-wrapper">
			<img loading="lazy" src={urls[0]} alt="hero spider man" />
			<img loading="lazy" src={urls[1]} alt="hero spider man" />
			<img loading="lazy" src={urls[2]} alt="hero spider man" />
			<img loading="lazy" src={urls[3]} alt="hero spider man" />
		</div>
	</svelte:fragment>

	<h1>
		{#key word}
			<span in:slide out:slide|local class="firstline">{word}<span class="comma">,</span> </span>
		{/key}
		<span class="secondline">{copy}</span>
	</h1>
	<p>
		{paragraph}
	</p>
	<div class="indicators">
		{#each words as _, i}
			{@const index = i + 1}
			<button
				title="page indicator"
				class="page"
				on:click={() => setPage(index)}
				disabled={currentPage == index}
			/>
		{/each}
	</div>
</SectionPage>

<style>
	/* section {
		position: relative;
	}

	section > * {
		flex-basis: calc(100% / 4);
	} */

	.imgs-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: none;
	}

	.imgs-wrapper > * {
		flex-basis: 100%;
	}
	/* .imgs-wrapper::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-image: linear-gradient(to right, rgba(230, 57, 70, 0.2) 0, transparent 100%);
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
	} */

	img {
		min-width: 0;
		max-width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
		opacity: 0.05;
	}

	.copy {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		text-align: left;
		/* padding: var(--gap-content); */
	}

	.page {
		width: 6px;
		height: 6px;
		padding: 0;
		margin: 0 0.5em;
		border-radius: 50vh;
		border: none;
		background-color: var(--c-divider);
	}

	.page:disabled {
		width: 12px;
		opacity: 1;
		background-color: var(--c-front);
		cursor: not-allowed;
	}

	.page:not(:disabled):hover,
	.page:not(:disabled):focus {
		outline: 3px solid var(--c-front);
		outline-offset: 3px;
		cursor: pointer;
	}

	.firstline {
		font-weight: bold;
		display: block;
		color: var(--c-front);
	}
	.comma {
		color: var(--c-text-base);
	}

	.secondline {
		font-weight: lighter;
		display: block;
	}

	.indicators {
		/* margin: 0 auto; */
		/* padding-bottom: 1em; */
	}
</style>
