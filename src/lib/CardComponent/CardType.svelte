<script lang="ts">
	import type { ComponentType } from "svelte"

	export let component: ComponentType
	export let class_props: string
	export let classes: string
</script>

<span class={classes}>
	<svelte:component this={component} {class_props} />
</span>
