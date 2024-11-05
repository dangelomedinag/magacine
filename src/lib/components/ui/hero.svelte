<script lang="ts">
	import { imgs } from '$lib/imgs';
	import SectionPage from './SectionPage.svelte';

	interface Props {
		word?: string;
		copy?: string;
		paragraph?: string;
		images?: any;
	}

	let {
		word = 'Movies and Series',
		copy = 'in one place.',
		paragraph = 'Everything you want to see, without limits or commercials, and more movies and series are added every week!',
		images = imgs.movie
	}: Props = $props();
</script>

<SectionPage>
	{#snippet background()}
	
			<div class="imgs-wrapper">
				{#each images as image}
					<img loading="lazy" src={image} alt="hero poster series and movies" />
				{/each}
			</div>
		
	{/snippet}

	<h1>
		<span class="firstline">{word}<span class="comma">,</span></span>
		<span class="secondline">{copy}</span>
	</h1>
	<p>
		{paragraph}
	</p>
</SectionPage>

<style>
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

	img {
		min-width: 0;
		max-width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
		opacity: 0.05;
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
</style>
