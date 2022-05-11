<div>
    <div>Kick Parameters</div>
    <div>Attack {kick.envelope.attack}</div>
    <input type="range" min="0.0005" max="0.005" bind:value={kick.envelope.attack} step="0.0005" class="range">
    <div>Decay {kick.envelope.decay}</div>
    <input type="range" min="0.1" max="0.7" bind:value={kick.envelope.decay} step="0.05" class="range">
    <div>Sustain {kick.envelope.sustain}</div>
    <input type="range" min="0.005" max="0.03" bind:value={kick.envelope.sustain} step="0.005" class="range">
    <div>Release {kick.envelope.release}</div>
    <input type="range" min="0.1" max="3" bind:value={kick.envelope.release} step="0.1" class="range">
    <button class="btn btn-primary mt-4" on:click={test}>Test</button>
</div>

<script lang="ts">
    import {MembraneSynth} from "tone";

    export let kick: MembraneSynth;

    function test() {
        kick.triggerAttackRelease("C1", "8n");
    }
</script>