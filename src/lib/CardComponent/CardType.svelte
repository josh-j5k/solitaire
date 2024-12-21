<script lang="ts">
	import Component from "../Component.svelte"
	import type { component } from "../../types/Cards"

	let { component, classes }: { component: component; classes: string } =
		$props()
</script>

<span class={classes}>
	<Component {component} />
</span>
