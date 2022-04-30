<div class="p-4">
    <h1 class="text-3xl mb-4">Audio Recorder</h1>
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


    {#each audioURLList as audioURL, i}
        <div class="mt-4">Recording {i + 1}</div>
        <audio class="mt-1" controls src={audioURL}></audio>
    {/each}
</div>


<script lang="ts">

    import {onMount} from "svelte";

    let audioURLList = [];
    let chunks = [];
    let mediaRecorder = null;
    let audioBlob = null;
    let text = "Record";
    let devices = [];
    let selectedDevice = null;
    $: isBtnDisabled = selectedDevice === null;

    onMount(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Your browser does not support recording!');
            return;
        }

        navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(() => {
            navigator.mediaDevices.enumerateDevices().then(function (deviceList) {
                devices = deviceList.filter((device) => device.kind === 'audioinput');
            })
        });
    })


    function startRecord() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Your browser does not support recording!');
            return;
        }

        if (!mediaRecorder) {
            navigator.mediaDevices.getUserMedia({
                audio: {
                    deviceId: selectedDevice,
                    echoCancellation: false,
                    autoGainControl: false,
                    channelCount: 2,
                    noiseSuppression: false,
                    sampleRate: 48000
                },
            })
                .then((stream) => {
                    mediaRecorder = new MediaRecorder(stream, {
                        audioBitsPerSecond: 48000,
                        mimeType: 'audio/webm;codecs=opus'
                    });
                    mediaRecorder.start();
                    mediaRecorder.ondataavailable = mediaRecorderDataAvailable;
                    mediaRecorder.onstop = mediaRecorderStop;
                    text = "Stop";
                })
                .catch((err) => {
                    alert(`The following error occurred: ${err}`);
                });
        } else {
            mediaRecorder.stop();
            text = "Record";
        }
    }

    function mediaRecorderDataAvailable(e) {
        chunks.push(e.data);
    }

    function mediaRecorderStop() {
        audioBlob = new Blob(chunks, {type: 'audio/webm'});
        let audioURL = URL.createObjectURL(audioBlob);
        audioURLList = [...audioURLList, audioURL];
        // reset to default
        mediaRecorder = null;
        chunks = [];
    }
</script>