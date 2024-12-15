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

<CardNumberTypeTop {Component} {class_props} card_number="10" />
<CardNumberTypeBottom {Component} {class_props} card_number="10" />
<div class="flex justify-between h-full py-4 px-8">
	<div class="flex flex-col justify-between">
		<CardType classes="w-6 aspect-square " {Component} {class_props} />
		<CardType classes="w-6 aspect-square" {Component} {class_props} />

		<CardType
			classes="w-6 aspect-square rotate-180"
			{Component}
			{class_props}
		/>
		<CardType
			classes="w-6 aspect-square rotate-180"
			{Component}
			{class_props}
		/>
	</div>
	<div class="flex justify-center py-6">
		<div class="flex flex-col justify-between">
			<CardType classes="w-6 aspect-square" {Component} {class_props} />
			<CardType classes="w-6 aspect-square" {Component} {class_props} />
		</div>
	</div>
	<div class="flex flex-col justify-between">
		<CardType classes="w-6 aspect-square" {Component} {class_props} />
		<CardType classes="w-6 aspect-square" {Component} {class_props} />

		<CardType
			classes="w-6 aspect-square rotate-180"
			{Component}
			{class_props}
		/>
		<CardType
			classes="w-6 aspect-square rotate-180"
			{Component}
			{class_props}
		/>
	</div>
</div>
