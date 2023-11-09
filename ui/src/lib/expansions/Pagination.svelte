<script>
	import Select from "../components/Select.svelte"
	export let currentPage
	export let totalPages
	export let limit
	export let sort
	export let updateExpansionList
</script>

<div class="pagination">
	<Select
		bind:selected={limit}
		change={async () => await updateExpansionList("", limit, 1, sort)}
		options={[5, 10, 20]} />
	<Select
		bind:selected={sort}
		change={async () => await updateExpansionList("", limit, 1, sort)}
		options={["ASC", "DSC"]} />
	<button
		class="btn btn-default"
		disabled={currentPage > 1 ? false : true}
		on:click={async () =>
			await updateExpansionList("", limit, (currentPage -= 1), sort)}
		>Prev {limit}</button>
	<span>Page {currentPage} of {totalPages}</span>
	<button
		class="btn btn-default"
		disabled={currentPage < totalPages ? false : true}
		on:click={async () =>
			await updateExpansionList("", limit, (currentPage += 1), sort)}>
		Next {limit}
	</button>
</div>

<style>
	.pagination {
		margin-top: var(--mgn-large);
	}
</style>
