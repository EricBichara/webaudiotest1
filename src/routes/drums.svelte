<script lang="ts">
  import * as Tone from "tone";
  import { Loop, MembraneSynth, NoiseSynth, Reverb } from "tone";
  import KickParams from "../components/KickParams.svelte";
  import SnareParams from "../components/SnareParams.svelte";
  import HighHatParams from "../components/HighHatParams.svelte";
  import ClapParams from "../components/ClapParams.svelte";
  import TomParams from "../components/TomParams.svelte";
  import configjson from "../gen.json";
  import { getChordsForKey, getScaleKeys, keys } from "../components/notes.js";
  import { onMount } from "svelte";

  let grid = [];
  let gridLabel = ["Kick", "Snare", "HighHat", "Clap", "Tom"];

  let loop: Loop;
  let bpm = 120;
  let beat = 0;
  let kick: MembraneSynth;
  let snare: NoiseSynth;
  let highHat: NoiseSynth;
  let clap: NoiseSynth;
  let tom: MembraneSynth;
  let reverb: Reverb;
  let amount = 0;

  let isParamsOpen = false;
  let currentParams;
  let isReverbOn = false;
  let isModalOpen = false;

  let selectedKey;
  let selectedScale;

  let selectedChordKey;
  let selectedChordKeyIndex;
  let selectedChord;

  $: keysForScale = (selectedKey != null && selectedScale != null) ?  getScaleKeys(selectedKey, selectedScale): [];
  $: chordsForKey = selectedChordKey != null ? getChordsForKey(selectedChordKeyIndex, selectedScale, configjson.chords) : [];

  onMount(()=>{
    const newGrid = [];
    for(let i = 0; i<32; i++){
      newGrid.push([false, false, false, false]);
    }

    grid = newGrid;
  });


  function selectChordKey(key, index){
    selectedChordKey = key;
    selectedChordKeyIndex = index;
  }

  function start() {
    initSynths();
    loop = new Tone.Loop(triggerSounds, "16n");
    Tone.Transport.timeSignature = [8, 4];
    Tone.Transport.start();
    loop.start(0);
  }

  function initSynths() {
    reverb = new Tone.Reverb({
      decay: 1,
      wet: amount
    }).toDestination();
    kick = new Tone.MembraneSynth({
      envelope: {
        attack: 0.02,
        decay: 0.8,
        sustain: 0
      }
    }).toDestination();
    snare = new Tone.NoiseSynth({
      volume: -5,
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0
      }
    }).toDestination();
    highHat = new Tone.NoiseSynth({
      volume: -10,
      envelope: {
        attack: 0.01,
        decay: 0.3
      }
    }).connect(reverb);
    clap = new Tone.NoiseSynth().connect(reverb);
    tom = new Tone.MembraneSynth().connect(reverb);
  }

  function triggerSounds(time) {
    Tone.Transport.bpm.value = bpm;
    const transport = Tone.Transport.position.split(":");
    const sixteenths = transport[2].split('.')[0];
    const nextBeat = (parseInt(transport[1]) * 4) + parseInt(sixteenths);

    Tone.Draw.schedule(()=>{
      beat = nextBeat;
    }, time);

    if (grid[nextBeat][0]) {
      playKick(time);
    }
    if (grid[nextBeat][1]) {
      playSnare(time);
    }
    if (grid[nextBeat][2]) {
      playHighHat(time);
    }
    if (grid[nextBeat][3]) {
      playClap(time);
    }
    if (grid[nextBeat][4]) {
      playTom(time);
    }
  }

  function playKick(time) {
    console.log("attack", kick.envelope.attack);
    kick.triggerAttackRelease("C1", "8n", time);
  }

  function playSnare(time) {
    snare.triggerAttack(time);
  }

  function playHighHat(time) {
    highHat.triggerAttack(time);
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

  function onReverbChanged(val) {
    if (isReverbOn) {
      snare.disconnect();
      snare.connect(reverb);
      kick.disconnect();
      kick.connect(reverb);
    } else {
      snare.disconnect();
      snare.toDestination();
      kick.disconnect();
      kick.toDestination();
    }
  }

</script>

<div class="drawer drawer-end">
  <input id="param-drawer" type="checkbox" class="drawer-toggle" bind:checked={isParamsOpen}>
  <div class="drawer-content p-4">
    <h1 class="text-3xl mb-4">Drum Machine</h1>

    <div>BPM {bpm}</div>
    <input type="range" min="60" max="300" bind:value={bpm} step="1" class="range">

    <div>Reverb</div>
    <input type="checkbox" class="checkbox" bind:checked={isReverbOn} on:change={onReverbChanged}>
    <div>Reverb Amount {amount}</div>
    <input type="range" class="range" min="0" max="1" step="0.05" bind:value={amount}
           on:change={reverb.set({wet: amount})}>
    <p></p>

    <select class="select select-accent" bind:value={selectedKey}>
      <option value={null} disabled selected>Please choose an option</option>
      {#each keys as key}
        <option value={key}>{key}</option>
      {/each}
    </select>

    <select class="select select-accent" bind:value={selectedScale}>
      <option value={null} disabled selected>Please choose an option</option>
      {#each Object.entries(configjson.scales) as [key, value]}
        <option value={value}>{key}</option>
      {/each}
    </select>

    <button class="btn btn-primary" on:click={start}>Start</button>
    <button class="btn btn-primary" on:click={stop}>Stop</button>

    <button class="btn btn-accent" on:click={()=> isModalOpen = true}>Modal</button>



    <div class="grid gap-2 grid-flow-col mt-4 drum-grid">
      {#each grid as column, ci}
        <div class="grid gap-2 grid-flow-row">
          {#each column as row, ri}
            <div class="flex flex-row items-center justify-end">
              {#if ci === 0}
                <button on:click={()=>{openParams(gridLabel[ri])}}
                        class="mr-6 px-4 border-solid border-2 border-red-200 label-cell">{gridLabel[ri]}</button>
              {/if}
              <div class="bg-error border-solid border-2 border-orange-600 h-14 rounded cell"
                   class:bg-error={row} class:border-orange-200={ci === beat}
                   class:border-orange-100={ci%4 === 0}
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

  <div class="modal modal-bottom sm:modal-middle" class:modal-open={isModalOpen}
       on:click|self={()=>isModalOpen = false}>
    <div class="modal-box">
      <div class="grid grid-cols-3 gap-3">
        <div>
          {#each keysForScale as key, index}
            <div on:click={()=> selectChordKey(key, index)} class:bg-error={selectedChordKey === key}>{key}</div>
          {/each}
        </div>
        <div>
          {#each Object.entries(chordsForKey) as [key, value], index}
            <div>{key}</div>
          {/each}
        </div>
        <div>

        </div>

      </div>
      <div class="modal-action">
        <label class="btn" on:click={()=> isModalOpen = false}>Yay!</label>
      </div>
    </div>
  </div>

</div>


<style>
    .drum-grid {
        width: 600px;
    }

    .cell {
        height: 40px;
        width: 20px;
    }

    .label-cell {
        height: 40px;
        text-align: center;
        line-height: 38px;
    }
</style>
