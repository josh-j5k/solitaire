<script lang="ts">
	import CardNumberTypeBottom from "../CardComponent/CardNumberTypeBottom.svelte"
	import CardNumberTypeTop from "../CardComponent/CardNumberTypeTop.svelte"
	import type { component } from "../../types/Cards"
	let {
		Component,
		class_props,
	}: { Component: component; class_props: string } = $props()
</script>

<CardNumberTypeTop {Component} {class_props} card_number="2" />
<CardNumberTypeBottom {Component} {class_props} card_number="2" />
<div class="flex flex-col items-center justify-between h-full py-4">
	<span class="w-8 aspect-square">
		<Component {class_props} />
	</span>
	<span class="w-8 aspect-square rotate-180">
		<Component {class_props} />
	</span>
</div>
