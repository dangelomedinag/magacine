<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import type { SubmitFunction } from '@sveltejs/kit';
	import { createEventDispatcher, tick } from 'svelte';
	import Alert from '$components/ui/alert.svelte';
	import { enhance } from '$app/forms';
	import Spinner from '$components/ui/spinner.svelte';
	import type { ActionData } from '../../../routes/(auth)/login/$types';
	const dispatch = createEventDispatcher();
	interface Props {
		form?: ActionData;
		loading?: boolean;
		handlerSubmit?: SubmitFunction;
	}

	let {
		form = $bindable(null),
		loading = $bindable(false),
		handlerSubmit = () => {
			loading = true;
			return async (complete) => {
				if (complete.result.type === 'failure') {
					//@ts-ignore
					form = complete.result.data;
				}
				loading = false;
				dispatch('result', complete);
			};
		}
	}: Props = $props();
	let element = $state<HTMLFormElement>();
	const completeInputs = ({ invalid }: { invalid: boolean }) => {
		if (element) {
			element.username.value = invalid ? 'invalid' : 'magacineuser';
			element.password.value = 'superpassword';
		}
	};
</script>

<form
	bind:this={element}
	action="/login"
	id="form_login"
	method="post"
	class="form"
	use:enhance={handlerSubmit}
>
	{#if loading}
		<div class="loading">
			<Spinner size="8em" />
		</div>
	{/if}
	<div class:error={form?.username}>
		<label for="username">username:</label>
		<input
			class="input"
			type="text"
			name="username"
			id="username"
			placeholder="any word"
			autocomplete="off"
			minlength="3"
			required
			disabled={loading}
			oninput={(e) => {
				if (form?.username) {
					if (form.username !== e.currentTarget.value) {
						form.username = '';
						form.password = '';
					}
					if (!form.username && !form.password) form = null;
				}
			}}
		/>
	</div>
	<div class:error={form?.password}>
		<label for="password">password:</label>
		<input
			class="input"
			type="password"
			name="password"
			id="password"
			placeholder="superpassword"
			required
			minlength="3"
			disabled={loading}
			oninput={(e) => {
				if (form?.password) {
					if (form.password !== e.currentTarget.value) form.password = '';
					if (!form.username && !form.password) form = null;
				}
			}}
		/>
	</div>
	<input
		class="input submit"
		type="submit"
		value={loading ? 'await please...' : 'inicar session'}
		disabled={loading}
	/>
	{#if form?.errors}
		<Alert
			warn
			close
			onclose={() => {
				//@ts-ignore
				form = undefined;
				console.log('ljdshjkh');
			}}><span>Message:</span> {form?.errors}</Alert
		>
	{/if}
</form>
<div class="actions">
	<label for="remember" class="link"
		><input id="remember" type="checkbox" checked disabled={loading} /> Remember me
	</label>
	<a
		href={'#'}
		onclick={(e) => {
			e.preventDefault();
			completeInputs({ invalid: true });
		}}
		class="link">Need help?</a
	>
</div>

<!-- </div> -->

<style>
	.loading {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.form {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.8em;
		width: 100%;
	}

	.input {
		font-size: 1em;
		display: block;
		width: 100%;
		padding: 0.8em;
		border-width: 1px;
		border-color: transparent;
		background-color: rgba(128, 128, 128, 0.15);
		border-radius: 5px;
	}

	.error .input {
		border-color: #d42525;
		background-color: rgba(255, 0, 0, 0.05);
	}
	.error .input:focus {
		outline-color: #d42525;
	}
	.error label {
		color: #d42525;
		opacity: 1;
	}

	label {
		accent-color: var(--c-front);
		display: block;
		text-align: left;
		font-size: 0.8rem;
		margin-bottom: 0.2em;
	}

	.submit {
		background-color: var(--c-front);
		font-weight: bold;
		color: white;
	}
	.input:focus {
		outline-color: grey;
		outline-width: 1px;
		outline-style: dashed;
	}

	.submit:disabled,
	.form:invalid > .submit {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: grey;
	}

	.form:not(:invalid) .submit:not(:disabled):hover {
		background-color: var(--c-front-dark);
	}

	.actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1em;
	}

	.link {
		font-size: 0.9em;
		text-decoration: none;
		color: var(--c-text-base);
	}

	.link:hover {
		color: var(--c-front);
	}
</style>
