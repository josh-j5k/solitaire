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

<CardNumberTypeTop {component} {class_props} card_number="5" />
<CardNumberTypeBottom {component} {class_props} card_number="5" />
<div class="flex justify-between h-full py-4 px-6 -lg:hidden">
	<div class="flex flex-col justify-between">
		<CardType classes="w-6 aspect-square" {component} {class_props} />

		<CardType
			classes="w-6 aspect-square rotate-180"
			{component}
			{class_props}
		/>
	</div>
	<div class="flex justify-center items-center">
		<CardType classes="w-6 aspect-square" {component} {class_props} />
	</div>
	<div class="flex flex-col justify-between">
		<CardType classes="w-6 aspect-square" {component} {class_props} />

		<CardType
			classes="w-6 aspect-square rotate-180"
			{component}
			{class_props}
		/>
	</div>
</div>
<span
	class="w-10 aspect-square absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:hidden"
>
	<Component {component} {class_props} />
</span>
