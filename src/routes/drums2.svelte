<script>
    import {onMount} from "svelte";
    import * as Tone from "tone";

    let grid = [[true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false]];
    let gridLabel = ['Kick', 'Snare', 'HighHat', 'Clap'];


    onMount(() => {

    })

    function start() {
        const synth = new Tone.MembraneSynth().toDestination();
        synth.triggerAttackRelease("C2", "8n");
    }

    function stop() {

    }

    function togglePad(column, row) {
        grid[column][row] = !grid[column][row];
        grid = grid;
    }

</script>


<h1 class="text-3xl mb-4">Drum Machine</h1>

<button class="btn btn-primary" on:click={start}>Start</button>
<button class="btn btn-primary" on:click={stop}>Stop</button>

<div class="grid gap-4 grid-flow-col mt-4">
    {#each grid as row, c}
        <div class="grid gap-4 grid-flow-column ">
            {#each row as column, r}
                <div class="flex flex-row items-center justify-end">
                    {#if c === 0}
                        <button class="mr-16 px-4 border-solid border-2 border-red-200 label-cell">{gridLabel[r]}</button>
                    {/if}
                    <div class="bg-error border-solid border-2 border-orange-600 h-14 rounded cell"
                         class:bg-error={column} on:click={()=>{togglePad(c,r)}}></div>
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .cell {
        height: 40px;
        width: 40px;
    }

    .label-cell {
        height: 40px;
        text-align: center;
        line-height: 38px;
    }
</style>
