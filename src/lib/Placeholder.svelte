<script lang="ts">
	import type { ComponentType } from "svelte"
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
	type card = {
		card: string
		component?: ComponentType
	}
	export let card: card
	let class_props: string
	let component: ComponentType

	if (card?.component) {
		component = card.component
	}
	if (card?.component === Spade || card?.component === Club) {
		class_props = "_black"
	} else {
		class_props = "_red"
	}
</script>

{#if card?.component}
	{#if card?.card === "Ace"}
		<Ace {component} {class_props} />
	{:else if card?.card === "King"}
		<King {component} {class_props} />
	{:else if card?.card === "Queen"}
		<Queen {component} {class_props} />
	{:else if card?.card === "Jack"}
		<Jack {component} {class_props} />
	{:else if card?.card === "Two"}
		<Two {component} {class_props} />
	{:else if card?.card === "Three"}
		<Three {component} {class_props} />
	{:else if card?.card === "Four"}
		<Four {component} {class_props} />
	{:else if card?.card === "Five"}
		<Five {component} {class_props} />
	{:else if card?.card === "Six"}
		<Six {component} {class_props} />
	{:else if card?.card === "Seven"}
		<Seven {component} {class_props} />
	{:else if card?.card === "Eight"}
		<Eight {component} {class_props} />
	{:else if card?.card === "Nine"}
		<Nine {component} {class_props} />
	{:else}
		<Ten {component} {class_props} />
	{/if}
{/if}
