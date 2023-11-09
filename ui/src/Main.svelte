<script>
	import ExpansionManager from "./lib/expansions/ExpansionManager.svelte"
	import MenuDrawer from "./lib/MenuDrawer.svelte"
	import "./style.css"
	let expansionManagerHidden = true
</script>

<MenuDrawer bind:exp_man_hidden={expansionManagerHidden} />
<ExpansionManager bind:hidden={expansionManagerHidden} />
