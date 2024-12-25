<script lang="ts">
	import CardNumberTypeTop from "../CardComponent/CardNumberTypeTop.svelte"
	import CardNumberTypeBottom from "../CardComponent/CardNumberTypeBottom.svelte"
	import type { component } from "../../types/Cards"

	let {
		class_props,
		component,
	}: { class_props: string; component: component } = $props()
</script>

<CardNumberTypeTop {component} {class_props} card_number="J" />

<div class="relative h-full flex items-center">
	<span class="w-full aspect-square">
		<img
			draggable="false"
			src="/src/assets/jack_no_type.png"
			alt=""
			class="w-4/5 -lg:w-3/5 mx-auto"
		/>
	</span>
</div>

<CardNumberTypeBottom {component} {class_props} card_number="J" />
