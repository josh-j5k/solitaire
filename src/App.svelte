<script lang="ts">
	import Spade from "./lib/icons/Spade.svelte"
	import Club from "./lib/icons/Club.svelte"
	import Diamond from "./lib/icons/Diamond.svelte"
	import Heart from "./lib/icons/Heart.svelte"
	import Placeholder from "./lib/Placeholder.svelte"
	import { onMount, type ComponentType } from "svelte"
	import { setCardNameAndNumberAtrribute } from "./helpers/SetCardNameAndNumberAtrribute"
	import { dragAndDrop } from "./helpers/DragAndDrop"
	import { type card, type cardComponent } from "./types/Cards"
	import CardFaceDown from "./lib/CardFaceDown.svelte"

	const { cardNumber, cardType } = setCardNameAndNumberAtrribute()
	const offsetTop = 25
	const { drag, dragEnd, dragOver, dragStart, drop } = dragAndDrop(offsetTop)
	let components = <cardComponent>[
		{ component: Spade },
		{ component: Club },
		{ component: Heart },
		{ component: Diamond },
	]
	const height = 200

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
	let activeCard: string
	let siblingCard: string
	let parentIndex: number
	let dataDeckOne: string
	let dataDeckTwo: string
	let dataDeckThree: string
	let dataDeckFour: string

	const cardTypeWithComponent = arr.map((card) => {
		return {
			card,
			components: components.map((component) => component),
		}
	})

	const Cards = <Array<card>>[]
	cardTypeWithComponent.forEach((card) => {
		card.components.forEach((component) => {
			const obj = <card>{
				card: card.card,
				component: component.component,
			}
			Cards.push(obj)
		})
	})

	const stackingRow = [
		{
			faceDown: [],
			faceUp: <Array<card>>[],
		},
		{
			faceDown: <Array<card>>[],
			faceUp: <Array<card>>[],
		},
		{
			faceDown: <Array<card>>[],
			faceUp: <Array<card>>[],
		},
		{
			faceDown: <Array<card>>[],
			faceUp: <Array<card>>[],
		},
		{
			faceDown: <Array<card>>[],
			faceUp: <Array<card>>[],
		},
		{
			faceDown: <Array<card>>[],
			faceUp: <Array<card>>[],
		},
		{
			faceDown: <Array<card>>[],
			faceUp: <Array<card>>[],
		},
	]
	let stackFaceDown = <Array<card>>[]
	let stackFaceUp = <Array<card>>[]
	function setCardFaceDown(arrLenght: number) {
		for (let index = 0; index < arrLenght; index++) {
			let randomNumber = Math.floor(Math.random() * (52 - 7 - arrLenght))
			stackingRow[arrLenght].faceDown.push(Cards[randomNumber])
			Cards.splice(randomNumber, 1)
		}
	}
	function startGame() {
		for (let index = 0; index < 7; index++) {
			let randomNumber = Math.floor(Math.random() * 52)
			stackingRow[index].faceUp.push(Cards[randomNumber])
			Cards.splice(randomNumber, 1)
		}
		setCardFaceDown(1)
		setCardFaceDown(2)
		setCardFaceDown(3)
		setCardFaceDown(4)
		setCardFaceDown(5)
		setCardFaceDown(6)
	}
	startGame()

	let dimensions = "w-full" + " h-[" + height.toString() + "px]"
	let design = "bg-white relative rounded-lg cursor-default"

	function revealCard(ev: MouseEvent) {
		const element = Cards.pop()!
		stackFaceUp.push(element)
		stackFaceUp = stackFaceUp
	}
	function keyBoardReveal(ev: KeyboardEvent) {}
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
	<div class="w-5/6 mx-auto grid gap-4 gap-y-12 grid-cols-7">
		<div data-deck class="relative col-start-1 col-end-2 row-start-1 row-end-2">
			<div
				role="button"
				tabindex="0"
				on:click={revealCard}
				on:keydown={keyBoardReveal}
			>
				<CardFaceDown {dimensions} />
			</div>
		</div>
		<div
			data-deck-revealed
			class="relative col-start-2 col-end-3 row-start-1 row-end-2"
		>
			{#each stackFaceUp as card, index}
				{#if (stackFaceUp.length > 3 && index === stackFaceUp.length - 3) || index === 0}
					<div
						data-card={cardNumber(card?.card)}
						data-type={cardType(card?.component)}
						draggable="true"
						role="application"
						on:dragstart={dragStart}
						on:drag={drag}
						on:dragend={dragEnd}
						class="{dimensions} {design} dragged top-0 stack_face_up"
					>
						<Placeholder {card} />
					</div>
				{/if}
				{#if (stackFaceUp.length > 3 && index === stackFaceUp.length - 2) || index === 1}
					<div
						data-card={cardNumber(card?.card)}
						data-type={cardType(card?.component)}
						draggable="true"
						role="application"
						on:dragstart={dragStart}
						on:drag={drag}
						on:dragend={dragEnd}
						class="{dimensions} {design} dragged top-0 left-6 stack_face_up"
					>
						<Placeholder {card} />
					</div>
				{/if}
				{#if (stackFaceUp.length > 3 && index === stackFaceUp.length - 1) || index === 2}
					<div
						data-card={cardNumber(card?.card)}
						data-type={cardType(card?.component)}
						draggable="true"
						role="application"
						on:dragstart={dragStart}
						on:drag={drag}
						on:dragend={dragEnd}
						class="{dimensions} {design} dragged top-0 left-12 stack_face_up"
					>
						<Placeholder {card} />
					</div>
				{/if}
			{/each}
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
			data-game="0"
			class="relative col-start-1 containing_block row-start-2 row-end-3"
			><div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each stackingRow[0].faceUp as card}
				<div
					data-card={cardNumber(card?.card)}
					data-type={cardType(card?.component)}
					draggable="true"
					role="application"
					on:dragstart={dragStart}
					on:drag={drag}
					on:dragend={dragEnd}
					class="{dimensions} {design}"
				>
					<Placeholder {card} />
				</div>
			{/each}
		</div>
		<div
			data-game="1"
			class="relative col-start-2 row-start-2 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each stackingRow[1].faceDown as _}
				<CardFaceDown {dimensions} />
			{/each}
			{#each stackingRow[1].faceUp as card}
				<div
					data-card={cardNumber(card?.card)}
					data-type={cardType(card?.component)}
					draggable="true"
					role="application"
					on:dragstart={dragStart}
					on:drag={drag}
					on:dragend={dragEnd}
					class="{dimensions} {design}"
				>
					<Placeholder {card} />
				</div>
			{/each}
		</div>
		<div
			data-game="2"
			class="relative col-start-3 row-start-2 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each stackingRow[2].faceDown as _}
				<CardFaceDown {dimensions} />
			{/each}
			{#each stackingRow[2].faceUp as card}
				<div
					data-card={cardNumber(card?.card)}
					data-type={cardType(card?.component)}
					draggable="true"
					role="application"
					on:dragstart={dragStart}
					on:drag={drag}
					on:dragend={dragEnd}
					class="{dimensions} {design}"
				>
					<Placeholder {card} />
				</div>
			{/each}
		</div>
		<div
			data-game="3"
			class="relative col-start-4 row-start-2 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each stackingRow[3].faceDown as _}
				<CardFaceDown {dimensions} />
			{/each}
			{#each stackingRow[3].faceUp as card}
				<div
					data-card={cardNumber(card?.card)}
					data-type={cardType(card?.component)}
					draggable="true"
					role="application"
					on:dragstart={dragStart}
					on:drag={drag}
					on:dragend={dragEnd}
					class="{dimensions} {design}"
				>
					<Placeholder {card} />
				</div>
			{/each}
		</div>
		<div
			data-game="4"
			class="relative col-start-5 row-start-2 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each stackingRow[4].faceDown as _}
				<CardFaceDown {dimensions} />
			{/each}
			{#each stackingRow[4].faceUp as card}
				<div
					data-card={cardNumber(card?.card)}
					data-type={cardType(card?.component)}
					draggable="true"
					role="application"
					on:dragstart={dragStart}
					on:drag={drag}
					on:dragend={dragEnd}
					class="{dimensions} {design}"
				>
					<Placeholder {card} />
				</div>
			{/each}
		</div>
		<div
			data-game="5"
			class="relative col-start-6 row-start-2 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			></div>
			{#each stackingRow[5].faceDown as _}
				<CardFaceDown {dimensions} />
			{/each}
			{#each stackingRow[5].faceUp as card}
				<div
					data-card={cardNumber(card.card)}
					data-type={cardType(card.component)}
					draggable="true"
					role="application"
					on:dragstart={dragStart}
					on:drag={drag}
					on:dragend={dragEnd}
					class="{dimensions} {design}"
				>
					<Placeholder {card} />
				</div>
			{/each}
		</div>
		<div
			data-game="6"
			class="relative col-start-7 row-start-2 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each stackingRow[6].faceDown as _}
				<CardFaceDown {dimensions} />
			{/each}
			{#each stackingRow[6].faceUp as card}
				<div
					data-card={cardNumber(card?.card)}
					data-type={cardType(card?.component)}
					draggable="true"
					role="application"
					on:dragstart={dragStart}
					on:drag={drag}
					on:dragend={dragEnd}
					class="{dimensions} {design}"
				>
					<Placeholder {card} />
				</div>
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
	.stack_face_up {
		box-shadow:
			0 -1px 2px rgba(0, 0, 0, 0.2),
			3px 3px 8px rgba(0, 0, 0, 0.4);
	}
</style>
