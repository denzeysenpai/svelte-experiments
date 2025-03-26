<script lang="ts">
	import { User } from '$lib/states/user.svelte';

	type prop = {
		id: string;
		title: string;
		description: string;
		status: string;
		handler: any;
	};
	let { id, title, description, status, handler }: prop = $props();
	let current = $state('');
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="card" onmousedown={handler}>
	<h2>{title}</h2>
	<p>{description}</p>
</div>

<style>
	.card {
		background-color: rgb(65, 75, 85);
		margin: 10px;
		border: 1px solid gray;
		padding: 10px;
		min-width: 300px;
		* {
			user-select: none;
		}
	}
</style>
