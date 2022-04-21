<script>
    import {onMount} from "svelte";


    let frequency = 100;
    let mixGainValue = 1;
    let bpm = 100;
    let nextNoteTime = 0.0;
    let current16thNote = 0;
    const scheduleAheadTime = 0.1;
    let notesInQueue = [];
    let timerID;
    const lookahead = 25.0;

    let grid = [[true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false], [true, false, false, false]];
    let gridLabel = ['Kick', 'Snare', 'HighHat', 'Clap'];

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

    function nextNote() {
        // Advance current note and time by a 16th note...
        const secondsPerBeat = 60.0 / bpm;    // Notice this picks up the CURRENT
                                              // tempo value to calculate beat length.
        nextNoteTime += secondsPerBeat;    // Add beat length to last beat time

        current16thNote++;    // Advance the beat number, wrap to zero
        if (current16thNote === 8) {
            current16thNote = 0;
        }
    }

    function scheduleNote(beatNumber, time) {
        // push the note on the queue, even if we're not playing.
        notesInQueue.push({note: beatNumber, time: time});

        const column = grid[beatNumber];

        if (column[0]) {
            console.log('schedule play kick', time, beatNumber);
            playKick(time);
        }
        if (column[1]) {
            console.log('schedule play snare', time, beatNumber);
            playSnare(time);
        }
    }

    function scheduler() {
        // while there are notes that will need to play before the next interval,
        // schedule them and advance the pointer.
        while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
            scheduleNote(current16thNote, nextNoteTime);
            nextNote();
        }
        timerID = window.setTimeout(scheduler, lookahead);
    }

    function playKick(time) {
        osc = audioContext.createOscillator();
        osc2 = audioContext.createOscillator();

        osc.type = "triangle";
        osc2.type = "sine";

        gainOsc.gain.setValueAtTime(1, time);
        gainOsc.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

        gainOsc2.gain.setValueAtTime(1, time);
        gainOsc2.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

        osc.frequency.setValueAtTime(frequency, time);
        osc.frequency.exponentialRampToValueAtTime(0.001, time + 0.5);

        osc2.frequency.setValueAtTime(frequency - 70, time);
        osc2.frequency.exponentialRampToValueAtTime(0.001, time + 0.5);

        mixGain.gain.value = mixGainValue;

        osc.connect(gainOsc);
        osc2.connect(gainOsc2);

        osc.start(time);
        osc2.start(time);

        osc.stop(time + 0.5);
        osc2.stop(time + 0.5);
    }

    function playSnare(time) {
        const osc = audioContext.createOscillator();
        osc.type = 'triangle';
        const gainOsc3 = audioContext.createGain();
        gainOsc3.gain.setValueAtTime(1, time);
        gainOsc3.gain.exponentialRampToValueAtTime(0.001, time + 1);

        osc.frequency.setValueAtTime(350, time);
        osc.frequency.exponentialRampToValueAtTime(0.001, time + 1);

        osc.connect(gainOsc3);
        gainOsc3.connect(mixGain);
        osc.start(time);
        osc.stop(time + 1);
    }

    function stop() {
        window.clearTimeout(timerID);
    }

    function start() {
        scheduler();
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
