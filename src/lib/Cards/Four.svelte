<script lang="ts">
	import CardNumberTypeBottom from "../CardComponent/CardNumberTypeBottom.svelte"
	import CardNumberTypeTop from "../CardComponent/CardNumberTypeTop.svelte"
	import type { ComponentType } from "svelte"
	import CardType from "../CardComponent/CardType.svelte"
	export let component: ComponentType
	export let class_props: string
</script>

<CardNumberTypeTop {component} {class_props} card_number="4" />
<CardNumberTypeBottom {component} {class_props} card_number="4" />
<div class="flex justify-between h-full py-4 px-6">
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
