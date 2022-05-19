<div class="knob" style="--rotation: {rotation}" on:pointerdown={pointerDown}>
    <svg version="1.1" viewBox="-16 -16 32 32" style="width: 50px; height: 50px; user-select: none; outline: none; --rot: 0deg;">
        <defs>
            <linearGradient id="shape-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="rgb(80, 80, 81)"/>
                <stop offset="100%" stop-color="rgb(30, 30, 31)"/>
            </linearGradient>
            <radialGradient id="metal-rings" fx="50%" fy="50%" r="10%" spreadMethod="reflect">
                <stop offset="30%" stop-color="white" stop-opacity="0.66"></stop>
                <stop offset="50%" stop-color="white" stop-opacity="0.69"></stop>
                <stop offset="70%" stop-color="white" stop-opacity="0.66"></stop>
            </radialGradient>
            <path id="shape" d="
        M14.876 -5.890A-16 -16 0 0 0 14.876 5.890A16 16 0 0 112.539 9.938A-16 -16 0 0 0 2.337 15.828
        A16 16 0 0 1-2.337 15.828A-16 -16 0 0 0 -12.539 9.938A16 16 0 0 1-14.876 5.890A-16 -16 0 0 0 -14.876 -5.890
        A16 16 0 0 1-12.539 -9.938A-16 -16 0 0 0 -2.337 -15.828A16 16 0 0 12.337 -15.828A-16 -16 0 0 0 12.539 -9.938
        A16 16 0 0 114.876 -5.890"></path>
            <clipPath id="shape-mask" style="transform: rotate(var(--rot)) scale(0.87)">
                <use href="#shape"/>
            </clipPath>
            <filter id="lights">
                <feDropShadow dx="0" dy="-0.3" stdDeviation="0.1" flood-opacity="0.7" flood-color="white"/>
            </filter>
            <filter id="shadow">
                <feDropShadow dx="0" dy="0" stdDeviation="0.3" flood-opacity="0.9" flood-color="yellow"/>
            </filter>
        </defs>
        <circle cx="0" cy="0" r="15.0" fill="rgb(36, 36, 37)" stroke="rgb(28, 28, 29)" stroke-width="0.5"></circle>
        <g filter="url(#shadow)">
            <g filter="url(#lights)">
                <g clip-path="url(#shape-mask)">
                    <rect x="-16" y="-16" width="32" height="32" fill="url(#shape-fill)"></rect>
                </g>
            </g>
        </g>
        <g style="transform: rotate(var(--rot))">
            <circle cx="0" cy="-11" r="1.1" fill="black"></circle>
            <circle cx="0" cy="-11" r="0.8" fill="white"></circle>
        </g>
        <circle cx="0" cy="0" r="9" fill="url(#metal-rings)" stroke="rgb(50, 50, 51)" stroke-width="0.7"></circle>
    </svg>
</div>

<script>
    export let value, min, max;
    export let rotRange = 2 * Math.PI * 0.83;
    export let pixelRange = 100;
    export let startRotation = -Math.PI * 0.83;

    let startY, startValue;
    $: valueRange = max - min;
    $: rotation = startRotation + (value - min) / valueRange * rotRange;

    function clamp(num, min, max) {
        return Math.max(min, Math.min(num, max));
    }

    function pointerMove({clientY}) {
        console.log(clientY);
        const valueDiff = valueRange * (clientY - startY) / pixelRange;
        value = clamp(startValue - valueDiff, min, max)
    }

    function pointerDown({clientY}) {
        console.log({clientY});
        startY = clientY;
        startValue = value;
        window.addEventListener('pointermove', pointerMove);
        window.addEventListener('pointerup', pointerUp);
    }

    function pointerUp() {
        console.log('pointer up');
        window.removeEventListener('pointermove', pointerMove);
        window.removeEventListener('pointerup', pointerUp);
    }
</script>


<style>

    .knob {
        touch-action: none;
        display: block;
        width: 50px;
        height: 50px;
        padding: 0;
        transform: rotate(calc(var(--rotation) * 1rad));
        transform-origin: 50% 50%;
    }
</style>

