<script lang="ts">
	import CardNumberTypeTop from "../CardComponent/CardNumberTypeTop.svelte"
	import CardNumberTypeBottom from "../CardComponent/CardNumberTypeBottom.svelte"
	import type { component } from "../../types/Cards"

	let {
		class_props,
		component,
	}: { class_props: string; component: component } = $props()
</script>

<CardNumberTypeTop {component} {class_props} card_number="Q" />

<span
	class="w-full block aspect-square absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
>
	<img
		draggable="false"
		src="src\assets\queen_no_type.png"
		alt=""
		class="w-3/5 mx-auto"
	/>
</span>
<CardNumberTypeBottom {component} {class_props} card_number="Q" />
