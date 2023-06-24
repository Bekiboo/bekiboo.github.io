<script lang="ts">
	import { onMount } from 'svelte';

	import Tesseract from 'tesseract.js';

	let text = 'Loading...';

	onMount(() => {
		Tesseract.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png', 'eng', {
			logger: (m) => console.log(m)
		}).then(({ data: { text: recognizedText } }) => {
			console.log(recognizedText);
			text = recognizedText;
		});
	});
</script>

<div class="container">
	<h1>OCR</h1>
	<p>{text}</p>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
