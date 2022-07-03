<script>
	import Icon from '$icons/icon.svelte';
	import CheckCircle from '$icons/solid/check-circle.svelte';

	let tablePrice = [
		{
			title: 'Bronze Packege',
			symbol: '$',
			price: 10,
			benefits: ['Unlimited Listing', 'Edit Your Listing', 'Approve Reviews']
		},
		{
			title: 'Gold Packege',
			symbol: '$',
			price: 19,
			benefits: ['Unlimited Listing', 'Edit Your Listing', 'Approve Reviews']
		},
		{
			title: 'Platinum Packege',
			symbol: '$',
			price: 49,
			benefits: [
				'Unlimited Listing',
				'Edit Your Listing',
				'Approve Reviews',
				'Take Booking Online',
				'24/7 Support Service'
			]
		}
	];
</script>

<h2 class="pricingTable-title">Find a <span>plan</span> that's right for you<span>.</span></h2>
<h3 class="pricingTable-subtitle">Every plan comes with a <span>30-day free trial</span>.</h3>
<div class="pricing">
	{#each tablePrice as card, i}
		<div class="pricing__card" class:pricing__card--recomend={i == 2}>
			<header class="pricing__header">
				<h4 class="pricing__title">
					{card.title}
				</h4>
			</header>
			<main class="pricing__main">
				<h5 class="pricing__price">
					<span class="pricing__symbol">
						{card.symbol}
					</span>
					<strong class="pricing__number">
						{card.price}
					</strong>
					/month
				</h5>
				<ul class="pricing__benefits">
					{#each card.benefits as item}
						<li class="pricing__listItem">
							<Icon style="color: #42936a;"><CheckCircle /></Icon>
							{item}
						</li>
					{/each}
				</ul>
			</main>
			<footer class="pricing__footer">
				<button class="pricing__btn">Get Start Now</button>
			</footer>
		</div>
	{/each}
</div>

<style>
	.pricing {
		margin: 1em 0;
		display: flex;
		/* flex-direction: column; */
		justify-content: center;
		align-items: center;
		padding: 1em;
		gap: 2em;
		width: 100%;
		flex-grow: 1;
		flex-shrink: 0;
		flex-basis: 100%;
		flex-wrap: wrap;
		/* flex: 0 1 100%; */
		/* color: #42936a; */
	}

	h2 {
		/* width: 100%; */
		text-align: center;
		font-size: 3rem;
		letter-spacing: -4px;
	}
	h3 {
		text-align: center;
		background-color: var(--c-divider);
		padding: 0.5em 1em;
		/* display: inline-block; */
		border-radius: 50vh;
		margin: 0 auto;
	}

	h2 > span,
	h3 > span {
		color: var(--c-front);
	}

	.pricing__card {
		/* background-color: var(--c-divider); */
		/* padding: 0.5em; */
		/* width: 90%; */
		max-width: 250px;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
		border-radius: 10px;
		box-shadow: var(--shadow-long);
		border: 1px solid var(--c-divider);
		overflow: hidden;

		transition: transform 0.2s ease-in-out;
		/* flex: 0 0 100%; */
	}

	.pricing__card:hover {
		transform: scale(1.05);
	}

	.pricing__card--recomend {
		border: 1px solid #42936a;
	}

	.pricing__card--recomend:hover {
		border: 1px solid #3ad588;
	}

	.pricing__card--recomend:hover .pricing__btn {
		/* color: white; */
		background-color: #3ad588;
	}
	.pricing__card--recomend .pricing__btn {
		color: white;
		background-color: #42936a;
	}

	.pricing__header {
		width: 100%;
	}
	.pricing__header,
	.pricing__main,
	.pricing__footer {
		width: 100%;
		/* border: 1px solid var(--c-main); */
		/* padding: 0.5em 0; */
	}
	/* .pricing__header, */
	.pricing__main,
	.pricing__footer {
		/* flex: 0 0 50%; */
		/* width: 100%; */
		/* display: inline-block; */
	}
	.pricing__main {
		/* background-color: var(--c-divider); */
		padding-bottom: 1em;
	}

	.pricing__title {
		font-size: 1.5rem;
		font-weight: bold;
		margin: 0.5em 0;
	}
	.pricing__price {
		font-size: 1.5rem;
		font-weight: lighter;
		margin: 0.5em 0;
	}
	.pricing__symbol {
		font-style: oblique;
	}

	.pricing__benefits {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.pricing__listItem {
		padding-bottom: 0.5em;
	}

	.pricing__footer {
		/* padding-top: 1em; */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pricing__btn {
		width: 100%;
		padding: 1em;
		margin: 0;
		background-color: var(--c-divider);
		border: 0px solid transparent;
		color: inherit;

		/* padding-bottom: 0.5em; */
	}

	/* @media (min-width: 576px) {}
	@media (min-width: 768px) {}
	@media (min-width: 992px) {}
	@media (min-width: 1200px) {} */

	@media (min-width: 768px) {
		.pricing {
			flex-direction: row;
		}

		.pricing__main,
		.pricing__footer {
			/* flex: 0 1 100%; */
		}
	}
</style>
