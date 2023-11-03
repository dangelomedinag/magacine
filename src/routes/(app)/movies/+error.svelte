<script>
	import { page } from '$app/stores';
</script>

<div class="content wrapper">
	<div class="container">
		<div class="error">
			<span>{$page.status}</span>
			page not found
		</div>
		<div class="details">
			<h1>Hmm.</h1>
			<code>{$page.error?.message}</code>
			<p>
				It seems that the page you were trying to access is no longer available. Let us help guide
				you out and get you back home.
			</p>

			<a href="/">home</a>
		</div>
	</div>
</div>

<style>
	h1 {
		font-size: 5rem;
		font-weight: lighter;
		margin: 0;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding-top: var(--gap-content);
		padding-bottom: var(--gap-content);
		min-height: 50vh;
		max-width: 1000px;
		margin: 0 auto;
	}

	.error {
		width: 230px;
		height: 230px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: var(--c-main);
		/* padding: 0.5em; */
		opacity: 0.7;
		border-radius: 50vh;
	}

	.error span {
		font-weight: lighter;
		color: var(--c-front);
		/* font-size: 1.5rem; */
		font-size: 5rem;
		text-align: center;
	}

	a {
		padding: 0;
		color: deepskyblue;
	}

	/* @media (min-width: 576px) {} */
	@media (min-width: 768px) {
		.container {
			flex-direction: row;
		}

		.details {
			width: 60%;
		}
	}
	/* @media (min-width: 992px) {} */
	/* @media (min-width: 1200px) {} */
</style>
