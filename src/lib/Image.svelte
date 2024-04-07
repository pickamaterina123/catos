<script>
	import { onMount } from 'svelte';

	export let src;

	let image;
	let loaded = false;

	onMount(() => {
		if (image.complete) {
			loaded = true;
		} else {
			image.addEventListener('load', () => {
				setTimeout(() => {
					loaded = true;
				}, 0);
			});
		}
	});
</script>

<img {src} alt="cat" bind:this={image} class:loaded />

<style>
	img {
		width: 200px;
        opacity: 0;
		transform: scale(0) rotate(360deg);
		transition: all 0.4s;
	}

    .loaded {
        opacity: 1;
		transform: scale(1) rotate(0deg);
    }
</style>
