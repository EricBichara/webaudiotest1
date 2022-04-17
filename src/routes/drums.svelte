<script>
    import {onMount} from "svelte";

    let frequency = 100;
    let mixGainValue = 1;

    const audioContext = new AudioContext();
    const gainOsc = audioContext.createGain();
    const gainOsc2 = audioContext.createGain();
    const mixGain = audioContext.createGain();

    let osc = null;
    let osc2;

    onMount(() => {
        mixGain.connect(audioContext.destination);
        gainOsc.connect(mixGain);
        gainOsc2.connect(mixGain);
    })

    function playKick() {
        if (osc != null) {
            osc.stop(audioContext.currentTime);
            osc2.stop(audioContext.currentTime);
        }

        osc = audioContext.createOscillator();
        osc2 = audioContext.createOscillator();

        osc.type = "triangle";
        osc2.type = "sine";

        gainOsc.gain.setValueAtTime(1, audioContext.currentTime);
        gainOsc.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

        gainOsc2.gain.setValueAtTime(1, audioContext.currentTime);
        gainOsc2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

        osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

        osc2.frequency.setValueAtTime(frequency - 70, audioContext.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

        mixGain.gain.value = mixGainValue;

        osc.connect(gainOsc);
        osc2.connect(gainOsc2);

        osc.start(audioContext.currentTime);
        osc2.start(audioContext.currentTime);

        osc.stop(audioContext.currentTime + 0.5);
        osc2.stop(audioContext.currentTime + 0.5);
    }

</script>


<h1 class="text-3xl mb-4">Drum Machine</h1>

<div>Mix Gain {mixGainValue}</div>
<input type="range" min="0" max="3" bind:value={mixGainValue} step=".1" class="range">


<div class="mt-3">Kick</div>

<div class="mt-1">Frequency: {frequency}</div>
<input type="range" min="90" max="300" bind:value={frequency} step="5" class="range">

<button class="btn btn-primary" on:click={playKick}>Play Kick</button>

