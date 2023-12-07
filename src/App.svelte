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
	import CardFaceDown from "./lib/CardFaceDown.svelte"
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

	let eleWidth = 0
	let eleHeight = 0
	let dimensions = "w-full h-[200px]"
	let design = "bg-white relative rounded-[10px] cursor-default"
	function dragStart(e: DragEvent) {
		const element = e.target as HTMLDivElement
		const img = document.createElement("img")
		eleHeight = element.clientHeight / 2
		eleWidth = element.clientWidth / 2
		img.src =
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAABtCAYAAABdsWrOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAjSURBVGhD7cExAQAAAMKg9U9tCy8gAAAAAAAAAAAAAAAAnmox0QABeT4g9gAAAABJRU5ErkJggg=="

		e.dataTransfer?.setDragImage(img, 0, 0)
	}
	function changeCursor(e: DragEvent) {
		e.preventDefault()
		if (e.dataTransfer != null) {
			e.dataTransfer.dropEffect = "move"
		}
	}
	function drag(e: DragEvent) {
		const element = e.target as HTMLDivElement
		element.classList.add("dragging")
		const parent = element.offsetParent as HTMLDivElement
		let centerX = e.clientX - parent.offsetLeft - eleWidth
		let centerY = e.clientY - parent.offsetTop - eleHeight
		element.style.transform = `translateX(${centerX.toString()}px) translateY(${centerY.toString()}px)`
	}
	function dragEnd(e: DragEvent) {
		const element = e.target as HTMLDivElement
		element.style.transform = "translate(0)"
		element.classList.remove("dragging")
	}
</script>

<main
	on:dragover={changeCursor}
	class="min-h-screen w-screen py-20 overflow-hidden"
>
	<div class="w-5/6 mx-auto grid gap-4 grid-cols-7">
		<div data-deck class="relative col-start-1 col-end-2 row-start-1 row-end-2">
			<CardFaceDown {dimensions} />
		</div>
		<div
			data-deck-revealed
			class="relative col-start-2 col-end-3 row-start-1 row-end-2"
		>
		</div>
		<div
			data-stack="1"
			class="relative h-[200px] col-start-4 col-end-5 row-start-1 row-end-2 border-4 rounded-lg border-gray-100"
		>
		</div>
		<div
			data-stack="2"
			class="relative h-[200px] col-start-5 col-end-6 row-start-1 row-end-2 border-4 rounded-lg border-gray-100"
		>
		</div>
		<div
			data-stack="3"
			class="relative h-[200px] col-start-6 col-end-7 row-start-1 row-end-2 border-4 rounded-lg border-gray-100"
		>
		</div>
		<div
			data-stack="4"
			class="relative h-[200px] col-start-7 col-end-8 row-start-1 row-end-2 border-4 rounded-lg border-gray-100"
		>
		</div>
		<div
			data-game="1"
			class="relative col-start-1 col-end-2 row-start-2 row-end-3"
		>
			<div
				draggable="true"
				role="application"
				on:dragstart={dragStart}
				on:drag={drag}
				on:dragend={dragEnd}
				class="{dimensions} {design}"
			>
				<Ace
					component={components[0].component}
					class_props={components[0].fill}
				/>
			</div>
		</div>
		<div
			data-game="2"
			class="relative col-start-2 col-end-3 row-start-2 row-end-3"
		>
			<div class="absolute w-full">
				<CardFaceDown {dimensions} />
			</div>
			<div
				draggable="true"
				role="application"
				on:dragstart={dragStart}
				on:drag={drag}
				on:dragend={dragEnd}
				class="{dimensions} {design} top-6"
			>
				<Four
					component={components[1].component}
					class_props={components[1].fill}
				/>
			</div>
		</div>
		<div
			data-game="3"
			class="relative col-start-3 col-end-4 row-start-2 row-end-3"
		>
		</div>
		<div
			data-game="4"
			class="relative col-start-4 col-end-5 row-start-2 row-end-3"
		>
		</div>
		<div
			data-game="5"
			class="relative col-start-5 col-end-6 row-start-2 row-end-3"
		>
		</div>
		<div
			data-game="6"
			class="relative col-start-6 col-end-7 row-start-2 row-end-3"
		>
		</div>
		<div
			data-game="7"
			class="relative col-start-7 col-end-8 row-start-2 row-end-3"
		>
		</div>
	</div>
</main>

<style scoped>
	main {
		background-image: url("./assets/perfect-green-grass.jpg");
	}
	.dragging {
		box-shadow:
			0 0 10px 4px rgba(255, 217, 0, 0.733),
			20px 20px 0 rgba(0, 0, 0, 0.2);
		z-index: 80;
	}
</style>
