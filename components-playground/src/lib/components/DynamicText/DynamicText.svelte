<script lang="ts">
	import { onMount } from 'svelte';

	let { text, width } = $props();

	onMount(() => {
		const dynamics = document.querySelectorAll(`.dynamic-width-${width}`);
		dynamics.forEach((text) => {
			const p = text as HTMLParagraphElement;
			if (!p) return;
			if (!p.textContent) return;

			const charSize = 1;
			const numOfChar = p.textContent.length;
			const rate = (charSize / width) * numOfChar;

			console.log(`Rate of '${p.textContent.length}' is ${rate}`);
			p.style.width = `${width}px`;
			p.style.textWrap = `nowrap`;
			p.style.margin = '0';
			p.style.padding = '0';
			p.style.textAlign = 'center';
			p.style.fontSize = `${(charSize / rate) * 2}px`;
			p.style.lineHeight = `${(charSize / rate) * 2}px`;
			p.style.border = '1px solid blue';
		});
	});
</script>

<p class={'dynamic-width-' + width} id={'text' + width}>
	{text}
</p>
