<script lang="ts">
	import Card from "./lib/CardFaceDown.svelte"
	import Queen from "./lib/Cards/Queen.svelte"
	import Jack from "./lib/Cards/Jack.svelte"
	import King from "./lib/Cards/King.svelte"
	import Spade from "./lib/icons/Spade.svelte"
	import Club from "./lib/icons/Club.svelte"
	import Diamond from "./lib/icons/Diamond.svelte"
	import Heart from "./lib/icons/Heart.svelte"
	import { onMount, type ComponentType, beforeUpdate } from "svelte"

	import CardFaceDown from "./lib/CardFaceDown.svelte"
	type cardComponent = Array<{
		component: ComponentType
		fill: string
	}>
	type dataGame = Array<{
		faceDown: Array<any>
		faceUp: Array<any>
	}>
	let components = <cardComponent>[
		{ component: Spade, fill: "_black" },
		{ component: Club, fill: "_black" },
		{ component: Heart, fill: "_red" },
		{ component: Diamond, fill: "_red" },
	]
	const height = 200
	type arr = Array<{
		type: string[]
		component: cardComponent
	}>
	const arr = [
		"Ace",
		"King",
		"Queen",
		"Jack",
		"Ten",
		"Nine",
		"Eight",
		"Seven",
		"Six",
		"Five",
		"Four",
		"Three",
		"Two",
	]

	const cards = arr.map((card, index) => {
		return {
			card: "heelp",
		}
	})
	console.log(cards)

	const dataGameOne = <dataGame>[
		{
			faceDown: [],
			faceUp: [],
		},
	]
	const dataGameTwo = <dataGame>[
		{
			faceDown: Array(1),
			faceUp: [],
		},
	]
	const dataGameThree = <dataGame>[
		{
			faceDown: Array(2),
			faceUp: [],
		},
	]
	const dataGameFour = <dataGame>[
		{
			faceDown: Array(3),
			faceUp: [],
		},
	]
	const dataGameFive = <dataGame>[
		{
			faceDown: Array(4),
			faceUp: [],
		},
	]
	const dataGameSix = <dataGame>[
		{
			faceDown: Array(5),
			faceUp: [],
		},
	]
	const dataGameSeven = <dataGame>[
		{
			faceDown: Array(6),
			faceUp: [],
		},
	]
	const offsetTop = 25
	let eleWidth = 0
	let eleHeight = 0
	let dimensions = "w-full" + " h-[" + height.toString() + "px]"
	let design = "bg-white relative rounded-lg cursor-default"

	function dragStart(e: DragEvent) {
		const element = e.target as HTMLDivElement
		element.id = "dragging"
		element.style.top = "0"
		if (element.classList.contains("dragged"))
			element.classList.remove("dragged")
		const img = document.createElement("img")
		eleHeight = element.clientHeight / 2
		eleWidth = element.clientWidth / 2
		img.src =
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAABtCAYAAABdsWrOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAjSURBVGhD7cExAQAAAMKg9U9tCy8gAAAAAAAAAAAAAAAAnmox0QABeT4g9gAAAABJRU5ErkJggg=="

		e.dataTransfer?.setData("text/plain", element.id)
		e.dataTransfer?.setDragImage(img, 0, 0)
	}
	function dragOver(e: DragEvent) {
		e.preventDefault()
		const element = e.target as HTMLElement

		if (e.dataTransfer != null) {
			e.dataTransfer.dropEffect = "move"
		}
	}

	function drag(e: DragEvent) {
		const dragoverZone = document.querySelectorAll(".dragover_zone")
		dragoverZone.forEach((zone) => {
			zone.classList.add("show")
		})
		const element = e.target as HTMLDivElement
		element.classList.add("dragging")
		const parent = element.offsetParent as HTMLDivElement
		let centerX = e.clientX - parent.offsetLeft - eleWidth
		let centerY = e.clientY - parent.offsetTop - eleHeight + offsetTop
		element.style.transform = `translateX(${centerX.toString()}px) translateY(${centerY.toString()}px)`
	}
	function dragEnd(e: DragEvent) {
		const dragoverZone = document.querySelectorAll(".dragover_zone")
		const element = e.target as HTMLDivElement
		element.style.transform = "translate(0)"
		element.classList.remove("dragging")
		dragoverZone.forEach((zone) => {
			zone.classList.remove("show")
		})
	}
	function drop(e: DragEvent) {
		e.preventDefault()
		const element = e.target as HTMLElement
		const parent = element.parentElement
		const id = e.dataTransfer?.getData("text/plain")!
		const data = document.getElementById(id)!
		parent?.appendChild(data)
		const index = parent?.children.length! - 2
		const top = index * offsetTop
		data.classList.add("dragged")
		data.style.top = top.toString() + "px"
		data.id = ""
	}
	onMount(() => {
		const containingBlock = document.querySelectorAll(".containing_block")
		containingBlock.forEach((block) => {
			let ele = block as HTMLElement
			const length = block.children.length
			const adjLength = length - 1
			const newHeight = adjLength * offsetTop + height
			ele.style.height = newHeight.toString() + "px"
			for (let index = 0; index < length; index++) {
				const top = (index - 1) * offsetTop
				const element = block.children[index] as HTMLDivElement
				if (index > 0) {
					element.style.top = top.toString() + "px"
					element.style.position = "absolute"
				}
			}
		})
	})
</script>

<main
	on:dragover={dragOver}
	role="application"
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
			class="relative h-[200px] col-start-4 col-end-5 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
		</div>
		<div
			data-stack="2"
			class="relative h-[200px] col-start-5 col-end-6 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
		</div>
		<div
			data-stack="3"
			class="relative w-full h-[200px] col-start-6 col-end-7 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
		</div>
		<div
			data-stack="4"
			class="relative h-[200px] col-start-7 col-end-8 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
		</div>
		<div
			data-game="1"
			class="relative col-start-1 containing_block col-end-2 row-start-2 row-end-3"
			><div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			<div
				draggable="true"
				role="application"
				on:dragstart={dragStart}
				on:drag={drag}
				on:dragend={dragEnd}
				class="{dimensions} {design}"
			>
				<Jack
					component={components[0].component}
					class_props={components[0].fill}
				/>
			</div>
		</div>
		<div
			data-game="2"
			class="relative col-start-2 col-end-3 row-start-2 row-end-3 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each dataGameTwo[0].faceDown as _}
				<CardFaceDown {dimensions} />
			{/each}
		</div>
		<div
			data-game="3"
			class="relative col-start-3 col-end-4 row-start-2 row-end-3 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each dataGameThree[0].faceDown as _}
				<CardFaceDown {dimensions} />
			{/each}
		</div>
		<div
			data-game="4"
			class="relative col-start-4 col-end-5 row-start-2 row-end-3 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each dataGameFour[0].faceDown as _}
				<CardFaceDown {dimensions} />
			{/each}
		</div>
		<div
			data-game="5"
			class="relative col-start-5 col-end-6 row-start-2 row-end-3 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each dataGameFive[0].faceDown as _}
				<CardFaceDown {dimensions} />
			{/each}
		</div>
		<div
			data-game="6"
			class="relative col-start-6 col-end-7 row-start-2 row-end-3 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			></div>
			{#each dataGameSix[0].faceDown as _}
				<CardFaceDown {dimensions} />
			{/each}
		</div>
		<div
			data-game="7"
			class="relative col-start-7 col-end-8 row-start-2 row-end-3 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each dataGameSeven[0].faceDown as _}
				<CardFaceDown {dimensions} />
			{/each}
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
		z-index: 10;
	}
	.dragover_zone {
		z-index: -1;
	}
	.dragover_zone.show {
		z-index: 999;
	}
	.dragged {
		position: absolute;
	}
</style>
