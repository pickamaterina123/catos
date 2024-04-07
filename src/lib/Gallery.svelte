<script>
    import { readStream } from './readCatStream';
    import Image from "./Image.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';

    const API = 'https://cataas.com/cat/gif';

    let images = [];
    export let loading;

    export const add_image_to_load = async () => {
        if (loading) return;
        loading = true;
        let req = await fetch(API);
        let url = await readStream(req);
        images.unshift({
            id: uuidv4(),
            url: url
        });
        images = images;
        loading = false;
    }

    onMount(() => {
        add_image_to_load();
    });
</script>

<div class="gallery">
    {#each images as image (image.id)}
        <div animate:flip>
            <Image src={image.url} />
        </div>
    {/each}
</div>

<style>
    .gallery {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>