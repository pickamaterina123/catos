<script>
    import Gallery from "../lib/Gallery.svelte";
    import Spinner from "../lib/Spinner.svelte";

    let gallery_ref;
    let loading;
    let press = () => {
        gallery_ref.add_image_to_load();
    }
</script>

<h1>Hi, this website is all about cats</h1>
<button on:click={press} class:loading>
    Tap to loawd morrrr!!
    {#if loading}
        <Spinner />
    {/if}
</button>

<Gallery bind:this={gallery_ref} bind:loading={loading}/>

<style>
    h1, h3 {
        text-align: center;
        margin-top: 20px;
    }

    button {
        padding: 15px;
        border-radius: 8px;
        border: none;
        color: darkgreen;
        background-color: greenyellow;
        margin: 20px auto;
        display: block;
    }

    .loading {
        filter: grayscale(1);
    }
</style>