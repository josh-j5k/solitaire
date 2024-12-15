<script lang="ts">
	import Ace from "./Cards/Ace.svelte"
	import Queen from "./Cards/Queen.svelte"
	import King from "./Cards/King.svelte"
	import Jack from "./Cards/Jack.svelte"
	import Ten from "./Cards/Ten.svelte"
	import Nine from "./Cards/Nine.svelte"
	import Eight from "./Cards/Eight.svelte"
	import Seven from "./Cards/Seven.svelte"
	import Six from "./Cards/Six.svelte"
	import Five from "./Cards/Five.svelte"
	import Four from "./Cards/Four.svelte"
	import Three from "./Cards/Three.svelte"
	import Two from "./Cards/Two.svelte"
	import Spade from "./icons/Spade.svelte"
	import Club from "./icons/Club.svelte"
	import type { card, component } from "../types/Cards"
	let { card }: { card: card } = $props()
	let class_props = $state<string>()
	let Component = card.component

	if (card?.component === Spade || card?.component === Club) {
		class_props = "_black"
	} else {
		class_props = "_red"
	}
</script>

{#if card?.card === "Ace"}
	<Ace {Component} {class_props} />
{:else if card?.card === "King"}
	<King {Component} {class_props} />
{:else if card?.card === "Queen"}
	<Queen {Component} {class_props} />
{:else if card?.card === "Jack"}
	<Jack {Component} {class_props} />
{:else if card?.card === "Two"}
	<Two {Component} {class_props} />
{:else if card?.card === "Three"}
	<Three {Component} {class_props} />
{:else if card?.card === "Four"}
	<Four {Component} {class_props} />
{:else if card?.card === "Five"}
	<Five {Component} {class_props} />
{:else if card?.card === "Six"}
	<Six {Component} {class_props} />
{:else if card?.card === "Seven"}
	<Seven {Component} {class_props} />
{:else if card?.card === "Eight"}
	<Eight {Component} {class_props} />
{:else if card?.card === "Nine"}
	<Nine {Component} {class_props} />
{:else}
	<Ten {Component} {class_props} />
{/if}
