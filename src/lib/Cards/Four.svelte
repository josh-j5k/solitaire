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
<div class="flex justify-center h-full py-4 px-6 -lg:hidden">
	<div class="flex justify-between gap-3">
		<div class="flex flex-col justify-between">
			<CardType classes="w-6 aspect-square" {component} />

			<CardType classes="w-6 aspect-square rotate-180" {component} />
		</div>
		<div class="flex flex-col justify-between">
			<CardType classes="w-6 aspect-square" {component} />

			<CardType classes="w-6 aspect-square rotate-180" {component} />
		</div>
	</div>
</div>
<span class="w-6 aspect-square absolute inset-0 m-auto lg:hidden">
	<Component {component} />
</span>
