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

<div class="relative h-full flex items-center justify-center">
	<span class="w-14 -lg:w-6 aspect-square">
		<Component {component} />
	</span>
</div>

<CardNumberTypeBottom {component} {class_props} card_number="A" />
