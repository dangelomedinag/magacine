<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { quintInOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	/* script here */
</script>

<div class="video">
	<div class="video__container">
		<video
			onended={bubble('ended')}
			in:scale|global={{ start: 0.9 }}
			class="video__player"
			src="/video/countdown.mp4"
			controls
		>
			<track kind="captions" />
		</video>
	</div>
</div>

<style>
	.video {
		/* background-color: black; */
	}

	.video__container {
		max-width: 800px;
		width: 100%;
		margin: 0 auto;
		padding: 2em 0;
	}

	.video__player {
		/* display: block; */
		width: 100%;
	}
</style>
