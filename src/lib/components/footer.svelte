<div class="footer content">
	<div class="footer__addr">
		<h1 class="footer__logo">magacine</h1>

		<h2>Contact</h2>

		<address>
			World Wide & Chile, Santiago
			<br />
			<a class="footer__btn" href="mailto:dangelomedinag@gmail.com">Email Us</a>
		</address>
	</div>

	<ul class="footer__nav">
		<li class="nav__item">
			<h2 class="nav__title">Movies and Series</h2>

			<ul class="nav__ul">
				<li>
					<a href={'#'}>Online</a>
				</li>

				<li>
					<a href={'#'}>Print</a>
				</li>

				<li>
					<a href={'#'}>Alternative Ads</a>
				</li>
			</ul>
		</li>

		<li class="nav__item">
			<h2 class="nav__title">FAQs</h2>

			<ul class="nav__ul">
				<li>
					<a href={'#'}>Hardware Design</a>
				</li>

				<li>
					<a href={'#'}>Software Design</a>
				</li>

				<li>
					<a href={'#'}>Digital Signage</a>
				</li>

				<li>
					<a href={'#'}>Automation</a>
				</li>
			</ul>
		</li>

		<li class="nav__item">
			<h2 class="nav__title">Legal</h2>

			<ul class="nav__ul">
				<li>
					<a href={'#'}>Privacy Policy</a>
				</li>

				<li>
					<a href={'#'}>Terms of Use</a>
				</li>

				<li>
					<a href={'#'}>Sitemap</a>
				</li>
			</ul>
		</li>
	</ul>

	<div class="legal">
		<p>&copy; 2019 Magacine Inc. All rights reserved.</p>

		<div class="legal__links">
			<span>Made with <span class="heart">♥</span> remotely for Dangelo Medina</span>
		</div>
	</div>
</div>

<style>
	.footer {
		/* margin-top: 2em; */
		padding-bottom: 2em;
		/* display: flex; */
		/* flex-flow: row wrap; */
		/* background-color: var(--c-main); */
		border-top: 1px solid rgba(230, 230, 230, 0.2);
	}

	.footer > * {
		flex: 1 100%;
	}

	.footer__logo {
		font-weight: 400;
		text-transform: lowercase;
		font-size: 1.5rem;
		color: var(--c-front);
	}

	.footer__addr h2 {
		/* margin-top: 1.3em; */
		font-size: 15px;
		font-weight: 400;
	}

	.nav__title {
		font-weight: 400;
		font-size: 15px;
	}

	.footer__btn {
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: max-content;
		color: var(--c-front);
		border-left: 1px solid var(--c-front);
	}

	.footer ul {
		list-style: none;
		padding-left: 0;
	}

	.footer li {
		line-height: 2em;
	}

	a {
		text-decoration: none;
	}

	.footer__nav {
		display: flex;
		flex-flow: row wrap;
	}

	.footer__nav > * {
		flex: 1 50%;
		margin-right: 1.25em;
	}

	a {
		display: block;
		color: inherit;
		opacity: 0.5;
		border-left: 1px solid transparent;
	}
	a:hover {
		opacity: 1;
		color: var(--c-front);
		/* border-left: 1px solid var(--c-front); */
	}

	.legal {
		display: flex;
		flex-wrap: wrap;
		color: #999;
	}

	.legal__links {
		display: flex;
		align-items: center;
	}

	.heart {
		color: #2f2f2f;
	}

	@media (min-width: 768px) {
		.footer__nav > * {
			flex: 1;
		}

		.footer__addr {
			flex: 1 0px;
		}

		.footer__nav {
			flex: 2 0px;
		}
	}

	@media screen and (min-width: 992px) {
		.legal .legal__links {
			margin-left: auto;
		}
	}

	/* @media (min-width: 576px) {} */
	/* @media (min-width: 768px) {} */
	/* @media (min-width: 992px) {} */
	/* @media (min-width: 1200px) {} */
</style>
