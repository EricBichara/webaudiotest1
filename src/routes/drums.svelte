<script lang="ts">
    import * as Tone from "tone";
    import {Loop, MembraneSynth} from "tone";

    let grid = [[true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false]];
    let gridLabel = ['Kick', 'Snare', 'HighHat', 'Clap'];

    let loop: Loop;
    let bpm = 120;
    let beat = 0;
    let kick: MembraneSynth;
    let snare: MembraneSynth;
    let highHat: MembraneSynth;
    let clap: MembraneSynth;

    function start() {
        kick = new Tone.MembraneSynth().toDestination();
        snare = new Tone.MembraneSynth().toDestination();
        highHat = new Tone.MembraneSynth().toDestination();
        clap = new Tone.MembraneSynth().toDestination();

        loop = new Tone.Loop(triggerSounds, '4n');
        Tone.Transport.start();
        loop.start(0);
        // const synth = new Tone.MembraneSynth().toDestination();
        // synth.triggerAttackRelease("C2", "8n");
    }

    function triggerSounds(time) {
        Tone.Transport.bpm.value = bpm;

        if (grid[beat][0]) {
            playKick(time);
        }
        if (grid[beat][1]) {
            playSnare(time);
        }
        if (grid[beat][2]) {
            playHighHat(time);
        }
        if (grid[beat][3]) {
            playClap(time);
        }
        if (beat === 7) {
            beat = 0;
        } else {
            beat++;
        }
    }

    function playKick(time) {
        kick.triggerAttackRelease("C1", "8n", time);
    }

    function playSnare(time) {
        snare.triggerAttackRelease("C2", "8n", time);
    }

    function playHighHat(time){
        highHat.triggerAttackRelease("C3", "8n", time);
    }

    function playClap(time){
        clap.triggerAttackRelease("C4", "8n", time);
    }

    function stop() {
        loop.stop();
    }

    function togglePad(column, row) {
        grid[column][row] = !grid[column][row];
        grid = grid;
    }

</script>

<div class="drawer drawer-end">
    <input id="param-drawer" type="checkbox" class="drawer-toggle">
    <div class="drawer-content p-4">
        <h1 class="text-3xl mb-4">Drum Machine</h1>

        <div>BPM {bpm}</div>
        <input type="range" min="60" max="300" bind:value={bpm} step="1" class="range">

        <button class="btn btn-primary" on:click={start}>Start</button>
        <button class="btn btn-primary" on:click={stop}>Stop</button>

        <div class="grid gap-4 grid-flow-col mt-4">
            {#each grid as row, c}
                <div class="grid gap-4 grid-flow-column ">
                    {#each row as column, r}
                        <div class="flex flex-row items-center justify-end">
                            {#if c === 0}
                                <label for="param-drawer"
                                       class="mr-16 px-4 border-solid border-2 border-red-200 label-cell">{gridLabel[r]}</label>
                            {/if}
                            <div class="bg-error border-solid border-2 border-orange-600 h-14 rounded cell"
                                 class:bg-error={column} on:click={()=>{togglePad(c,r)}}></div>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
    <div class="drawer-side">
        <label for="param-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 bg-base-100">
            <!-- Sidebar content here -->
            <li>Sidebar Item 1</li>
            <li>Sidebar Item 2</li>

        </ul>
    </div>

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
