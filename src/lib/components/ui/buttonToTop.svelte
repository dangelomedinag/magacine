<button on:click
	><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
		<path
			fill-rule="evenodd"
			d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
			clip-rule="evenodd"
		/>
	</svg></button
>

<style>
	button {
		position: fixed;
		bottom: 5%;
		right: 5%;
		z-index: 110;
		border-radius: 50vh;
		width: 50px;
		height: 50px;
		background-color: var(--c-front);
		/* opacity: 0.5; */
		color: white;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		box-shadow: 5px 5px 30px -5px black;
	}

	button:hover {
		opacity: 1;
		background-color: var(--c-front-dark);
	}

	button:active {
		transform: translateY(5%);
	}

	button svg {
		height: 25px;
		width: 25px;
	}
</style>
