<script lang="ts">
	import type { ComponentType } from "svelte"
	import CardNumberTypeTop from "../CardComponent/CardNumberTypeTop.svelte"
	import CardNumberTypeBottom from "../CardComponent/CardNumberTypeBottom.svelte"

	import type { component } from "../../types/Cards"
	let {
		Component,
		class_props,
	}: { Component: component; class_props: string } = $props()
</script>

<CardNumberTypeTop {Component} {class_props} card_number="K" />

<span
	class="w-full aspect-square absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
>
	<img
		draggable="false"
		src="src\assets\king_no_type.png"
		alt=""
		class="w-4/5 mx-auto"
	/>
</span>
<CardNumberTypeBottom {Component} {class_props} card_number="K" />
