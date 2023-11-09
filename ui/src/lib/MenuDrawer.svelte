<script>
	import SettingsMinBold from "virtual:icons/solar/settings-minimalistic-bold"
	export let exp_man_hidden
	let drawer_hidden = true
</script>

<div
	role="button"
	tabindex="0"
	class={`drawer ${drawer_hidden ? "hidden" : ""}`}
	on:mouseleave={() => (drawer_hidden = true)}
	on:mouseenter={() => (drawer_hidden = false)}>
	{#if drawer_hidden}
		<SettingsMinBold class="drawer-icon" />
	{/if}
	{#if !drawer_hidden}
		<span class="drawer-title">PM5N Menu</span>
		<div class="drawer-content">
			<button
				class="drawer-button"
				on:click={() => (exp_man_hidden = false)}
				>Expansion Manager</button>
		</div>
	{/if}
</div>

<style>
	.drawer {
		height: fit-content;
		width: fit-content;
		padding: var(--pad-default);
		background-color: var(--bg);
		border-radius: var(--rad-default);
		-webkit-box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.65);
		box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.65);
	}

	.drawer-title {
		display: block;
		width: 100%;
		text-align: center;
		font-size: var(--flg);
		margin-bottom: var(--mgn-large);
		margin-top: var(--mgn-default);
		padding-bottom: var(--pad-default);
		border-bottom: 1px solid var(--bd);
	}
	.drawer-button {
		margin-top: var(--mgn-default);
		display: block;
		outline: none;
		border: none;
		background: none;
		font-size: var(--flg);
		padding: var(--pad-default);
		color: var(--fg);
		cursor: pointer;
	}
	.drawer-button:hover {
		background-color: var(--fg-dark);
	}
</style>
