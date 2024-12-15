<script lang="ts">
	import CardNumberTypeBottom from "../CardComponent/CardNumberTypeBottom.svelte"
	import CardNumberTypeTop from "../CardComponent/CardNumberTypeTop.svelte"
	import CardType from "../CardComponent/CardType.svelte"
	import type { component } from "../../types/Cards"
	let {
		Component,
		class_props,
	}: { Component: component; class_props: string } = $props()
</script>

<CardNumberTypeTop {Component} {class_props} card_number="9" />
<CardNumberTypeBottom {Component} {class_props} card_number="9" />
<div class="flex justify-between h-full py-4 px-6">
	<div class="flex flex-col justify-between">
		<CardType classes="w-8 aspect-square" {Component} {class_props} />
		<CardType classes="w-8 aspect-square" {Component} {class_props} />

		<CardType
			classes="w-8 aspect-square rotate-180"
			{Component}
			{class_props}
		/>
		<CardType
			classes="w-8 aspect-square rotate-180"
			{Component}
			{class_props}
		/>
	</div>
	<div class="flex justify-center items-center">
		<CardType classes="w-8 aspect-square" {Component} {class_props} />
	</div>
	<div class="flex flex-col justify-between">
		<CardType classes="w-8 aspect-square" {Component} {class_props} />
		<CardType classes="w-8 aspect-square" {Component} {class_props} />

		<CardType
			classes="w-8 aspect-square rotate-180"
			{Component}
			{class_props}
		/>
		<CardType
			classes="w-8 aspect-square rotate-180"
			{Component}
			{class_props}
		/>
	</div>
</div>
