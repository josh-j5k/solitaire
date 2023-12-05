<script lang="ts">
	import Card from "./lib/CardFaceDown.svelte"
	import Ace from "./lib/Cards/Ace.svelte"
	import Two from "./lib/Cards/Two.svelte"
	import Spade from "./lib/icons/Spade.svelte"
	import Club from "./lib/icons/Club.svelte"
	import Diamond from "./lib/icons/Diamond.svelte"
	import Heart from "./lib/icons/Heart.svelte"
	import type { ComponentType } from "svelte"
	import Three from "./lib/Cards/Three.svelte"
	import Four from "./lib/Cards/Four.svelte"
	import Five from "./lib/Cards/Five.svelte"
	import Six from "./lib/Cards/Six.svelte"
	import Seven from "./lib/Cards/Seven.svelte"
	import Ten from "./lib/Cards/Ten.svelte"
	import Eight from "./lib/Cards/Eight.svelte"
	import Nine from "./lib/Cards/Nine.svelte"
	type cardComponent = Array<{
		component: ComponentType
		fill: string
	}>
	let components = <cardComponent>[
		{ component: Spade, fill: "_black" },
		{ component: Club, fill: "_black" },
		{ component: Heart, fill: "_red" },
		{ component: Diamond, fill: "_red" },
	]
	let dimensions = "w-full h-[200px]"
	let design = "bg-white relative rounded-[10px] cursor-default"
	function dragme(e: Event) {}
</script>

<main class="min-h-screen w-screen py-20">
	<div draggable="true" class="w-5/6 mx-auto grid gap-4 grid-cols-7">
		{#each Array(7) as _}
			<Card {dimensions} />
		{/each}
		{#each components as card}
			<div
				draggable="true"
				role="application"
				on:drag={dragme}
				class="{dimensions} {design}"
			>
				<Ace component={card.component} class_props={card.fill} />
			</div>
		{/each}
		{#each components as card}
			<div draggable="true" class="{dimensions} {design}">
				<Two component={card.component} class_props={card.fill} />
			</div>
		{/each}
		{#each components as card}
			<div draggable="true" class="{dimensions} {design}">
				<Three component={card.component} class_props={card.fill} />
			</div>
		{/each}
		{#each components as card}
			<div draggable="true" class="{dimensions} {design}">
				<Four component={card.component} class_props={card.fill} />
			</div>
		{/each}
		{#each components as card}
			<div draggable="true" class="{dimensions} {design}">
				<Five component={card.component} class_props={card.fill} />
			</div>
		{/each}
		{#each components as card}
			<div draggable="true" class="{dimensions} {design}">
				<Six component={card.component} class_props={card.fill} />
			</div>
		{/each}
		{#each components as card}
			<div draggable="true" class="{dimensions} {design}">
				<Seven component={card.component} class_props={card.fill} />
			</div>
		{/each}
		{#each components as card}
			<div draggable="true" class="{dimensions} {design}">
				<Eight component={card.component} class_props={card.fill} />
			</div>
		{/each}
		{#each components as card}
			<div draggable="true" class="{dimensions} {design}">
				<Nine component={card.component} class_props={card.fill} />
			</div>
		{/each}
		{#each components as card}
			<div draggable="true" class="{dimensions} {design}">
				<Ten component={card.component} class_props={card.fill} />
			</div>
		{/each}
	</div>
</main>

<style scoped>
	main {
		background-image: url("./assets/perfect-green-grass.jpg");
	}
	.active {
		position: absolute;
	}
</style>
