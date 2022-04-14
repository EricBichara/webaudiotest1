<h1 class="text-4xl">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button class="btn btn-accent" on:click={startRecord}>{text}</button>
{#if showAudio}
    <audio controls src="{audioURL}"></audio>
{/if}
<script>
    let showAudio = false;
    let audioURL = null;
    let chunks = []; //will be used later to record audio
    let mediaRecorder = null; //will be used later to record audio
    let audioBlob = null;
    let text = "Start";

    function mediaRecorderDataAvailable(e) {
        chunks.push(e.data);
    }

    function mediaRecorderStop() {
        audioBlob = new Blob(chunks, {type: 'audio/mp3'});
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
                audio: true,
            })
                .then((stream) => {
                    mediaRecorder = new MediaRecorder(stream);
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
            text = "Start";
        }
    }
</script>