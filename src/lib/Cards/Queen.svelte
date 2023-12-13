<script lang="ts">
	import type { ComponentType } from "svelte"
	import CardNumberTypeTop from "../CardComponent/CardNumberTypeTop.svelte"
	import CardNumberTypeBottom from "../CardComponent/CardNumberTypeBottom.svelte"

	export let component: ComponentType
	export let class_props: string
</script>

<CardNumberTypeTop {component} {class_props} card_number="Q" />

<span
	class="w-full aspect-square absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
>
	<img
		draggable="false"
		src="src\assets\queen_no_type.png"
		alt=""
		class="w-4/5 mx-auto"
	/>
</span>
<CardNumberTypeBottom {component} {class_props} card_number="Q" />
