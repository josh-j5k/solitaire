<script lang="ts">
	import CardNumberTypeBottom from "../CardComponent/CardNumberTypeBottom.svelte"
	import CardNumberTypeTop from "../CardComponent/CardNumberTypeTop.svelte"
	import type { ComponentType } from "svelte"
	import CardType from "../CardComponent/CardType.svelte"
	export let component: ComponentType
	export let class_props: string
</script>

<CardNumberTypeTop {component} {class_props} card_number="3" />
<CardNumberTypeBottom {component} {class_props} card_number="3" />
<div class="flex flex-col items-center justify-between h-full py-4">
	<CardType classes="w-8 aspect-square" {component} {class_props} />
	<CardType classes="w-8 aspect-square" {component} {class_props} />
	<CardType classes="w-8 aspect-square rotate-180" {component} {class_props} />
</div>
