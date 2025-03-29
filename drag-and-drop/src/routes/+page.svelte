<script lang="ts">
	// import Card from '$lib/components/card/card.svelte';
	import Holder from '$lib/components/holder/holder.svelte';
	import { CardClass, HolderClass } from '$lib/states/card-and-holder.svelte';
	import { holder_objects, User } from '$lib/states/user.svelte';
	import { onMount } from 'svelte';
	import Card from '$lib/components/card/card.svelte';
	// const card = new Card();
	const sample_cards_data = [
		{
			setId: 'SET2000',
			taskId: 'TK00001',
			title: 'Brew Coffee',
			description: 'Make some coffee at 4 AM',
			status: 'ACTIVE'
		},
		{
			setId: 'SET2001',
			taskId: 'TK00002',
			title: 'Morning Jog',
			description: 'Go for a 30-minute run in the park',
			status: 'COMPLETED'
		},
		{
			setId: 'SET2001',
			taskId: 'TK00003',
			title: 'Read a Book',
			description: 'Finish reading the last two chapters of the novel',
			status: 'ACTIVE'
		},
		{
			setId: 'SET2001',
			taskId: 'TK00004',
			title: 'Write Report',
			description: 'Prepare and submit the weekly project report',
			status: 'ARCHIVED'
		},
		{
			setId: 'SET2002',
			taskId: 'TK00005',
			title: 'Grocery Shopping',
			description: 'Buy fruits, vegetables, and snacks',
			status: 'ACTIVE'
		},
		{
			setId: 'SET2002',
			taskId: 'TK00006',
			title: 'Call Darwin',
			description: 'Have a quick catch-up call with Mom',
			status: 'COMPLETED'
		}
	];
	const sample_holder_data: { setId: string; setTitle: string; cards: unknown[] }[] = [
		{
			setId: 'SET2000',
			setTitle: 'Low priority',
			cards: []
		},
		{
			setId: 'SET2001',
			setTitle: 'To do',
			cards: []
		},
		{
			setId: 'SET2002',
			setTitle: 'Miscellaneous',
			cards: []
		}
	];
	let userisHoldingACard = $derived(User.isHoldingACard);

	onMount(() => {
		setTimeout(() => {});
		sample_holder_data.forEach((holder) => {
			const holder_obj: HolderClass = new HolderClass(holder.setId, holder.setTitle);
			sample_cards_data.forEach((card) => {
				if (card.setId == holder.setId) {
					const card_obj: CardClass = new CardClass(
						card.taskId,
						card.setId,
						card.title,
						card.description,
						card.status
					);
					holder_obj.AddCard(card_obj);
				}
			});
			holder_objects.push(holder_obj);
		});
		document.addEventListener('mousemove', (mouse) => {
			if (userisHoldingACard) {
				const x = mouse.clientX;
				const y = mouse.clientY;
				const card = document.querySelector('.held-card') as HTMLDivElement;
				if (card) {
					card.style.top = `${y - 80}px`;
					card.style.left = `${x - 150}px`;
				}
			}
		});
	});
</script>

<div class="fill">
	<div class="cards-container">
		{#each holder_objects as holder}
			<Holder obj={holder} />
		{/each}
	</div>
</div>

{#if userisHoldingACard && User.holding}
	<div class="held-card {userisHoldingACard && User.holding ? 'active' : ''}" id="">
		<Card
			id={User.holding.id}
			description={User.holding.description}
			status={User.holding.status}
			handler={() => {}}
			title={User.holding.title}
		/>
	</div>
{/if}

<style>
	.fill {
		display: flex;
		flex-direction: row;
		height: 100vh;
		width: 100vw;
		.cards-container {
			margin: auto;
			display: flex;
			gap: 1rem;
		}
	}
	.held-card {
		position: absolute;
		inset: -1000;
		width: 300px;
		pointer-events: none;
		opacity: 0;

		&.active {
			opacity: 1;
		}
	}
</style>
