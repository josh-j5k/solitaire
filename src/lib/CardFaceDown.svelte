<script lang="ts">
	export let dimensions: string
</script>

<div class={dimensions}> </div>

<style scoped>
	div {
		position: relative;
		background-image: url("../assets/883954_2109_NEW.jpg");
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		background-color: #b6b6b6;
		border-radius: 10px;
		border: 2px solid white;
	}
	div::before {
		content: "";
		position: absolute;
		width: 98%;
		height: 98%;
		margin-inline: auto;
		background-color: transparent;
		inset: 0;
		top: 50%;
		transform: translateY(-50%);
		border: 1px solid white;
		border-radius: 8px;
	}
</style>
