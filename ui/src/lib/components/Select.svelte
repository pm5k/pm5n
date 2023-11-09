<script>
	import { onDestroy, onMount } from "svelte"
	import ChevronDown from "virtual:icons/ion/chevron-down"
	export let options
	export let selected = options[0]
	export let change

	let ref
	let open = false

	const setOption = (opt) => {
		selected = opt
		open = false
		change(selected)
	}

	const clickOutsideHandler = (event) => {
		if (ref && !ref.contains(event.target)) {
			open = false
		}
	}

	// TODO: see if this can be improved or had annoying side-effects..

	onMount(() => {
		window.addEventListener("click", clickOutsideHandler)
	})

	onDestroy(() => {
		window.removeEventListener("click", clickOutsideHandler)
	})
</script>

<button
	class="wrapper svg-middle btn btn-default"
	bind:this={ref}
	on:click={() => (open = !open)}>
	<span class="selected">{selected}</span>
	<ChevronDown />
	{#if open}
		<ul class="select-options">
			{#each options as option}
				<!-- FIXME: there seem to be 1px gaps between these, dunno from where.. -->
				<li class="select-option" on:click={() => setOption(option)}>
					{option}
				</li>
			{/each}
		</ul>
	{/if}
</button>

<style>
	.wrapper {
		position: relative;
	}

	.select-options {
		position: absolute;
		z-index: 1;
		left: 0;
		list-style: none;
		margin: 0;
		padding: 0;
		display: block;
		width: 100%;
		margin-top: var(--mgn-large);
	}
	.select-option {
		display: block;
		border: none;
		cursor: pointer;
		white-space: nowrap;
		background-color: var(--secondary);
		color: var(--white);
	}
	.select-option:hover {
		background-color: var(--white);
		color: var(--secondary);
	}
	.select-option:first-of-type {
		border-top-left-radius: var(--rad-default);
		border-top-right-radius: var(--rad-default);
	}
	.select-option:last-of-type {
		border-bottom-left-radius: var(--rad-default);
		border-bottom-right-radius: var(--rad-default);
	}
</style>
