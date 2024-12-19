<script lang="ts">
	import type { component } from "../types/Cards"
	import Club from "./icons/Club.svelte"
	import Diamond from "./icons/Diamond.svelte"
	import Heart from "./icons/Heart.svelte"
	import Spade from "./icons/Spade.svelte"

	let {
		component,
		class_props,
	}: { component: component; class_props: string } = $props()
</script>

{#if component === "Spade"}
	<Spade {class_props} />
{:else if component === "Club"}
	<Club {class_props} />
{:else if component === "Diamond"}
	<Diamond {class_props} />
{:else}
	<Heart {class_props} />
{/if}
