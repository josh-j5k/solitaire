<script lang="ts">
	import type { ComponentType } from "svelte"

	export let component: ComponentType
	export let class_props: string
	export let card_number: string
</script>

<div class="absolute top-1 left-2 flex flex-col items-center">
	<span class="font-bold text-xl text-{class_props}">
		{card_number}
	</span>
	<span class="w-3 aspect-square">
		<svelte:component this={component} {class_props} />
	</span>
</div>
