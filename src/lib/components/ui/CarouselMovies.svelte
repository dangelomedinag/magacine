<script>
	import CardMovie from './cardMovie.svelte';
	import ProgressLine from './ProgressLine.svelte';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { quintInOut, quintOut } from 'svelte/easing';
	import Spinner from './Spinner.svelte';

	export let title;
	export let movies;
	export let priority;
	// export let progress = false;
	let container;

	function prevPage(e) {
		const { steps, current } = pages();
		let prev = 0;

		for (let i = 0; i < steps.length; i++) {
			if (current <= steps[i] + 1) {
				prev = steps[i - 1];
				break;
			}
		}

		container.scrollLeft = prev;
	}
	function nextPage(e) {
		const { steps, current } = pages();

		let next = 0;

		for (let i = 0; i < steps.length; i++) {
			if (current < steps[i] - 2) {
				next = steps[i] - 2;
				break;
			}
		}

		container.scrollLeft = next;
	}
	const getExtra = (node) => {
		let extra = 0;
		let computedStyle = window.getComputedStyle(node);
		extra += parseInt(computedStyle.marginLeft, 10);
		extra += parseInt(computedStyle.marginRight, 10);
		extra += parseInt(computedStyle.borderWidth, 10);
		extra += parseInt(computedStyle.paddingLeft, 10);
		extra += parseInt(computedStyle.paddingRight, 10);
		return extra;
	};
	function pages() {
		/* ssssssssssssss */

		/* ssssssssssss */
		let margin;
		let childs = container.querySelectorAll('figure');
		let steps = [];
		let cardWidth;

		childs.forEach((card, index) => {
			cardWidth = card.getBoundingClientRect().width;
			if (index < 1) {
				margin = getExtra(card);
				steps.push(cardWidth + margin);
			}
			if (index > 0) {
				steps.push(steps[index - 1] + cardWidth + 16);
			}
		});

		return { steps, current: container.scrollLeft };
	}
</script>

<div class="carousel-wrapper priority-{priority}">
	<!-- <button on:click={prevPage} class="next">a</button> -->
	<header class="carousel-header">
		<h3 class="header-title">{title ?? ''}</h3>
		<button class="header-btn"
			>See all<span>
				<svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</span></button
		>
	</header>
	<main class="items-wrapper" bind:this={container}>
		{#each movies as movie, i (movie.imdbID)}
			<CardMovie {movie} progress={movie.progress ?? 0} {i} />
		{:else}
			<!-- <slot name="empty">
				<div class="empty-wrapper">
					<Spinner />
				</div>
			</slot> -->
		{/each}
	</main>
</div>

<style>
	/* @media (min-width: 576px) {} */
	/* @media (min-width: 768px) {} */
	/* @media (min-width: 992px) {} */
	/* @media (min-width: 1200px) {} */

	.carousel-wrapper {
		--w-card: 250px;

		padding-bottom: 2em;
		position: relative;
		/* height: 400px; */
	}

	/* .priority-small .item {
		min-width: 200px;
	}
	.priority-medium .item {
		min-width: 220px;
	}
	.priority-large .item {
		min-width: 250px;
	} */

	@media (min-width: 768px) {
		.priority-small .item {
			--w-card: 200px;
			max-height: 450px;
			/* min-width: 200px; */
		}
		.priority-medium .item {
			--w-card: 250px;
			max-height: 550px;
			/* min-width: 250px; */
		}
		.priority-large .item {
			--w-card: 350px;
			/* min-width: 350px; */
		}
	}

	.carousel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-title {
		font-size: 1.3rem;
		margin: 0;
	}

	.header-btn {
		background-color: transparent;
		margin: 0;
		border: none;
		color: gray;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.header-btn:hover {
		text-decoration: underline;
		cursor: pointer;
	}

	.header-btn svg {
		width: 20px;
		height: 20px;
	}

	.items-wrapper {
		display: flex;
		overflow-x: auto;
		padding-left: 0;
		padding-right: 1em;
		padding-top: 1em;
		padding-bottom: 1em;
		/* height: 500px; */
		scroll-behavior: smooth;
	}
	.xx {
		position: relative;
		overflow: hidden;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-width: var(--w-card);
		/* height: 100%; */
		max-width: 350px;
		max-height: 680px;
		position: relative;
		margin: 0;
		margin-right: 1em;
		/* height: 400px; */
		border: 1px solid rgba(128, 128, 128, 0.3);
	}

	.item-link {
		display: block;
		height: 100%;
		width: 100%;
		overflow: hidden;
		/* height: 200px; */
	}

	.item-poster {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.2s ease-in-out;
	}

	.description-wrapper {
		/* display: flex; */
		/* justify-content: space-between; */
		/* flex-wrap: wrap; */
		padding: 1em;
		background: rgb(0, 0, 0);
	}

	@media (min-width: 768px) {
		/* .description-wrapper {
			display: flex;
			justify-content: space-between;
		} */
	}

	.info-wrapper {
	}

	.movie-title {
		margin: 0;
		font-weight: 600;
		font-size: 1.2rem;
		margin-bottom: 0.2em;
		width: calc(var(--w-card) - 2em);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.movie-year {
		margin: 0;
		/* margin-bottom: 0.4em; */
		opacity: 0.7;
	}
	.rating-wrapper {
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;
		/* margin-bottom: 10px; */
	}
	.rating-logo {
		max-width: 28px;
	}
	.rating-label {
		font-size: 0.8em;
		margin-left: 5px;
		margin-right: 5px;
	}
	.actions-wrapper {
		display: flex;
		flex-wrap: wrap;
		/* justify-content: space-between; */
		margin-top: 0.4em;
		/* margin-top: auto; */
		/* flex-shrink: 0; */
		/* display: none; */
	}

	@media (min-width: 768px) {
		.actions-wrapper {
			/* position: absolute;
			top: 0;
			right: 0; */
			/* display: block; */
		}
	}

	.btn {
		border: none;
		border-radius: 50vh;
		margin: 0;
		padding: 0.3em;
		cursor: pointer;
		font-size: 1rem;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		margin: 0 0.2em;
	}

	.actions-watch {
		background-color: rgba(255, 0, 0, 0.4);
		color: white;
	}
	.actions-more {
		background-color: rgba(255, 255, 255, 0.5);
		color: black;
	}

	.actions-info {
		color: black;
		background-color: white;
	}
	.actions-wrapper svg {
		width: 25px;
		height: 25px;
	}

	/* sssssssss */

	.item:hover .description-wrapper {
		background: linear-gradient(transparent, rgba(255, 255, 255, 0.2));
	}

	.item:hover .item-poster {
		transform: scale(1.02);
	}

	.empty-wrapper {
		border: 1px solid rgba(128, 128, 128, 0.3);
		padding: 2em;
		width: 100%;
		text-align: center;
	}

	.hidden {
		display: none;
	}

	/* sssssssss */

	/* .controls:hover {
		opacity: 1;
		cursor: pointer;
	} */

	/* .controls {
		display: block;
		position: absolute;
		z-index: 15;
		top: 35%;
		height: 20%;
		width: 30px;
		opacity: 0.3;
		border-radius: 5px;
		border: none;
	} */

	/* .next {
		left: 0;
	} */
	/* .prev {
		right: 0;
	} */

	/* .track:hover .prev,
	.track:hover .next {
		display: initial;
	} */

	/* .carousel-wrapper header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	} */
	/* .carousel-wrapper main {
		display: flex;
		overflow-x: auto;
		padding-left: 0;
		padding-right: 1em;
		padding-top: 1em;
		padding-bottom: 1em;
		height: 300px;
		scroll-behavior: smooth;
	}

	header h3 {
		margin: 0;
	}
	header button {
		background-color: transparent;
		margin: 0;
		border: none;
		color: gray;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	header button:hover {
		text-decoration: underline;
		cursor: pointer;
	}

	header .svg {
		width: 20px;
		height: 20px;
	}

	.poster {
		width: 100%;
		object-fit: cover;
		object-position: top;
		transition: transform 0.2s ease-in-out;
	}

	figure {
		overflow: hidden;
		border-radius: 15px;
		min-width: 250px;
		position: relative;
		margin: 0;
		margin-right: 1em;
	}

	figure:hover figcaption {
		background: linear-gradient(transparent, rgba(255, 255, 255, 0.2));
	}

	figure:hover .poster {
		transform: scale(1.02);
	}

	figcaption {
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		padding: 2em;
		padding-top: 0;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
	}

	.rating {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 10px;
	}

	.info h2 {
		margin: 0;
		font-weight: 600;
		font-size: 1.3rem;
		margin-bottom: 0.2em;
	}

	.info p {
		margin: 0;
		margin-bottom: 0.6em;
		opacity: 0.7;
	}

	.rating img {
		max-width: 28px;
	}
	.rating span {
		font-size: 0.8em;
		margin-left: 5px;
		margin-right: 5px;
	}

	.actions {
		margin-top: auto;
		flex-shrink: 0;
	}

	.actions button {
		border: none;
		border-radius: 50vh;
		margin: 0;
		padding: 0.8em 1.2em;
		cursor: pointer;
	}

	.cta-btn:hover {
		background-color: rgba(255, 0, 0, 0.8);
	}

	.cta-btn {
		background-color: rgba(255, 0, 0, 0.4);
		color: white;
	}
	.more {
		background-color: rgba(255, 255, 255, 0.5);
		color: black;
	}

	.more:hover {
		background-color: white;
	} */

	/* custom scroll bars */
	.items-wrapper::-webkit-scrollbar {
		height: 5px;
		border-radius: 10px;
	}

	.items-wrapper::-webkit-scrollbar-track {
		background: rgba(128, 128, 128, 0.05);
		margin: 10px;
		border-radius: 10px;
		overflow: hidden;
	}

	.items-wrapper::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.05);
	}

	.items-wrapper::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
