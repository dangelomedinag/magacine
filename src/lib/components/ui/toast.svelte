<script>
	export let success = false,
		warn = false,
		danger = false;
</script>

<div
	class="toast"
	class:toast--warn={warn}
	class:toast--danger={danger}
	class:toast--success={success}
>
	<div class="toast__icon">
		{#if success}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
			</svg>
		{:else if warn}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
		{:else if danger}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
				/>
			</svg>
		{/if}
	</div>
	<span class="toast__message">
		<slot />
	</span>
</div>

<style>
	.toast {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1em;
		padding: 0.5em;
		text-align: center;
		color: rgb(196, 196, 196);
		border: 1px solid grey;
		border-radius: 5px;
		background-color: transparent;
		font-weight: lighter;
	}

	.toast--success {
		color: rgb(123, 190, 148);
		border: 1px solid rgb(0, 70, 35);
		background-color: rgb(0, 49, 22);
	}
	.toast--warn {
		color: rgb(190, 190, 123);
		border: 1px solid rgb(70, 70, 0);
		background-color: rgb(49, 49, 0);
	}

	.toast--danger {
		color: rgb(190, 123, 123);
		border: 1px solid rgb(70, 0, 0);
		background-color: rgb(49, 0, 0);
	}

	.toast__icon {
		display: flex;
		justify-content: center;
		align-items: center;
		/* padding: 0.8em; */
		/* background-color: rgb(67, 33, 33); */
	}

	.toast__message {
		/* padding: 1em 0; */
	}

	.toast__message :global(span) {
		font-weight: bold;
	}

	svg {
		width: 1.5rem;
		height: 1.5rem;
	}
</style>
