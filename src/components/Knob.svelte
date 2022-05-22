<!--<div class="knob2" style="--rotation: {rotation}" on:pointerdown={pointerDown}>
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
</div>-->
<!--<div class="dial" style="--rotation: {rotation}" on:pointerdown={pointerDown}></div>-->
<div class="knob-inset">
    <div class="knob" style="--rotation: {rotation}" on:pointerdown={pointerDown}></div>
</div>


<script lang="ts">
    export let value, min, max;
    export let rotRange = 2 * Math.PI * 0.83;
    export let pixelRange = 70;
    export let startRotation = -Math.PI * 0.83;

    let startY, startValue;
    $: valueRange = max - min;
    $: rotation = startRotation + (value - min) / valueRange * rotRange;

    function clamp(num, min, max) {
        return Math.max(min, Math.min(num, max));
    }

    function pointerMove({clientY}) {
        const valueDiff = valueRange * (clientY - startY) / pixelRange;
        value = clamp(startValue - valueDiff, min, max)
    }

    function pointerDown({clientY}) {
        startY = clientY;
        startValue = value;
        window.addEventListener('pointermove', pointerMove);
        window.addEventListener('pointerup', pointerUp);
    }

    function pointerUp() {
        window.removeEventListener('pointermove', pointerMove);
        window.removeEventListener('pointerup', pointerUp);
    }
</script>


<style lang="scss">
/*
  .knob2 {
    touch-action: none;
    display: block;
    width: 50px;
    height: 50px;
    padding: 0;
    transform: rotate(calc(var(--rotation) * 1rad));
    transform-origin: 50% 50%;
  }

  .dial {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 50px;
    background-color: #6b6b6b;
    border-radius: 50%;
    transform: rotate(calc(var(--rotation) * 1rad));
    //box-shadow: inset -2px 2px 0px 0px rgba(#fff, 0.1),
    //inset 2px -2px 0px 0px rgba(#111, 0.2),
    //-5px 5px 5px 0px #111,
    //-10px 10px 10px -5px #111,
    //-20px 20px 20px -10px #111,
    //-25px 25px 25px -10px #111;

    &::after {
      position: absolute;
      top: 0px;
      left: calc(50% - 2px);
      width: 4px;
      height: 25%;
      margin-top: -2px;
      background-color: #fefefe;
      border-radius: 2px;
      transition: all 200ms ease-in-out;
      transform: rotate(0deg);
      transform-origin: -100% 50%;
      box-shadow: 1px -1px 0px 0px rgba(#111, 0.2);
      content: "";
    }
  }
*/
  $s: rgb(207, 201, 188);
  $s1: lighten($s, 13%);
  $s2: lighten($s, 2.5%);
  $s3: darken($s, 1%);
  $s4: darken($s, 10%);

  .knob-inset {
    border-radius: 50%;
    width: 4.4em;
    height: 4.4em;
    background: linear-gradient(rgba(214, 214, 214, 0.3), rgba(245, 245, 245, 0.3));
  }

  .knob {
    position: relative;
    width: 4em;
    height: 4em;
    top: 0.2em;
    left: 0.2em;
    cursor: pointer;
    -webkit-backface-visibility: hidden;
    border-radius: 50%;
    transition: 150ms ease-out;
    transform: rotate(calc(var(--rotation) * 1rad));
    background: linear-gradient(90deg, $s2 10%, $s4 40.8%, $s 42%, $s 58%, $s1 59.2%, $s2 90%);
    box-shadow: 0 0.1em 0.2em 0 rgba($s1, .9) inset,
    0 -0.1em 0.3em 0 rgba($s1, .3) inset,
    0 0.08em 0.3em 0 rgba(#001, .3),
    0.5em 0 1em 0 rgba($s1, .5) inset,
    -0.5em 0 1em 0 rgba($s4, .3) inset,
    0 4em 1em -3.5em rgba(#002, .3);
  }

  .knob::before {
    position: absolute;
    content: '';
    left: 1.86em;
    width: 0.3em;
    height: 1.7em;
    border-radius: 0 0 0.2em 0.2em;
    background: #b44;
    box-shadow: -0.05em 0 0.1em 0 $s1,
    -0.05em 0 0.1em 0 rgba(#000, .4) inset;
  }


</style>

