<script lang="ts">
	import type { HolderClass } from '$lib/states/card-and-holder.svelte';
	import { holder_objects, User } from '$lib/states/user.svelte';
	import Card from '../card/card.svelte';

	// let title: string = $state('Unnamed Set');
	type prop = {
		obj: HolderClass;
	};
	let { obj }: prop = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore event_directive_deprecated -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div
	class="holder"
	on:mouseup={() => {
		if (obj.isActive && User.isHoldingSomething && User.holding) {
			console.log(User.holding.title + ' moved to ' + obj.title);
			obj.cards.push(User.holding);
			User.holding.MoveToNewHolder(obj.id);
			User.DropCard();
			obj.Passive();
		}
	}}
	on:mousedown={() => {
		if (User.isHoldingSomething) {
			holder_objects.forEach((holder) => {
				holder.cards = holder.cards.filter((card) => card != User.holding);
			});
		}
	}}
	on:mouseover={() => {
		obj.Active();
	}}
	on:mouseleave={() => {
		obj.Passive();
	}}
>
	<input type="text" bind:value={obj.title} />
	<div class="cards-container">
		{#if obj.cards}
			{#each obj.cards as card}
				<Card
					title={card.title}
					description={card.description}
					id={card.id}
					status={card.status}
					handler={() => {
						User.HoldCard(card);
					}}
				></Card>
			{/each}
		{/if}
	</div>
</div>

<style>
	.holder {
		display: flex;
		flex-direction: column;
		padding: 10px;
		background-color: rgb(65, 75, 85);
		width: 300px;
		height: fit-content;
		.cards-container {
			background-color: rgb(50, 50, 50);
			display: flex;
			flex-direction: column;
		}
	}
</style>
