<script lang="ts">
	import type { component } from "../../types/Cards"
	import CardNumberTypeTop from "../CardComponent/CardNumberTypeTop.svelte"
	import CardNumberTypeBottom from "../CardComponent/CardNumberTypeBottom.svelte"

	let {
		Component,
		class_props,
	}: { Component: component; class_props: string } = $props()
</script>

<CardNumberTypeTop {Component} {class_props} card_number="A" />

<span
	class="w-20 aspect-square absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
>
	<Component {class_props} />
</span>
<CardNumberTypeBottom {Component} {class_props} card_number="A" />
