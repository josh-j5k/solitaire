<script lang="ts">
	import CardNumberTypeBottom from "../CardComponent/CardNumberTypeBottom.svelte"
	import CardNumberTypeTop from "../CardComponent/CardNumberTypeTop.svelte"
	import CardType from "../CardComponent/CardType.svelte"
	import Component from "../Component.svelte"
	import type { component } from "../../types/Cards"

	let {
		class_props,
		component,
	}: { class_props: string; component: component } = $props()
</script>

<CardNumberTypeTop {component} {class_props} card_number="3" />
<CardNumberTypeBottom {component} {class_props} card_number="3" />
<div class="flex flex-col items-center justify-between h-full py-4 -lg:hidden">
	<CardType classes="w-6 aspect-square" {component} />
	<CardType classes="w-6 aspect-square" {component} />
	<CardType classes="w-6 aspect-square rotate-180" {component} />
</div>
<span class="w-6 aspect-square absolute m-auto inset-0 lg:hidden">
	<Component {component} />
</span>
