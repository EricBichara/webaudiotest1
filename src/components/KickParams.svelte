<div class="params">
  <div class="text-2xl mb-4">Kick Parameters</div>
  <div class="divider"></div>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col justify-items-center items-center">
      <div class="mb-1">Attack {kick.envelope.attack.toFixed(4)}</div>
      <Knob bind:value={kick.envelope.attack} max="0.05" min="0.005"></Knob>
    </div>
    <div class="flex flex-col justify-items-center items-center">
      <div class="mb-1">Decay {kick.envelope.decay.toFixed(1)}</div>
      <Knob bind:value={kick.envelope.decay} max="1" min="0.1"></Knob>
    </div>
    <div class="flex flex-col justify-items-center items-center">
      <div class="mb-1">Sustain {kick.envelope.sustain.toFixed(3)}</div>
      <Knob bind:value={kick.envelope.sustain} max="0.03" min="0"></Knob>
    </div>
    <div class="flex flex-col justify-items-center items-center">
      <div class="mb-1">Release {kick.envelope.release.toFixed(1)}</div>
      <Knob bind:value={kick.envelope.release} max="3" min="0.1"></Knob>
    </div>
  </div>

  <button class="btn btn-primary mt-4 w-full" on:click={test}>Test</button>
</div>

<script lang="ts">
  import { MembraneSynth } from "tone";
  import Knob from "./Knob.svelte";

  export let kick: MembraneSynth;

  function test() {
    kick.triggerAttackRelease("C1", "8n");
  }
</script>

<style lang="scss">
  .params {
    user-select: none;
  }
</style>