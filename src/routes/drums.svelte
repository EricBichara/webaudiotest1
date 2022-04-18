<script>
    import {onMount} from "svelte";


    let frequency = 100;
    let mixGainValue = 1;
    let bpm = 100;

    let grid = [[1, false, false, false], [1, false, false, false], [1, false, false, false], [1, false, false, false]];


    let osc = null;
    let osc2;

    let audioContext = null;
    let gainOsc = null;
    let gainOsc2 = null;
    let mixGain = null;

    onMount(() => {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();

        gainOsc = audioContext.createGain();
        gainOsc2 = audioContext.createGain();
        mixGain = audioContext.createGain();

        gainOsc.connect(mixGain);
        gainOsc2.connect(mixGain);
        mixGain.connect(audioContext.destination);
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

    function stop(){

    }

    function togglePad(column, row) {
        grid[column][row] = !grid[column][row];
        grid = grid;
    }

</script>


<h1 class="text-3xl mb-4">Drum Machine</h1>

<div>Mix Gain {mixGainValue}</div>
<input type="range" min="0" max="5" bind:value={mixGainValue} step=".1" class="range">

<div>BPM {bpm}</div>
<input type="range" min="60" max="300" bind:value={bpm} step="1" class="range">

<div class="mt-3">Kick</div>

<div class="mt-1">Frequency: {frequency}</div>
<input type="range" min="90" max="300" bind:value={frequency} step="5" class="range">



<button class="btn btn-primary" on:click={playKick}>Start</button>
<button class="btn btn-primary" on:click={stop}>Stop</button>

<div class="grid gap-4 grid-flow-col mt-4">
    {#each grid as columm, c}
        <div class="grid gap-4 grid-flow-row" style="width: 50px">
            {#each columm as row, r}
                <div class="bg-error border-solid border border-accent h-14" style="height: 50px" class:bg-error={row} on:click={()=>{togglePad(c,r)}}></div>
            {/each}
        </div>
    {/each}
</div>
