<ul class="menu p-4 overflow-y-auto w-72 bg-base-300">
    <li on:click={onClick} class="mb-2"><a href="/drums">Drum Machine</a></li>
    <li on:click={onClick} class="mb-2"><a href="/drums2">Drum Machine 2</a></li>
    <li on:click={onClick} class="mb-2"><a href="/recorder">Recorder</a></li>
</ul>

<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    function onClick() {
        dispatch("message", {});
    }
</script>