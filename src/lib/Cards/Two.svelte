<script lang="ts">
	import CardNumberTypeBottom from "../CardComponent/CardNumberTypeBottom.svelte"
	import CardNumberTypeTop from "../CardComponent/CardNumberTypeTop.svelte"
	import Component from "../Component.svelte"
	import type { component } from "../../types/Cards"

	let {
		class_props,
		component,
	}: { class_props: string; component: component } = $props()
</script>

<CardNumberTypeTop {component} {class_props} card_number="2" />
<CardNumberTypeBottom {component} {class_props} card_number="2" />
<div class="flex-col items-center justify-between h-full py-4 center-svg-md">
	<span class="w-8 aspect-square">
		<Component {component} {class_props} />
	</span>
	<span class="w-8 aspect-square rotate-180">
		<Component {component} {class_props} />
	</span>
</div>
<span
	class="w-10 aspect-square absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 center-svg_-md"
>
	<Component {component} {class_props} />
</span>
