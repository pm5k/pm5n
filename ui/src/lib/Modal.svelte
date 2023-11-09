<script>
	export let hidden
</script>

<!--
	NOTE: this can be done via CSS or conditional mounting,
	but I do not think losing state is good UX here, so hiding
	seems more appropriate..?
-->
<div class={`modal ${hidden ? "hidden" : ""}`}>
	<div class="modal-inner">
		<slot />
	</div>
</div>

<style>
	.modal {
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		/* Special case where a color variable is not used.. */
		background-color: rgba(0, 0, 0, 0.4);
	}

	.hidden {
		display: none;
	}

	.modal-inner {
		background-color: var(--bg);
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		width: 70%;
		height: fit-content;
		margin: auto;
		-webkit-box-shadow: 0px 0px 25px 10px rgba(0, 0, 0, 0.65);
		box-shadow: 0px 0px 25px 10px rgba(0, 0, 0, 0.65);
		border-radius: var(--rad-default);
	}
</style>
