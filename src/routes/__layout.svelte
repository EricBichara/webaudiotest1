<script>
    import '../app.css';
    import Navbar from "../components/Navbar.svelte";

    let checked = false;

    function linkClicked() {
        checked = !checked;
    }
</script>

<div class="w-full navbar bg-base-300">
    <div class="flex-none lg:hidden">
        <label for="my-drawer" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 class="inline-block w-6 h-6 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </label>
    </div>
    <a href="/" class="flex-1 px-2 mx-2">BAPP - The band's gonna make it</a>
</div>

<div class="drawer drawer-mobile">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={checked}>
    <div class="drawer-content">
        <div>
            <slot/>
        </div>
    </div>
    <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay"></label>
        <Navbar on:message={linkClicked}></Navbar>
    </div>
</div>