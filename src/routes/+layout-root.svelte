<script>
	import { navigating } from '$app/stores';
	import NProgress from 'nprogress';

	// NProgress css
	NProgress.configure({
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<slot />
