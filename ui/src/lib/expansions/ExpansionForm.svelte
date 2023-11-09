<script>
	import { createEventDispatcher } from "svelte"
	import FileInput from "../components/FileInput.svelte"
	import { saveExpansion } from "../utils/api"
	import { UPLOAD_URL } from "../utils/constants"

	// TODO: the upload name handling logic could be done better,
	// again, stores would fix this easily..
	export let selected
	export let selectedDefault
	export let apiResponse
	let fileList
	let imageData
	$: displayFilename = selected.img

	const dispatch = createEventDispatcher()
	const refetchExpansions = async () => dispatch("refresh")

	const processImgData = async (event) => {
		const input = event.target
		if (input.files && input.files[0]) {
			const file = input.files[0]
			const reader = new FileReader()

			reader.onload = async (event) => (imageData = event.target.result)
			await reader.readAsDataURL(file)
			displayFilename = file.name
		}
	}
</script>

<div class="Data">
	<div class="Data-Title text-center">
		<h2>
			{selected.trigger && selected.id ? "Edit " : "Create "} Expansion: {selected.trigger
				? `"${selected.trigger}"`
				: ""}
		</h2>
	</div>
	<div class="Data-Details">
		<label for="name">Name:</label>
		<input bind:value={selected.trigger} />
		<label for="expansion">Expansion:</label>
		<textarea bind:value={selected.expansion} />
		<label for="tags">Tags:</label>
		<textarea bind:value={selected.tags} />
		<FileInput
			on:change={processImgData}
			bind:files={fileList}
			{displayFilename} />
		<button
			class="btn btn-ok save-expansion"
			on:click={async () => {
				await saveExpansion(
					selected,
					imageData,
					displayFilename,
					apiResponse
				)
				await refetchExpansions()
			}}
			disabled={selected.trigger ? false : true}>
			{selected.trigger ? "Save Expansion" : "Enter Name.."}
		</button>
		<button
			class="btn btn-warn"
			on:click={() => (selected = { ...selectedDefault })}
			>Reset Form</button>
	</div>
	<div class="Data-Image">
		<img
			class="preview-img"
			alt="Expansion Preview"
			src={selected
				? `${UPLOAD_URL}${selected.img}`
				: `${UPLOAD_URL}${selectedDefault.img}`} />
	</div>
</div>

<style>
	input,
	textarea,
	label {
		display: block;
		width: 100%;
	}
	textarea {
		resize: vertical;
		min-height: 75px;
	}
	label {
		margin-bottom: var(--mgn-default);
	}
	label:not(:first-child) {
		margin-top: var(--mgn-default);
	}
	input:last-of-type {
		margin-bottom: var(--mgn-large);
	}
	.Data {
		display: grid;
		grid-template-columns: 3fr 3fr;
		grid-template-rows: auto 1fr;
		grid-auto-columns: 1fr;
		grid-auto-rows: 1fr;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-template-areas:
			"Data-Title Data-Title"
			"Data-Details Data-Image";
		grid-area: Data;
		padding: var(--pad-large);
	}

	.Data-Title {
		grid-area: Data-Title;
	}

	.Data-Details {
		grid-area: Data-Details;
		padding: var(--pad-large);
	}

	.Data-Image {
		grid-area: Data-Image;
		text-align: right;
		overflow: hidden;
		text-align: center;
		border: 1px solid var(--bd);
		border-radius: var(--rad-default);
		padding: var(--pad-large);
		margin-left: var(--mgn-large);
	}
	.Data-Image img {
		max-width: 100%;
		height: auto;
	}
</style>
