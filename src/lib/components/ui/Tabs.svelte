<script lang="ts" generics="T extends readonly string[] ">
	type Props = {
		tabs: T;
		active: (typeof tabs)[number];
		onchange?: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
	};

	let { tabs, active = $bindable(tabs[0]), onchange }: Props = $props();

	const updateActiveTab = (e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => {
		const target = e.currentTarget;
		const tab = target?.dataset?.tab;
		active = tab ?? active;

		onchange?.(e);
	};
</script>

<div>
	{#each tabs as tab}
		<button data-tab={tab} onclick={updateActiveTab} class:active={active === tab}>{tab}</button>
	{/each}
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 1em;
		gap: 0.5em;
	}

	button {
		background-color: transparent;
		border-color: transparent;
		font-weight: bold;
		padding-block: 0.3em;
		padding-inline: 0.5em;
		border-radius: 5px;
		opacity: 0.5;
		cursor: pointer;
	}

	.active {
		opacity: 1;
		background-color: var(--c-front);
		color: white;
	}
</style>
