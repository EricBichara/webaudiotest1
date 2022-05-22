<script lang="ts">
  import * as Tone from "tone";
  import { Loop, MembraneSynth } from "tone";
  import KickParams from "../components/KickParams.svelte";
  import SnareParams from "../components/SnareParams.svelte";
  import HighHatParams from "../components/HighHatParams.svelte";
  import ClapParams from "../components/ClapParams.svelte";
  import TomParams from "../components/TomParams.svelte";

  let grid = [[true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false]];
  let gridLabel = ["Kick", "Snare", "HighHat", "Clap", "Tom"];

  let loop: Loop;
  let bpm = 120;
  let beat = 0;
  let kick: MembraneSynth;
  let snare: MembraneSynth;
  let highHat: MembraneSynth;
  let clap: MembraneSynth;
  let tom: MembraneSynth;

  let isParamsOpen = false;
  let currentParams;

  function start() {
    initSynths();
    loop = new Tone.Loop(triggerSounds, "4n");
    Tone.Transport.timeSignature = [8, 4];
    Tone.Transport.start();
    loop.start(0);
  }

  function initSynths() {
    kick = new Tone.MembraneSynth().toDestination();
    snare = new Tone.MembraneSynth().toDestination();
    highHat = new Tone.MembraneSynth().toDestination();
    clap = new Tone.MembraneSynth().toDestination();
    tom = new Tone.MembraneSynth().toDestination();
  }

  function triggerSounds(time) {
    Tone.Transport.bpm.value = bpm;
    beat = parseInt(Tone.Transport.position.split(":")[1]);

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
    if (grid[beat][4]) {
      playTom(time);
    }
  }

  function playKick(time) {
    console.log("attack", kick.envelope.attack);
    kick.triggerAttackRelease("C1", "8n", time);
  }

  function playSnare(time) {
    snare.triggerAttackRelease("C2", "8n", time);
  }

  function playHighHat(time) {
    highHat.triggerAttackRelease("C3", "8n", time);
  }

  function playClap(time) {
    clap.triggerAttackRelease("C4", "8n", time);
  }

  function playTom(time) {
    clap.triggerAttackRelease("C4", "8n", time);
  }

  function stop() {
    Tone.Transport.stop();
    loop.stop();
    beat = 0;
  }

  function togglePad(column, row) {
    grid[column][row] = !grid[column][row];
    grid = grid;
  }

  function openParams(param) {
    if (kick === undefined) {
      initSynths();
    }

    currentParams = param;
    isParamsOpen = true;
  }

</script>

<div class="drawer drawer-end">
  <input id="param-drawer" type="checkbox" class="drawer-toggle" bind:checked={isParamsOpen}>
  <div class="drawer-content p-4">
    <h1 class="text-3xl mb-4">Drum Machine</h1>

    <div>BPM {bpm}</div>
    <input type="range" min="60" max="300" bind:value={bpm} step="1" class="range">

    <button class="btn btn-primary" on:click={start}>Start</button>
    <button class="btn btn-primary" on:click={stop}>Stop</button>

    <div class="grid gap-4 grid-flow-col mt-4">
      {#each grid as column, ci}
        <div class="grid gap-4 grid-flow-column ">
          {#each column as row, ri}
            <div class="flex flex-row items-center justify-end">
              {#if ci === 0}
                <button on:click={()=>{openParams(gridLabel[ri])}}
                        class="mr-6 px-4 border-solid border-2 border-red-200 label-cell">{gridLabel[ri]}</button>
              {/if}
              <div class="bg-error border-solid border-2 border-orange-600 h-14 rounded cell"
                   class:bg-error={row} class:border-orange-200={ci === beat}
                   on:click={()=>{togglePad(ci,ri)}}></div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
  <div class="drawer-side">
    <label for="param-drawer" class="drawer-overlay"></label>
    <div class="menu p-4 w-80 bg-base-100">
      {#if currentParams === gridLabel[0]}
        <KickParams kick={kick} />
      {:else if currentParams === gridLabel[1]}
        <SnareParams snare={snare} />
      {:else if currentParams === gridLabel[2]}
        <HighHatParams />
      {:else if currentParams === gridLabel[3]}
        <ClapParams />
      {:else if currentParams === gridLabel[4]}
        <TomParams />
      {/if}
    </div>
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
