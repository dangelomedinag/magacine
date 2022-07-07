<script>
	import Modal from '$components/ui/movie/modal.svelte';
	import Icon from '$icons/icon.svelte';
	import UserCircle from '$icons/solid/user-circle.svelte';
	import Logout from '$icons/solid/logout.svelte';
	import SessionModal from './navbar/sessionModal.svelte';
	export let ModalRef;

	// export let ModalRef
</script>

<Modal bind:this={ModalRef} Zindex="110" btnClose={false}>
	<svelte:fragment slot="header">
		Session <Icon y="10%"><UserCircle /></Icon>
	</svelte:fragment>
	<SessionModal />
	<svelte:fragment slot="action">
		<a class="list__logout" href="/auth/logout">logout <Icon><Logout /></Icon></a>
		<button href="/auth/logout" on:click={ModalRef.close} class="cta">close</button>
	</svelte:fragment>
</Modal>
