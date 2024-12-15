<script lang="ts">
	import type { component } from "../../types/Cards"
	let {
		Component,
		class_props,
		classes,
	}: { Component: component; class_props: string; classes: string } = $props()
</script>

<span class={classes}>
	<Component {class_props} />
</span>
