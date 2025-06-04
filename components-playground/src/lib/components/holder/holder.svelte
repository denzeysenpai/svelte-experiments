<script lang="ts">
	import type { HolderClass } from '$lib/states/card-and-holder.svelte';
	import { holder_objects, User } from '$lib/states/user.svelte';
	import { onMount } from 'svelte';
	import Card from '../card/card.svelte';

	// let title: string = $state('Unnamed Set');
	type prop = {
		obj: HolderClass;
	};
	let { obj }: prop = $props();

	onMount(() => {
		document.addEventListener('mouseup', () => {
			if (User.holding) {
				User.DropCard();
				User.hasCancelled();
			}
		});
	});

	let validHover: boolean = $state(false);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore event_directive_deprecated -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div
	class="holder {validHover ? 'hovered' : ''}"
	on:mouseup={() => {
		if (obj.isActive && User.isHoldingACard && User.holding) {
			console.log(User.holding.title + ' moved to ' + obj.title);
			obj.cards.push(User.holding);
			User.holding.MoveToNewHolder(obj.id);
			User.DropCard();
			obj.Passive();
		}
	}}
	on:mousedown={() => {
		if (User.isHoldingACard) {
			holder_objects.forEach((holder) => {
				holder.cards = holder.cards.filter((card) => card != User.holding);
			});
			User.cancelFunc = () => {
				if (User.holding) obj.cards.push(User.holding);
			};
		}
	}}
	on:mouseover={() => {
		holder_objects.forEach((holder) => {
			if (User.holding) {
				validHover = true;
				if (!holder.cards.includes(User.holding)) User.isInsideAHolder();
				else User.leftAHolder();
			} else {
				validHover = false;
			}
		});

		obj.Active();
	}}
	on:mouseleave={() => {
		obj.Passive();
		User.leftAHolder();
		validHover = false;
	}}
>
	<input type="text" bind:value={obj.title} />
	<div class="cards-container">
		{#if validHover}
			<div class="placeholder">
				<p>Push to bottom here</p>
			</div>
		{/if}
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
		padding: 20px;
		background-color: rgb(65, 75, 85);
		width: 300px;
		height: 400px;
		border: 3px solid rgb(65, 75, 85);
		border-radius: 20px;
		transition: all 0.2s ease;
		input {
			border-radius: 10px;
			padding: 10px;
			background-color: transparent;
			border: none;
			color: white;
			margin: 0 0 10px 0;
		}
		.cards-container {
			overflow-y: auto;
			background-color: rgba(3, 3, 42, 0.209);
			display: flex;
			border-radius: 8px;
			flex-direction: column;

			.placeholder {
				content: '';
				background-color: rgba(255, 255, 255, 0.245);
				margin: 10px;
				border-radius: 10px;
				padding: 20px;
				border: 6px solid rgba(255, 255, 255, 0.461);

				p {
					text-align: center;
				}
			}
		}
		&.hovered {
			border: 3px solid rgb(73, 194, 255);
			box-shadow: 0 0 10px rgb(73, 194, 255);
		}
	}
</style>
