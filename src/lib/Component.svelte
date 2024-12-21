<script lang="ts">
	import type { component } from "../types/Cards"
	import Club from "./icons/Club.svelte"
	import Diamond from "./icons/Diamond.svelte"
	import Heart from "./icons/Heart.svelte"
	import Spade from "./icons/Spade.svelte"

	let { component }: { component: component } = $props()
</script>

{#if component === "Spade"}
	<Spade />
{:else if component === "Club"}
	<Club />
{:else if component === "Diamond"}
	<Diamond />
{:else}
	<Heart />
{/if}
