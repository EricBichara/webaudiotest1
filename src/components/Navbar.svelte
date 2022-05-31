<ul class="menu p-4 overflow-y-auto w-52 bg-base-300">
    <li on:click={onClick} class="mb-2"><a href="/drums">Drum Machine</a></li>
    <li on:click={onClick} class="mb-2"><a href="/recorder">Recorder</a></li>
</ul>

<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    function onClick() {
        dispatch("message", {});
    }
</script>