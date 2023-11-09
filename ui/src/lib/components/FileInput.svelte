<script>
	export let allowedImageTypes = ".jpg, .jpeg, .png, .webp"
	export let displayFilename
	export let fileInput = undefined
	export let files = undefined
	const triggerUpload = () => fileInput.click()
</script>

<label for="current-image">Current Image: </label>
<!-- Input to display current or uploaded image filename. -->
<input
	name="current-image"
	class="current-img"
	type="text"
	bind:value={displayFilename}
	readonly
	disabled />

<!-- Button to trigger the file input programmatically. -->
<button class="btn btn-default" on:click={triggerUpload}>
	<!-- Hidden input which actually let's you upload the image. -->
	<input
		bind:this={fileInput}
		bind:files
		on:change
		class="uploaded-img"
		type="file"
		accept={allowedImageTypes} />
	Upload File
</button>

<style>
	.current-img {
		display: block;
		width: 100%;
		margin-bottom: var(--mgn-large);
	}
	input[type="file"] {
		display: none;
	}
	label {
		display: block;
		width: 100%;
		margin-top: var(--mgn-default);
		margin-bottom: var(--mgn-default);
	}
</style>
