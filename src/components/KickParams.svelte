<div>
    <div>Kick Parameters</div>
    <div>Attack {kick.envelope.attack.toFixed(4)}</div>
    <Knob bind:value={kick.envelope.attack} max="0.005" min="0.0005"></Knob>

    <div>Decay {kick.envelope.decay.toFixed(1)}</div>
    <Knob bind:value={kick.envelope.decay} max="0.7" min="0.1"></Knob>

    <div>Sustain {kick.envelope.sustain.toFixed(3)}</div>
    <Knob bind:value={kick.envelope.sustain} max="0.03" min="0.005"></Knob>

    <div>Release {kick.envelope.release.toFixed(1)}</div>
    <Knob bind:value={kick.envelope.release} max="3" min="0.1"></Knob>

    <button class="btn btn-primary mt-4" on:click={test}>Test</button>
</div>

<script lang="ts">
    import {MembraneSynth} from "tone";
    import Knob from "./Knob.svelte";

    export let kick: MembraneSynth;

    function test() {
        kick.triggerAttackRelease("C1", "8n");
    }
</script>