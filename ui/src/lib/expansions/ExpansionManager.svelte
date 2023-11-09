<script>
	import { onMount } from "svelte"
	import Modal from "../Modal.svelte"
	import { deleteExpansion, fetchExpansions } from "../utils/api.js"
	import ExpansionForm from "./ExpansionForm.svelte"

	import MaterialSymbolsDelete from "virtual:icons/material-symbols/delete-outline"
	import MaterialSymbolsEdit from "virtual:icons/material-symbols/edit-outline"
	import Pagination from "./Pagination.svelte"
	export let hidden

	// TODO: this should all be in stores as it is used quite widely by the subcomponents..
	let data = []
	let limit = "5"
	let currentPage = 1
	let totalPages
	let sort = "ASC"

	let selectedDefault = {
		trigger: "",
		expansion: "",
		tags: [],
		img: "placeholder.png",
	}
	let selected = { ...selectedDefault }
	let searchTerms
	let defaultResponse = "(API info will appear here..)"
	let apiResponseData = defaultResponse
	let stats = "[Statistics will appear here..]"

	const updateExpansionList = async (searchTerm, limit, offset, sort) => {
		const response = await fetchExpansions(
			searchTerm,
			limit ? parseInt(limit) : 5,
			offset,
			sort
		)
		// IF the total response is a single page, set current page to 1 also.
		// otherwise, so long as the current page is less than the total, keep it.
		// otherwise, set it to total pages.
		totalPages = response.total_pages
		// Handle case where total pages could be 0..
		// it makes no sense to show 0/0 pages..
		if (totalPages === 0) {
			totalPages = 1
		}
		if (totalPages === 1 || currentPage > totalPages) {
			currentPage = 1
		}

		data = response.expansions
		stats = `Expansions: ${response.total_found} of ${response.total_expansions}, Tags: ${response.total_tags}`
	}

	const highlightText = (searchTerm, text) => {
		if (!searchTerm) return text
		const regex = new RegExp(searchTerm, "gi")
		return text.replace(
			regex,
			(match) => `<span class="highlight">${match}</span>`
		)
	}

	const apiResponse = async (payload) => {
		const msg = payload.message
		const err = payload?.error
		apiResponseData = err || msg
		// Reset the message after 3 seconds..
		setTimeout(() => (apiResponseData = defaultResponse), 3000)
	}

	onMount(async () => {
		await updateExpansionList(searchTerms)
	})
</script>

<Modal {hidden}>
	<div class="container">
		<div class="Browser">
			<div class="Browser-Title text-center">
				<h2>Available Expansions:</h2>
			</div>
			<div class="Expansion-List">
				<ul>
					{#if data.length === 0}
						<li>
							No expansions found matching your search term - "{searchTerms}"..
						</li>
					{:else}
						{#each data as expansion}
							<li class="expansion">
								<span class="expansion-name">
									{@html highlightText(
										searchTerms,
										expansion.trigger
									)}
								</span>
								<span class="expansion-tags"
									>{@html highlightText(
										searchTerms,
										expansion.tags.join(", ")
									)}</span>
								<button
									on:click={() =>
										(selected = { ...expansion })}
									class="expansion-btn">
									<MaterialSymbolsEdit />
								</button>
								<button
									on:click={async () => {
										await deleteExpansion(
											expansion,
											apiResponse
										)
										await updateExpansionList()
										selected = { ...selectedDefault }
									}}
									class="expansion-btn">
									<MaterialSymbolsDelete />
								</button>
							</li>
						{/each}
					{/if}
				</ul>
			</div>
			<div class="Search-Tools text-center">
				<Pagination
					bind:limit
					bind:currentPage
					bind:totalPages
					bind:sort
					{updateExpansionList} />
				<input
					class="input search-expansions"
					type="text"
					placeholder="Type to search.."
					bind:value={searchTerms}
					on:keyup={async () =>
						await updateExpansionList(
							searchTerms,
							limit,
							0,
							sort
						)} />
			</div>
		</div>
		<ExpansionForm
			on:refresh={async () => await updateExpansionList(searchTerms)}
			bind:selected
			{apiResponse}
			{selectedDefault} />
		<div class="Footer">
			<span class="footer-info"> [{stats}] - {apiResponseData} </span>
			<button class="btn btn-default" on:click={() => (hidden = true)}>
				Close
			</button>
		</div>
	</div>
</Modal>

<style>
	.search-expansions {
		margin-top: var(--mgn-small);
		margin-bottom: var(--mgn-default);
	}
	.input {
		display: block;
		width: 100%;
	}

	.Expansion-List > ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	.expansion-name {
		font-weight: bold;
		margin-right: var(--mgn-large);
		align-self: center;
	}

	.expansion-tags {
		color: var(--secondary);
		font-size: var(--fmd);
		font-style: italic;
		align-self: center;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	/* Our modal grid.. */
	.container {
		position: relative;
		display: grid;
		padding: var(--pad-large);
		grid-template-columns: 1fr 2fr;
		grid-template-rows: 1fr auto;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-template-areas:
			"Browser Data"
			"Footer Footer";
		height: 100%;
	}

	.Footer {
		display: grid;
		grid-template-columns: auto auto;
		grid-area: Footer;
		padding-top: var(--pad-large);
		justify-content: space-between;
		border-top: 2px solid var(--bd);
	}

	.Browser {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-template-areas:
			"Browser-Title Browser-Title Browser-Title"
			"Expansion-List Expansion-List Expansion-List"
			"Search-Tools Search-Tools Search-Tools";
		grid-area: Browser;
		border-right: 2px solid var(--bd);
		padding: var(--pad-large);
	}

	.Browser-Title {
		grid-area: Browser-Title;
	}

	.Expansion-List {
		grid-area: Expansion-List;
		overflow-y: auto;
		contain: size;
		border-width: 2px;
		border-color: var(--bd);
		border-style: solid;
		border-top-right-radius: var(--rad-default);
		border-top-left-radius: var(--rad-default);
		border-bottom-right-radius: var(--rad-default);
		border-bottom-left-radius: var(--rad-default);
	}

	.expansion {
		display: grid;
		grid-template-columns: auto 1fr auto auto;
		padding: var(--pad-small);
	}

	.expansion {
		/* top, left, bottom, right */
		border-style: solid;
		border-color: var(--bd);
		border-width: 0px 0px 2px 0px;
	}
	.expansion button {
		background: none;
		border: none;
		color: var(--fg);
		cursor: pointer;
		padding: var(--pad-default);
	}
	.expansion button:hover {
		background-color: var(--fg-dark);
	}
	.expansion button:first-of-type {
		border-top-left-radius: var(--rad-small);
		border-bottom-left-radius: var(--rad-small);
	}
	.expansion button:last-of-type {
		border-top-right-radius: var(--rad-small);
		border-bottom-right-radius: var(--rad-small);
	}

	.Search-Tools {
		grid-area: Search-Tools;
	}
	.search-expansions {
		margin-top: var(--mgn-large);
		/* margin-bottom: 0.5rem; */
	}
	.footer-info {
		align-self: center;
		color: var(--secondary);
		font-size: var(--fmd);
	}
</style>
