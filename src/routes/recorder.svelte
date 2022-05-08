<div class="p-4">
    <h1 class="text-3xl mb-4">Audio Recorder</h1>
    <div>Audio Input Device</div>
    {#if devices.length > 0}
        <select class="select select-accent" bind:value={selectedDevice}>
            <option value={null} disabled selected>Please choose an option</option>
            {#each devices as device}
                <option value={device.deviceId}>{device.kind} - {device.label}</option>
            {/each}
        </select>
    {/if}
    <div class="mt-4">Supported Codecs</div>
    {#if supportedAudios.length > 0}
        <select class="select select-accent" bind:value={selectedCodec}>
            <option value={null} disabled selected>Please choose an option</option>
            {#each supportedAudios as codec}
                <option value={codec}>{codec}</option>
            {/each}
        </select>
    {/if}

    <div class="mt-4">Blob Type</div>

    <select class="select select-accent" bind:value={selectedBlobType}>
        <option value={null} disabled selected>Please choose an option</option>
        {#each blogTypes as type}
            <option value={type}>{type}</option>
        {/each}
    </select>
<p></p>

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

    let supportedAudios: string[] = [];
    let selectedCodec = null;
    const blogTypes: string[] = ['audio/webm', 'audio/mp4'];
    let selectedBlobType: string = null;

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

        supportedAudios = getSupportedMimeTypes();
    })

    function getSupportedMimeTypes() {
        const types = ["webm", "ogg", "mp3", 'mp4', "x-matroska"];
        const codecs = ["should-not-be-supported", "vp9", "vp9.0", "vp8", "vp8.0", "avc1", "av1", 'flac', "h265", "h.265", "h264", "h.264", "opus", "pcm", "aac", "mpeg", "mp4a"];

        const isSupported = MediaRecorder.isTypeSupported;
        const supported = [];
        types.forEach((type) => {
            const mimeType = `audio/${type}`;
            codecs.forEach((codec) => [
                `${mimeType};codecs=${codec}`,
                `${mimeType};codecs=${codec.toUpperCase()}`,
                `${mimeType};codecs:${codec}`,
                `${mimeType};codecs:${codec.toUpperCase()}`
            ].forEach(variation => {
                if (isSupported(variation))
                    supported.push(variation);
            }));

            if (isSupported(mimeType)) {
                supported.push(mimeType);
            }

        });
        return supported;
    }

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
                    sampleRate: 48000,
                    suppressLocalAudioPlayback: false,
                },
            })
                .then((stream) => {
                    mediaRecorder = new MediaRecorder(stream, {
                        audioBitsPerSecond: 48000,
                        mimeType: selectedCodec
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
        audioBlob = new Blob(chunks, {type: selectedBlobType});
        let audioURL = URL.createObjectURL(audioBlob);
        audioURLList = [...audioURLList, audioURL];
        // reset to default
        mediaRecorder = null;
        chunks = [];
    }
</script>