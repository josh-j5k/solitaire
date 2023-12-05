<script lang="ts">
	import CardNumberTypeBottom from "../CardComponent/CardNumberTypeBottom.svelte"
	import CardNumberTypeTop from "../CardComponent/CardNumberTypeTop.svelte"
	import type { ComponentType } from "svelte"

	export let component: ComponentType
	export let class_props: string
</script>

<CardNumberTypeTop {component} {class_props} card_number="2" />
<CardNumberTypeBottom {component} {class_props} card_number="2" />
<div class="flex flex-col items-center justify-between h-full py-4">
	<span class="w-8 aspect-square">
		<svelte:component this={component} {class_props} />
	</span>
	<span class="w-8 aspect-square rotate-180">
		<svelte:component this={component} {class_props} />
	</span>
</div>
