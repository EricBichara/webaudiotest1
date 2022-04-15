<div>Audio Input Device</div>
{#if devices.length > 0}
    <select class="select select-accent" bind:value={selectedDevice}>
        <option value={null} disabled selected>Please choose an option</option>
        {#each devices as device}
            <option value={device.deviceId}>{device.label}</option>
        {/each}
    </select>
{/if}
<div></div>
<button class="btn btn-error mt-4" on:click={startRecord} disabled={isBtnDisabled}>{text}</button>

{#if showAudio}
    <audio class="mt-4" controls src={audioURL}></audio>
{/if}



<script>
    import {onMount} from "svelte";

    let showAudio = false;
    let audioURL = null;
    let chunks = []; //will be used later to record audio
    let mediaRecorder = null; //will be used later to record audio
    let audioBlob = null;
    let text = "Record";
    let devices = [];
    let selectedDevice = null;
    $: isBtnDisabled = selectedDevice === null;


    onMount(()=>{
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Your browser does not support recording!');
            return;
        }

        navigator.mediaDevices.getUserMedia({audio: true}).then(()=>{
            navigator.mediaDevices.enumerateDevices().then(function (deviceList) {
                devices = deviceList.filter((device) => device.kind === 'audioinput');
                devices.forEach((device) => {
                    console.log(device.kind + ": " + device.label +
                        " id = " + device.deviceId);
                })
            })
        });
    })

    function mediaRecorderDataAvailable(e) {
        chunks.push(e.data);
    }

    function mediaRecorderStop() {
        audioBlob = new Blob(chunks, {type: 'audio/mp4'});
        audioURL = window.URL.createObjectURL(audioBlob);
        showAudio = true;
        // reset to default
        mediaRecorder = null;
        chunks = [];
    }

    function startRecord() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Your browser does not support recording!');
            return;
        }

        if (!mediaRecorder) {
            navigator.mediaDevices.getUserMedia({
                audio: {deviceId: selectedDevice},
            })
                .then((stream) => {
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.start();
                    mediaRecorder.ondataavailable = mediaRecorderDataAvailable;
                    mediaRecorder.onstop = mediaRecorderStop;
                    text = "Stop";
                })
                .catch((err) => {
                    alert(`The following error occurred2: ${err}`);
                });
        } else {
            mediaRecorder.stop();
            text = "Record";
        }
    }
</script>