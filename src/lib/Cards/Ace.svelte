<script lang="ts">
	import CardNumberTypeTop from "../CardComponent/CardNumberTypeTop.svelte"
	import CardNumberTypeBottom from "../CardComponent/CardNumberTypeBottom.svelte"
	import Component from "../Component.svelte"
	import type { component } from "../../types/Cards"

	let {
		class_props,
		component,
	}: { class_props: string; component: component } = $props()
</script>

<CardNumberTypeTop {component} {class_props} card_number="A" />

<span
	class="w-20 aspect-square absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 center-svg-md"
>
	<Component {component} {class_props} />
</span>
<span
	class="w-10 aspect-square absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 center-svg_-md"
>
	<Component {component} {class_props} />
</span>
<CardNumberTypeBottom {component} {class_props} card_number="A" />
