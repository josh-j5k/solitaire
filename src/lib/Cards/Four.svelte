<script lang="ts">
	import CardNumberTypeBottom from "../CardComponent/CardNumberTypeBottom.svelte"
	import CardNumberTypeTop from "../CardComponent/CardNumberTypeTop.svelte"
	import CardType from "../CardComponent/CardType.svelte"
	import type { component } from "../../types/Cards"
	import Component from "../Component.svelte"

	let {
		class_props,
		component,
	}: { class_props: string; component: component } = $props()
</script>

<CardNumberTypeTop {component} {class_props} card_number="4" />
<CardNumberTypeBottom {component} {class_props} card_number="4" />
<div class="justify-between h-full py-4 px-6 center-svg-md">
	<div class="flex flex-col justify-between">
		<CardType classes="w-8 aspect-square" {component} {class_props} />

		<CardType
			classes="w-8 aspect-square rotate-180"
			{component}
			{class_props}
		/>
	</div>
	<div class="flex flex-col justify-between">
		<CardType classes="w-8 aspect-square" {component} {class_props} />

		<CardType
			classes="w-8 aspect-square rotate-180"
			{component}
			{class_props}
		/>
	</div>
</div>
<span
	class="w-10 aspect-square absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 center-svg_-md"
>
	<Component {component} {class_props} />
</span>
