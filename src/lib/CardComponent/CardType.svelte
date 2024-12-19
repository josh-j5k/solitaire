<script lang="ts">
	import Component from "../Component.svelte"
	import type { component } from "../../types/Cards"

	let {
		class_props,
		component,
		classes,
	}: { class_props: string; component: component; classes: string } = $props()
</script>

<span class={classes}>
	<Component {component} {class_props} />
</span>
