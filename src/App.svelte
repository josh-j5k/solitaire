<script lang="ts">
	import Placeholder from "./lib/Placeholder.svelte"
	import { onMount, beforeUpdate, type ComponentType } from "svelte"
	import { setCardNameAndNumberAtrribute } from "./helpers/SetCardNameAndNumberAtrribute"
	import { dragAndDrop } from "./helpers/DragAndDrop"
	import CardFaceDown from "./lib/CardFaceDown.svelte"
	import { useMain } from "./helpers/Main"
	// import type { card } from "./types/Cards"
	import { type card, type cardComponent, type deck } from "./types/Cards"
	import Spade from "./lib/icons/Spade.svelte"
	import Club from "./lib/icons/Club.svelte"
	import Diamond from "./lib/icons/Diamond.svelte"
	import Heart from "./lib/icons/Heart.svelte"
	// let { dataCards, stackFaceUp, stackingRow, Cards, dataDeck } = useMain()

	const { cardNumber, cardType, cardColor } = setCardNameAndNumberAtrribute()
	const offsetTop = 25
	// const { drag, dragEnd, dragOver, dragStart, drop } = dragAndDrop(offsetTop)
	type row = {
		faceDown: card[]
		faceUp: card[]
	}
	let components = <cardComponent>[
		{ component: Spade },
		{ component: Club },
		{ component: Heart },
		{ component: Diamond },
	]
	const arr = [
		"King",
		"Ace",
		"Queen",
		"Nine",
		"Jack",
		"Ten",
		"Eight",
		"Seven",
		"Five",
		"Six",
		"Three",
		"Four",
		"Two",
	]

	const cardTypeWithComponent = arr.map((card) => {
		return {
			card,
			components: components.map((component) => component),
		}
	})

	let Cards = <Array<card>>[]
	cardTypeWithComponent.forEach((card) => {
		card.components.forEach((component) => {
			const obj = <card>{
				card: card.card,
				component: component.component,
			}
			Cards.push(obj)
		})
	})

	let stackFaceUp = <Array<card>>[]
	let stackingRow = <Array<row>>[]
	stackingRow = [
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
	let dataDeck = <deck>{
		0: <Array<card>>[],
		1: <Array<card>>[],
		2: <Array<card>>[],
		3: <Array<card>>[],
	}

	const height = 200
	let eleWidth = 0
	let eleHeight = 0
	let activeCard: string
	let activeCardNumber: number
	let activeCardColor: string
	let activeCardParentIndex: number
	let activeCardIndex: number
	let dataStackFace = false
	let validMove = false
	let top: string
	let topInt: number
	let left: string
	let parentIn: number
	let mouseX: number
	let mouseY: number

	function dragStart(e: DragEvent) {
		const element = e.target as HTMLDivElement
		const parent = <HTMLDivElement>element.parentElement
		const dataGame = parent?.getAttribute("data-game")!
		const indices = parent.querySelectorAll("div[data-index]")
		top = element.style.top
		left = element.style.left
		if (dataGame === null) {
			dataStackFace = true
			activeCardParentIndex = -1
		} else {
			dataStackFace = false
			activeCardParentIndex = parseInt(dataGame)
		}
		activeCardIndex = parseInt(element.getAttribute("data-index")!)
		mouseX = e.x
		mouseY = e.y

		if (element.classList.contains("dragged"))
			element.classList.remove("dragged")
		if (element.classList.contains("stack_face_up"))
			element.classList.remove("stack_face_up")

		const img = document.createElement("img")
		eleHeight = element.clientHeight / 2
		eleWidth = element.clientWidth / 2
		img.src =
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAABtCAYAAABdsWrOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAjSURBVGhD7cExAQAAAMKg9U9tCy8gAAAAAAAAAAAAAAAAnmox0QABeT4g9gAAAABJRU5ErkJggg=="
		activeCard = element.getAttribute("data-type")!
		activeCardNumber = parseInt(element.getAttribute("data-card")!)
		activeCardColor = element.getAttribute("data-color")!

		e.dataTransfer?.setDragImage(img, 0, 0)
	}
	function dragOver(e: DragEvent) {
		e.preventDefault()
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
		const parent = element.offsetParent as HTMLDivElement
		const currentIndex = element.getAttribute("data-index")!
		const indices = parent.querySelectorAll("div[data-index]")

		element.classList.add("dragging")
		let centerX = e.clientX - mouseX
		let centerY = e.clientY - mouseY
		element.style.transform = `translateX(${centerX.toString()}px) translateY(${centerY.toString()}px)`

		for (let index = 0; index < indices.length; index++) {
			const element = indices[index] as HTMLDivElement
			if (index > parseInt(currentIndex)) {
				element.classList.add("dragging")
				let centerX = e.clientX - mouseX
				let centerY = e.clientY - mouseY
				element.style.transform = `translateX(${centerX.toString()}px) translateY(${centerY.toString()}px)`
			}
		}
	}
	function resetZIndex() {
		const dragoverZone = document.querySelectorAll(".dragover_zone")
		dragoverZone.forEach((zone) => {
			zone.classList.remove("show")
		})
	}
	function dragEnd(e: DragEvent) {
		const element = e.target as HTMLDivElement
		element.style.transform = "translate(0)"
		element.classList.remove("dragging")
		const topSliced = top.slice(0, -2)
		const topNumber = parseInt(topSliced)
		const currentIndex = element.getAttribute("data-index")!
		const parent = element.parentElement as HTMLDivElement
		const indices = parent.querySelectorAll("div[data-index]")
		element.classList.remove("dragging")
		element.style.left = left
		element.style.top = top
		element.style.transform = "translate(0)"

		let newOffsetTop = topNumber
		for (let index = 0; index < indices.length; index++) {
			if (index > parseInt(currentIndex)) {
				newOffsetTop += offsetTop
				const element = indices[index] as HTMLDivElement
				element.style.transform = "translate(0)"
				element.style.top = newOffsetTop.toString() + "px"
				element.classList.remove("dragging")
			}
		}
		if (dataStackFace) {
			element.classList.add("stack_face_up")
		}

		const lastChildElementIndex = parent?.children.length! - 1
		const lastChildElement = parent?.children[lastChildElementIndex]
		const lastChildElementType = lastChildElement?.getAttribute("data-type")
		const lastChildElementColor = lastChildElement?.getAttribute("data-color")!
		const lastChildElementNumber = parseInt(
			lastChildElement?.getAttribute("data-card")!
		)
		// console.log(activeCardColor, activeCardNumber, activeCard)
		// console.log(
		// 	lastChildElementColor,
		// 	lastChildElementNumber,
		// 	lastChildElementType
		// )
		resetZIndex()
	}

	function drop(e: DragEvent) {
		e.preventDefault()
		const element = e.target as HTMLElement
		const parent = element.parentElement as HTMLDivElement

		const lastChildElementIndex = parent?.children.length! - 1
		const lastChildElement = parent?.children[lastChildElementIndex]
		const lastChildElementType = lastChildElement?.getAttribute("data-type")
		const lastChildElementNumber = parseInt(
			lastChildElement?.getAttribute("data-card")!
		)
		const parentIndex = parseInt(parent?.getAttribute("data-game")!)
		const lastChildElementColor = lastChildElement?.getAttribute("data-color")!
		if (dataStackFace && parentIndex === null) {
			return
		}
		const isTrue = (x: number, y: number) => x + 1 === y
		function setDropKey(): keyof deck {
			if (parentIndex - 7 === 0) {
				return 0
			} else if (parentIndex - 7 === 1) {
				return 1
			} else if (parentIndex - 7 === 2) {
				return 2
			}
			return 3
		}
		const dragKey = (): keyof deck => {
			if (activeCardParentIndex - 7 === 0) {
				return 0
			} else if (activeCardParentIndex - 7 === 1) {
				return 1
			} else if (activeCardParentIndex - 7 === 2) {
				return 2
			}
			return 3
		}
		if (parentIndex === activeCardParentIndex) {
			return
		}
		parentIn = parentIndex

		if (dataStackFace) {
			if (
				parentIndex < 7 &&
				lastChildElementColor !== activeCardColor &&
				isTrue(activeCardNumber, lastChildElementNumber)
			) {
				let currentCard = stackFaceUp.pop()!
				stackingRow[parentIndex].faceUp = [
					...stackingRow[parentIndex].faceUp,
					currentCard,
				]
				stackingRow = stackingRow
				stackFaceUp = stackFaceUp
			} else if (
				parentIndex < 7 &&
				parent?.children.length! < 2 &&
				activeCardNumber === 13
			) {
				let currentCard = stackFaceUp.pop()!
				stackingRow[parentIndex].faceUp = [
					...stackingRow[parentIndex].faceUp,
					currentCard,
				]
				stackingRow = stackingRow
				stackFaceUp = stackFaceUp
			} else if (
				parentIndex >= 7 &&
				parent?.children.length! < 2 &&
				activeCardNumber === 1
			) {
				const key = setDropKey()
				let currentCard = stackFaceUp.pop()!
				dataDeck[key] = [...dataDeck[key], currentCard]
				dataDeck = dataDeck
				stackFaceUp = stackFaceUp
			} else if (
				parentIndex >= 7 &&
				lastChildElementType === activeCard &&
				lastChildElementNumber + 1 === activeCardNumber
			) {
				const key = setDropKey()
				console.log(key)
				let currentCard = stackFaceUp.pop()!
				dataDeck[key] = [...dataDeck[key], currentCard]
				dataDeck = dataDeck
				stackFaceUp = stackFaceUp
			}
		} else {
			if (
				parentIndex < 7 &&
				activeCardParentIndex >= 7 &&
				lastChildElementColor !== activeCardColor &&
				isTrue(activeCardNumber, lastChildElementNumber)
			) {
				const key = dragKey()

				let currentCard = dataDeck[key].pop()!
				stackingRow[parentIndex].faceUp = [
					...stackingRow[parentIndex].faceUp,
					currentCard,
				]
				stackingRow = stackingRow
				dataDeck = dataDeck
			} else if (
				parentIndex < 7 &&
				activeCardParentIndex < 7 &&
				lastChildElementColor !== activeCardColor &&
				isTrue(activeCardNumber, lastChildElementNumber)
			) {
				let currentCard =
					stackingRow[activeCardParentIndex].faceUp.slice(activeCardIndex)
				stackingRow[parentIndex].faceUp = [
					...stackingRow[parentIndex].faceUp,
					...currentCard,
				]
				stackingRow[activeCardParentIndex].faceUp.splice(activeCardIndex)
				stackingRow = stackingRow
			} else if (
				parentIndex < 7 &&
				activeCardParentIndex >= 7 &&
				parent?.children.length! < 2 &&
				activeCardNumber === 13
			) {
				const key = dragKey()
				let currentCard = dataDeck[key].pop()!
				stackingRow[parentIndex].faceUp = [
					...stackingRow[parentIndex].faceUp,
					currentCard,
				]
				stackingRow = stackingRow
				dataDeck = dataDeck
			} else if (
				parentIndex < 7 &&
				activeCardParentIndex < 7 &&
				parent?.children.length! < 2 &&
				activeCardNumber === 13
			) {
				let currentCard =
					stackingRow[activeCardParentIndex].faceUp.slice(activeCardIndex)
				stackingRow[parentIndex].faceUp = [
					...stackingRow[parentIndex].faceUp,
					...currentCard,
				]
				stackingRow[activeCardParentIndex].faceUp.splice(activeCardIndex)
				stackingRow = stackingRow
			} else if (
				parentIndex >= 7 &&
				activeCardParentIndex < 7 &&
				parent?.children.length! < 2 &&
				activeCardNumber === 1
			) {
				if (
					activeCardIndex !==
					stackingRow[activeCardParentIndex].faceUp.length - 1
				) {
					return
				}
				const key = setDropKey()
				let currentCard = stackingRow[activeCardParentIndex].faceUp.pop()!
				dataDeck[key] = [...dataDeck[key], currentCard]
				dataDeck = dataDeck
				stackingRow = stackingRow
			} else if (
				parentIndex >= 7 &&
				activeCardParentIndex < 7 &&
				lastChildElementType === activeCard &&
				lastChildElementNumber + 1 === activeCardNumber
			) {
				if (
					activeCardIndex !==
					stackingRow[activeCardParentIndex].faceUp.length - 1
				) {
					return
				}
				const key = setDropKey()
				let currentCard = stackingRow[activeCardParentIndex].faceUp.pop()!
				dataDeck[key] = [...dataDeck[key], currentCard]
				dataDeck = dataDeck
				stackingRow = stackingRow
			} else if (
				parentIndex >= 7 &&
				activeCardParentIndex >= 7 &&
				parent?.children.length! < 2 &&
				activeCardNumber === 1
			) {
				const key = setDropKey()
				const activeKey = dragKey()
				let currentCard = dataDeck[activeKey].pop()!
				dataDeck[key] = [...dataDeck[key], currentCard]
				dataDeck = dataDeck
			} else if (
				parentIndex >= 7 &&
				activeCardParentIndex >= 7 &&
				lastChildElementType === activeCard &&
				lastChildElementNumber + 1 === activeCardNumber
			) {
				const key = setDropKey()
				const activeKey = dragKey()
				let currentCard = dataDeck[activeKey].pop()!
				dataDeck[key] = [...dataDeck[key], currentCard]
				dataDeck = dataDeck
			}
		}

		resetZIndex()
	}

	let totalCards = 52
	function setCardFaceDown(number: number) {
		for (let index = 0; index < number; index++) {
			let randomNumber = Math.floor(Math.random() * totalCards)
			stackingRow[number].faceDown.push(Cards[randomNumber])
			Cards.splice(randomNumber, 1)
			totalCards -= 1
		}
	}
	function startGame() {
		for (let index = 0; index < 7; index++) {
			let randomNumber = Math.floor(Math.random() * totalCards)
			stackingRow[index].faceUp.push(Cards[randomNumber])
			Cards.splice(randomNumber, 1)
			totalCards -= 1
		}

		Cards.sort(() => (Math.random() > 0.5 ? 1 : -1))
		for (let index = 1; index < 7; index++) {
			setCardFaceDown(index)
		}
	}
	startGame()

	let dimensions = "w-full" + " h-[" + height.toString() + "px]"
	let design = "bg-white relative rounded-lg cursor-default"

	function revealCard(ev: MouseEvent) {
		if (Cards.length === 0) {
			Cards = stackFaceUp.reverse()
			Cards = Cards
			stackFaceUp = <Array<card>>[]
			stackFaceUp = stackFaceUp
		} else {
			const element = Cards.pop()!
			stackFaceUp.push(element)
			Cards = Cards
			stackFaceUp = stackFaceUp
		}
	}
	function flipCard(ev: MouseEvent) {
		const element = ev.currentTarget as HTMLDivElement
		const parentElement = element.parentElement
		const dataGame = parseInt(parentElement?.getAttribute("data-game")!)
		const lastChildElement = parentElement?.children.item(
			parentElement?.children.length - 1
		)!
		const containingBlock = document.querySelectorAll(".containing_block")
		const parent = containingBlock[dataGame] as HTMLDivElement
		if (element.id !== lastChildElement.id) {
			return
		}
		let card = stackingRow[dataGame].faceDown.pop()!
		stackingRow[dataGame].faceUp.push(card)
		stackingRow = stackingRow
		setTimeout(() => {
			alignElements(parent)
		}, 0)
	}
	function keyBoardReveal(ev: KeyboardEvent) {}
	function alignElements(element: HTMLDivElement) {
		const length = element.children.length
		const adjLength = length - 1
		const newHeight = adjLength * offsetTop + height

		element.style.height = newHeight.toString() + "px"
		for (let index = 1; index < length; index++) {
			const top = (index - 1) * offsetTop
			const ele = element.children[index] as HTMLDivElement
			ele.style.top = top.toString() + "px"
			ele.style.position = "absolute"
		}
	}
	onMount(() => {
		const containingBlock = document.querySelectorAll(".containing_block")
		containingBlock.forEach((ele) => {
			const block = ele as HTMLDivElement
			alignElements(block)
		})
	})
	beforeUpdate(() => {
		const containingBlock = document.querySelectorAll(".containing_block")

		if (parentIn < 7) {
			const dataGame = containingBlock[parentIn] as HTMLDivElement
			setTimeout(() => {
				alignElements(dataGame)
			}, 0)
		}
	})
	function draggableOne(item: any[]): boolean {
		if (item.length === 1) {
			return true
		}
		return false
	}
	function draggableTwo(item: any[]): boolean {
		if (item.length === 2) {
			return true
		}
		return false
	}
</script>

<main
	on:dragover={dragOver}
	role="application"
	class="min-h-screen w-screen py-6 overflow-hidden"
>
	<div class="w-5/6 mx-auto grid gap-4 gap-y-12 grid-cols-7">
		<div data-deck class="relative col-start-1 col-end-2 row-start-1 row-end-2">
			{#if Cards.length === 0}
				<div
					role="button"
					tabindex="0"
					on:click={revealCard}
					on:keydown={keyBoardReveal}
					class="relative {dimensions} border-2 border-white cursor-pointer rounded-lg before:content-[''] before:absolute before:w-1/2 before:aspect-square before:border-2
					before:rounded-full before:border-white before:inset-0
					before:mx-auto
					before:top-1/2
					before:-translate-y-1/2 before:bg-transparent"
				></div>
			{:else}
				<div
					role="button"
					tabindex="0"
					on:click={revealCard}
					on:keydown={keyBoardReveal}
				>
					<CardFaceDown {dimensions} />
				</div>
			{/if}
		</div>
		<div
			data-stack-faceup
			class="relative col-start-2 col-end-3 row-start-1 row-end-2"
		>
			{#each stackFaceUp as card, index}
				{#if stackFaceUp.length <= 3}
					{#if index === 0}
						<div
							data-card={cardNumber(card?.card)}
							data-type={cardType(card?.component)}
							data-color={cardColor(card?.component)}
							draggable={draggableOne(stackFaceUp)}
							role="application"
							on:dragstart={dragStart}
							on:drag={drag}
							on:dragend={dragEnd}
							class="{dimensions} {design} dragged top-0 stack_face_up"
						>
							<Placeholder {card} />
						</div>
					{/if}
					{#if index === 1}
						<div
							data-card={cardNumber(card?.card)}
							data-type={cardType(card?.component)}
							data-color={cardColor(card?.component)}
							draggable={draggableTwo(stackFaceUp)}
							role="application"
							on:dragstart={dragStart}
							on:drag={drag}
							on:dragend={dragEnd}
							class="{dimensions} {design} dragged top-0 left-6 stack_face_up"
						>
							<Placeholder {card} />
						</div>
					{/if}
					{#if index === 2}
						<div
							data-card={cardNumber(card?.card)}
							data-type={cardType(card?.component)}
							data-color={cardColor(card?.component)}
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
				{:else}
					{#if index === stackFaceUp.length - 3}
						<div
							data-card={cardNumber(card?.card)}
							data-type={cardType(card?.component)}
							data-color={cardColor(card?.component)}
							draggable={draggableOne(stackFaceUp)}
							role="application"
							on:dragstart={dragStart}
							on:drag={drag}
							on:dragend={dragEnd}
							class="{dimensions} {design} dragged top-0 stack_face_up"
						>
							<Placeholder {card} />
						</div>
					{/if}
					{#if index === stackFaceUp.length - 2}
						<div
							data-card={cardNumber(card?.card)}
							data-type={cardType(card?.component)}
							data-color={cardColor(card?.component)}
							draggable={draggableTwo(stackFaceUp)}
							role="application"
							on:dragstart={dragStart}
							on:drag={drag}
							on:dragend={dragEnd}
							class="{dimensions} {design} dragged top-0 left-6 stack_face_up"
						>
							<Placeholder {card} />
						</div>
					{/if}
					{#if index === stackFaceUp.length - 1}
						<div
							data-card={cardNumber(card?.card)}
							data-type={cardType(card?.component)}
							data-color={cardColor(card?.component)}
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
				{/if}
			{/each}
		</div>
		<div
			data-game="7"
			class="relative h-[200px] col-start-4 col-end-5 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each dataDeck[0] as card, index}
				{#if index === dataDeck[0].length - 2}
					<div
						data-card={cardNumber(card?.card)}
						data-type={cardType(card?.component)}
						data-color={cardColor(card?.component)}
						draggable="true"
						role="application"
						on:dragstart={dragStart}
						on:drag={drag}
						on:dragend={dragEnd}
						class="{dimensions} {design} dragged top-0 left-0"
					>
						<Placeholder {card} />
					</div>
				{/if}
				{#if index === dataDeck[0].length - 1}
					<div
						data-card={cardNumber(card?.card)}
						data-type={cardType(card?.component)}
						data-color={cardColor(card?.component)}
						draggable="true"
						role="application"
						on:dragstart={dragStart}
						on:drag={drag}
						on:dragend={dragEnd}
						class="{dimensions} {design} dragged top-0 left-0"
					>
						<Placeholder {card} />
					</div>
				{/if}
			{/each}
		</div>
		<div
			data-game="8"
			class="relative h-[200px] col-start-5 col-end-6 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each dataDeck[1] as card, index}
				{#if index === dataDeck[1].length - 2}
					<div
						data-card={cardNumber(card?.card)}
						data-type={cardType(card?.component)}
						data-color={cardColor(card?.component)}
						draggable="true"
						role="application"
						on:dragstart={dragStart}
						on:drag={drag}
						on:dragend={dragEnd}
						class="{dimensions} {design} dragged top-0 left-0"
					>
						<Placeholder {card} />
					</div>
				{/if}
				{#if index === dataDeck[1].length - 1}
					<div
						data-card={cardNumber(card?.card)}
						data-type={cardType(card?.component)}
						data-color={cardColor(card?.component)}
						draggable="true"
						role="application"
						on:dragstart={dragStart}
						on:drag={drag}
						on:dragend={dragEnd}
						class="{dimensions} {design} dragged top-0 left-0"
					>
						<Placeholder {card} />
					</div>
				{/if}
			{/each}
		</div>
		<div
			data-game="9"
			class="relative w-full h-[200px] col-start-6 col-end-7 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each dataDeck[2] as card, index}
				{#if index === dataDeck[2].length - 2}
					<div
						data-card={cardNumber(card?.card)}
						data-type={cardType(card?.component)}
						data-color={cardColor(card?.component)}
						data-index={index}
						draggable="true"
						role="application"
						on:dragstart={dragStart}
						on:drag={drag}
						on:dragend={dragEnd}
						class="{dimensions} {design} dragged top-0 left-0"
					>
						<Placeholder {card} />
					</div>
				{/if}
				{#if index === dataDeck[2].length - 1}
					<div
						data-card={cardNumber(card?.card)}
						data-type={cardType(card?.component)}
						data-color={cardColor(card?.component)}
						data-index={index}
						draggable="true"
						role="application"
						on:dragstart={dragStart}
						on:drag={drag}
						on:dragend={dragEnd}
						class="{dimensions} {design} dragged top-0 left-0"
					>
						<Placeholder {card} />
					</div>
				{/if}
			{/each}
		</div>
		<div
			data-game="10"
			class="relative h-[200px] col-start-7 col-end-8 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each dataDeck[3] as card, index}
				{#if index === dataDeck[3].length - 2}
					<div
						data-card={cardNumber(card?.card)}
						data-type={cardType(card?.component)}
						data-color={cardColor(card?.component)}
						data-index={index}
						draggable="true"
						role="application"
						on:dragstart={dragStart}
						on:drag={drag}
						on:dragend={dragEnd}
						class="{dimensions} {design} dragged top-0 left-0"
					>
						<Placeholder {card} />
					</div>
				{/if}
				{#if index === dataDeck[3].length - 1}
					<div
						data-card={cardNumber(card?.card)}
						data-type={cardType(card?.component)}
						data-color={cardColor(card?.component)}
						data-index={index}
						draggable="true"
						role="application"
						on:dragstart={dragStart}
						on:drag={drag}
						on:dragend={dragEnd}
						class="{dimensions} {design} dragged top-0 left-0"
					>
						<Placeholder {card} />
					</div>
				{/if}
			{/each}
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
			{#each stackingRow[0].faceUp as card, index}
				<div
					data-card={cardNumber(card?.card)}
					data-type={cardType(card?.component)}
					data-color={cardColor(card?.component)}
					data-index={index}
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
			{#each stackingRow[1].faceDown as _, index}
				<div
					role="button"
					tabindex="0"
					on:click={flipCard}
					on:keydown={keyBoardReveal}
					class="{dimensions} cursor-default"
				>
					<CardFaceDown {dimensions} />
				</div>
			{/each}
			{#each stackingRow[1].faceUp as card, index}
				<div
					data-card={cardNumber(card?.card)}
					data-type={cardType(card?.component)}
					data-color={cardColor(card?.component)}
					data-index={index}
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
			{#each stackingRow[2].faceDown as _, index}
				<div
					role="button"
					tabindex="0"
					on:click={flipCard}
					on:keydown={keyBoardReveal}
					id={"_two" + index}
					class="{dimensions} cursor-default"
				>
					<CardFaceDown {dimensions} />
				</div>
			{/each}
			{#each stackingRow[2].faceUp as card, index}
				<div
					data-card={cardNumber(card?.card)}
					data-type={cardType(card?.component)}
					data-color={cardColor(card?.component)}
					data-index={index}
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
			{#each stackingRow[3].faceDown as _, index}
				<div
					role="button"
					tabindex="0"
					on:click={flipCard}
					on:keydown={keyBoardReveal}
					id={"_three" + index}
					class="{dimensions} cursor-default"
				>
					<CardFaceDown {dimensions} />
				</div>
			{/each}
			{#each stackingRow[3].faceUp as card, index}
				<div
					data-card={cardNumber(card?.card)}
					data-type={cardType(card?.component)}
					data-color={cardColor(card?.component)}
					data-index={index}
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
			{#each stackingRow[4].faceDown as _, index}
				<div
					role="button"
					tabindex="0"
					on:click={flipCard}
					on:keydown={keyBoardReveal}
					id={"_four" + index}
					class="{dimensions} cursor-default"
				>
					<CardFaceDown {dimensions} />
				</div>
			{/each}
			{#each stackingRow[4].faceUp as card, index}
				<div
					data-card={cardNumber(card?.card)}
					data-type={cardType(card?.component)}
					data-color={cardColor(card?.component)}
					data-index={index}
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
			{#each stackingRow[5].faceDown as _, index}
				<div
					role="button"
					tabindex="0"
					on:click={flipCard}
					on:keydown={keyBoardReveal}
					id={"_five" + index}
					class="{dimensions} cursor-default"
				>
					<CardFaceDown {dimensions} />
				</div>
			{/each}
			{#each stackingRow[5].faceUp as card, index}
				<div
					data-card={cardNumber(card?.card)}
					data-type={cardType(card?.component)}
					data-color={cardColor(card?.component)}
					data-index={index}
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
			{#each stackingRow[6].faceDown as _, index}
				<div
					role="button"
					tabindex="0"
					on:click={flipCard}
					on:keydown={keyBoardReveal}
					id={"_six" + index}
					class="{dimensions} cursor-default"
				>
					<CardFaceDown {dimensions} />
				</div>
			{/each}
			{#each stackingRow[6].faceUp as card, index}
				<div
					data-card={cardNumber(card?.card)}
					data-type={cardType(card?.component)}
					data-color={cardColor(card?.component)}
					data-index={index}
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
