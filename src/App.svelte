<script lang="ts">
	import Placeholder from "./lib/Placeholder.svelte"
	import { onMount, beforeUpdate } from "svelte"
	import { setCardNameAndNumberAtrribute } from "./helpers/SetCardNameAndNumberAtrribute"
	import CardFaceDown from "./lib/CardFaceDown.svelte"
	import { gameRulesAndLogic } from "./helpers/GameRulesAndLogic"

	import {
		type card,
		type cardComponent,
		type TFoundation,
		type row,
	} from "./types/Cards"
	import Spade from "./lib/icons/Spade.svelte"
	import Club from "./lib/icons/Club.svelte"
	import Diamond from "./lib/icons/Diamond.svelte"
	import Heart from "./lib/icons/Heart.svelte"

	const { cardNumber, cardType, cardColor } = setCardNameAndNumberAtrribute()
	const offsetTop = 25
	const time = {
		minutes: 0,
		seconds: 0,
	}
	let score = 0
	let streak = 5
	function streaking() {
		const streakInterval = setInterval(() => {
			streak--
			if (streak < 0) {
				streak = 5
				clearInterval(streakInterval)
			}
		}, 1000)
	}
	function setStreakingScore(isFoundation: boolean) {
		if (streak < 5) {
			isFoundation ? (score += 15) : (score += 10)
		}
	}
	let components = <cardComponent>[
		{ component: Spade },
		{ component: Club },
		{ component: Heart },
		{ component: Diamond },
	]
	const successAudio = new Audio(
		"/src/assets/audio/Solitaire Card Game Sound Effects - 108 Solitaire Card Game sounds for SFX projects.m4a"
	)
	const dealCard = new Audio(
		"/src/assets/audio/Solitaire Card Game Sound Effects - 108 Solitaire Card Game sounds for SFX projects_4.m4a"
	)
	const dragStartSound = new Audio(
		"/src/assets/audio/Solitaire Card Game SFX - Page 2_2.m4a"
	)
	const dragEndSound = new Audio(
		"/src/assets/audio/Solitaire Card Game SFX - Page 2_3.m4a"
	)
	const dropSound = new Audio(
		"/src/assets/audio/Solitaire Card Game SFX - Page 2_4.m4a"
	)

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

	let stockPile = <Array<card>>[]
	let tableau = <Array<row>>[
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
	let foundation = <TFoundation>{
		0: <Array<card>>[],
		1: <Array<card>>[],
		2: <Array<card>>[],
		3: <Array<card>>[],
	}

	const height = 180
	let eleWidth = 0
	let eleHeight = 0
	let activeCard: string
	let activeCardElement: HTMLElement
	let activeCardNumber: number
	let activeCardColor: string
	let activeCardParentIndex: number
	let activeCardIndex: number
	let isDraggedFromWastePile = false
	let top: string
	let left: string
	let parentIn: number
	let mouseX: number
	let mouseY: number
	let totalCards = 52

	setInterval(() => {
		time.seconds++
		if (time.seconds > 59) {
			time.seconds = 0
			time.minutes += 1
		}
	}, 1000)
	function setCardFaceDown(number: number) {
		for (let index = 0; index < number; index++) {
			let randomNumber = Math.floor(Math.random() * totalCards)
			tableau[number].faceDown.push(Cards[randomNumber])
			Cards.splice(randomNumber, 1)
			totalCards -= 1
		}
	}
	function startGame() {
		for (let index = 0; index < 7; index++) {
			let randomNumber = Math.floor(Math.random() * totalCards)
			tableau[index].faceUp.push(Cards[randomNumber])
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

	function revealAndRedealStockpile() {
		if (Cards.length === 0) {
			Cards = stockPile.reverse()
			Cards = Cards
			stockPile = <Array<card>>[]
			stockPile = stockPile
		} else {
			const element = Cards.pop()!
			stockPile.push(element)
			Cards = Cards
			stockPile = stockPile
			dealCard.play()
			setTimeout(() => {
				const currentWastePile = document.querySelectorAll(
					'div[data-waste-pile="true"]'
				)
				const wastePileCardPosition = currentWastePile.length - 1
				const wastePileCard = currentWastePile[wastePileCardPosition]
				wastePileCard.classList.add("reveal-card")
			}, 0)

			setTimeout(() => {
				const currentWastePile = document.querySelectorAll(
					'div[data-waste-pile="true"]'
				)
				const wastePileCardPosition = currentWastePile.length - 1
				const wastePileCard = currentWastePile[wastePileCardPosition]
				wastePileCard.classList.remove("reveal-card")
				wastePileCard.classList.remove("hide-card")
			}, 800)
		}
	}
	function flipCard(index: number) {
		if (
			tableau[index].faceUp.length === 0 &&
			tableau[index].faceDown.length > 0
		) {
			const containingBlock = document.querySelectorAll(".containing_block")

			setTimeout(() => {
				let card = tableau[index].faceDown.pop()!

				tableau[index].faceUp.push(card)
				tableau[index] = tableau[index]
			}, 100)
			setTimeout(() => {
				const parent = containingBlock[index] as HTMLDivElement
				const element = parent.children[parent.children.length - 1]
				alignElements(parent)
				element.classList.add("flip-card")
			}, 100)
			setTimeout(() => {
				const parent = containingBlock[index] as HTMLDivElement
				const element = parent.children[parent.children.length - 1]
				element.classList.remove("flip-card")
			}, 1000)
		}
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
	function dragStart(e: DragEvent) {
		const element = e.target as HTMLDivElement
		// const parent = <HTMLDivElement>element.parentElement

		dragStartSound.play()
		top = element.style.top
		left = element.style.left

		mouseX = e.x
		mouseY = e.y

		const img = document.createElement("img")
		eleHeight = element.clientHeight / 2
		eleWidth = element.clientWidth / 2
		img.src =
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAABtCAYAAABdsWrOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAjSURBVGhD7cExAQAAAMKg9U9tCy8gAAAAAAAAAAAAAAAAnmox0QABeT4g9gAAAABJRU5ErkJggg=="
		activeCard = element.getAttribute("data-card-type")!
		activeCardNumber = parseInt(element.getAttribute("data-card-rank")!)
		activeCardColor = element.getAttribute("data-card-color")!
		activeCardElement = element
		e.dataTransfer?.setDragImage(img, 0, 0)
	}
	function dragOver(e: DragEvent) {
		e.preventDefault()
		if (e.dataTransfer != null) {
			e.dataTransfer.dropEffect = "move"
		}
	}

	function drag(e: DragEvent) {
		const element = e.target as HTMLDivElement
		const parent = element.offsetParent as HTMLDivElement
		const currentIndex = element.getAttribute("data-index")!
		const indices = parent.querySelectorAll("div[data-index]")
		const dataWastePile = element.getAttribute("data-waste-pile")
		const dataFoundation = parent?.getAttribute("data-foundation")
		const dataTableau = parent?.getAttribute("data-tableau")
		const dragoverZone = document.querySelectorAll(".dragover_zone")
		dragoverZone.forEach((zone) => {
			zone.classList.add("show")
		})
		if (element.classList.contains("dragged"))
			element.classList.remove("dragged")
		if (element.classList.contains("stack_face_up"))
			element.classList.remove("stack_face_up")

		if (dataWastePile) {
			isDraggedFromWastePile = true
			activeCardParentIndex = -1
		} else {
			isDraggedFromWastePile = false
			dataFoundation
				? (activeCardParentIndex = parseInt(dataFoundation))
				: (activeCardParentIndex = parseInt(dataTableau!))
		}

		activeCardIndex = parseInt(element.getAttribute("data-index")!)

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
		dragEndSound.play()
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
		if (isDraggedFromWastePile) {
			element.classList.add("stack_face_up")
		}

		resetZIndex()
	}

	function drop(e: DragEvent) {
		e.preventDefault()
		const element = e.target as HTMLElement
		const parent = element.parentElement as HTMLDivElement
		const lastChildElementIndex = parent?.children.length! - 1
		const lastChildElement = parent?.children[lastChildElementIndex]
		const lastChildElementType =
			lastChildElement?.getAttribute("data-card-type")!
		const lastChildElementNumber = parseInt(
			lastChildElement?.getAttribute("data-card-rank")!
		)
		const lastChildElementColor =
			lastChildElement?.getAttribute("data-card-color")!
		const dataFoundation = parent?.getAttribute("data-foundation")
		const dataTableau = parent?.getAttribute("data-tableau")
		let parentIndex: number
		if (parent.getAttribute("data-tableau")) {
			parentIndex = parseInt(dataTableau!)
		} else {
			parentIndex = parseInt(dataFoundation!)
		}

		const {
			dropCardToFoundationPileRules,
			dropCardToTableauRules,
			dropIfDraggedFromTableau,
			dropIfDraggedFromWastePile,
			dropIfFoundationToTableau,
			dropIfTableauToTableau,
			dropIfWastePileToTableau,
		} = gameRulesAndLogic(
			parent?.children.length!,
			activeCardNumber,
			activeCard,
			lastChildElementType,
			lastChildElementColor,
			activeCardColor,
			activeCardParentIndex,
			lastChildElementNumber,
			activeCardIndex,
			parentIndex,
			foundation,
			stockPile,
			tableau
		)

		const setDropKey = (): keyof TFoundation => parentIndex as keyof TFoundation
		const dragKey = (): keyof TFoundation =>
			activeCardParentIndex as keyof TFoundation
		if (
			(parent.getAttribute("data-tableau") &&
				parentIndex === activeCardParentIndex) ||
			(parent.getAttribute("data-foundation") &&
				parentIndex === activeCardParentIndex)
		) {
			return
		}
		parentIn = parentIndex

		if (isDraggedFromWastePile) {
			if (dataTableau && dropCardToTableauRules()) {
				dropIfWastePileToTableau()

				tableau = tableau
				stockPile = stockPile
				dropSound.play()
				score += 5
				setStreakingScore(false)
				streaking()
				setTimeout(() => {
					const elements = document.querySelectorAll(
						'div[data-waste-pile="true"]'
					)
					elements.forEach((ele) => ele.classList.remove("hide-card"))
				}, 0)
			} else if (dataFoundation && dropCardToFoundationPileRules()) {
				const key = setDropKey()
				dropIfDraggedFromWastePile(key)

				stockPile = stockPile
				foundation = foundation
				parent.classList.add("valid-move")
				score += 10
				successAudio.play()
				setStreakingScore(true)
				streaking()
				setTimeout(() => {
					parent.classList.remove("valid-move")
				}, 800)
				setTimeout(() => {
					const elements = document.querySelectorAll(
						'div[data-waste-pile="true"]'
					)
					elements.forEach((ele) => ele.classList.remove("hide-card"))
				}, 0)
			}
		} else if (
			dataTableau &&
			activeCardElement.parentElement?.hasAttribute("data-foundation")
		) {
			const key = dragKey()
			dropIfFoundationToTableau(key)
			foundation = foundation
			tableau = tableau
			dropSound.play()
		} else if (dataTableau && dropCardToTableauRules()) {
			dropIfTableauToTableau()
			tableau[activeCardParentIndex] = tableau[activeCardParentIndex]
			tableau = tableau
			score += 5
			setStreakingScore(false)
			streaking()
			flipCard(activeCardParentIndex)
			dropSound.play()
		} else if (dataFoundation && dropCardToFoundationPileRules()) {
			if (
				activeCardIndex !==
				tableau[activeCardParentIndex].faceUp.length - 1
			) {
				return
			}

			const key = setDropKey()
			dropIfDraggedFromTableau(key)
			foundation = foundation
			tableau = tableau
			setStreakingScore(true)
			streaking()
			parent.classList.add("valid-move")
			successAudio.play()
			score += 10
			setTimeout(() => {
				parent.classList.remove("valid-move")
			}, 800)
			flipCard(activeCardParentIndex)
		} else if (
			dataFoundation &&
			parent.hasAttribute("data-foundation") &&
			activeCardElement.parentElement?.hasAttribute("data-foundation")
		) {
			const key = setDropKey()
			const activeKey = dragKey()
			let currentCard = foundation[activeKey].pop()!
			foundation[key] = [...foundation[key], currentCard]
			foundation = foundation
			parent.classList.add("valid-move")
			successAudio.play()
			setTimeout(() => {
				parent.classList.remove("valid-move")
			}, 800)
		}

		resetZIndex()
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
	class="min-h-screen w-screen pt-12 overflow-hidden relative isolate"
>
	<div
		class="absolute top-0 w-full h-11 before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-[#00000038] before:-z-10"
	>
		<div class="w-5/6 mx-auto h-full flex items-center justify-between">
			<div class="w-full">
				<button
					class="w-8 aspect-square flex justify-center items-center bg-[#00000083]"
				>
					<svg
						viewBox="0 -1 12 12"
						id="meteor-icon-kit__regular-bars-s"
						fill="none"
						width="24"
						height="24"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier"
							><path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M0.85714 2C0.38376 2 0 1.55228 0 1C0 0.44772 0.38376 0 0.85714 0H11.1429C11.6162 0 12 0.44772 12 1C12 1.55228 11.6162 2 11.1429 2H0.85714zM0.85714 6C0.38376 6 0 5.5523 0 5C0 4.4477 0.38376 4 0.85714 4H11.1429C11.6162 4 12 4.4477 12 5C12 5.5523 11.6162 6 11.1429 6H0.85714zM0.85714 10C0.38376 10 0 9.5523 0 9C0 8.4477 0.38376 8 0.85714 8H11.1429C11.6162 8 12 8.4477 12 9C12 9.5523 11.6162 10 11.1429 10H0.85714z"
								fill="#fff"
							></path></g
						></svg
					>
				</button>
			</div>
			<div class="w-full flex justify-between">
				<div class="flex justify-between gap-6 items-center">
					<span class="text-3xl text-white">Score:</span>
					<span class="text-3xl text-white">{score}</span>
				</div>
				<div class="flex">
					<span class="text-3xl text-white"
						>{time.minutes > 9 ? time.minutes : "0" + time.minutes}</span
					>
					<span class="text-3xl text-white">:</span>
					<span class="text-3xl text-white"
						>{time.seconds > 9 ? time.seconds : "0" + time.seconds}</span
					>
				</div>
			</div>
		</div>
	</div>
	<div class="w-4/5 mx-auto grid gap-4 gap-y-12 grid-cols-7">
		<div class="relative col-start-1 col-end-2 row-start-1 row-end-2">
			{#if Cards.length === 0}
				<div
					role="button"
					tabindex="0"
					on:click={revealAndRedealStockpile}
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
					on:click={revealAndRedealStockpile}
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
			{#each stockPile as card, index}
				{#if stockPile.length <= 3}
					{#if index === 0}
						<div
							data-waste-pile="true"
							data-card-rank={cardNumber(card?.card)}
							data-card-type={cardType(card?.component)}
							data-card-color={cardColor(card?.component)}
							draggable={draggableOne(stockPile)}
							role="application"
							on:dragstart={dragStart}
							on:drag={drag}
							on:dragend={dragEnd}
							class="{dimensions} {design} dragged top-0 stack_face_up {index ===
								stockPile.length - 1 && 'hide-card'}"
						>
							<Placeholder {card} />
						</div>
					{/if}
					{#if index === 1}
						<div
							data-waste-pile="true"
							data-card-rank={cardNumber(card?.card)}
							data-card-type={cardType(card?.component)}
							data-card-color={cardColor(card?.component)}
							draggable={draggableTwo(stockPile)}
							role="application"
							on:dragstart={dragStart}
							on:drag={drag}
							on:dragend={dragEnd}
							class="{dimensions} {design} dragged top-0 left-6 stack_face_up {index ===
								stockPile.length - 1 && 'hide-card'}"
						>
							<Placeholder {card} />
						</div>
					{/if}
					{#if index === 2}
						<div
							data-waste-pile="true"
							data-card-rank={cardNumber(card?.card)}
							data-card-type={cardType(card?.component)}
							data-card-color={cardColor(card?.component)}
							draggable="true"
							role="application"
							on:dragstart={dragStart}
							on:drag={drag}
							on:dragend={dragEnd}
							class="{dimensions} {design} dragged top-0 left-12 stack_face_up {index ===
								stockPile.length - 1 && 'hide-card'}"
						>
							<Placeholder {card} />
						</div>
					{/if}
				{:else}
					{#if index === stockPile.length - 3}
						<div
							data-waste-pile="true"
							data-card-rank={cardNumber(card?.card)}
							data-card-type={cardType(card?.component)}
							data-card-color={cardColor(card?.component)}
							draggable={draggableOne(stockPile)}
							role="application"
							on:dragstart={dragStart}
							on:drag={drag}
							on:dragend={dragEnd}
							class="{dimensions} {design} dragged top-0 stack_face_up"
						>
							<Placeholder {card} />
						</div>
					{/if}
					{#if index === stockPile.length - 2}
						<div
							data-waste-pile="true"
							data-card-rank={cardNumber(card?.card)}
							data-card-type={cardType(card?.component)}
							data-card-color={cardColor(card?.component)}
							draggable={draggableTwo(stockPile)}
							role="application"
							on:dragstart={dragStart}
							on:drag={drag}
							on:dragend={dragEnd}
							class="{dimensions} {design} dragged top-0 left-6 stack_face_up"
						>
							<Placeholder {card} />
						</div>
					{/if}
					{#if index === stockPile.length - 1}
						<div
							data-waste-pile="true"
							data-card-rank={cardNumber(card?.card)}
							data-card-type={cardType(card?.component)}
							data-card-color={cardColor(card?.component)}
							draggable="true"
							role="application"
							on:dragstart={dragStart}
							on:drag={drag}
							on:dragend={dragEnd}
							class="{dimensions} {design} dragged top-0 left-12 stack_face_up {index ===
								stockPile.length - 1 && 'hide-card'}"
						>
							<Placeholder {card} />
						</div>
					{/if}
				{/if}
			{/each}
		</div>
		<div
			data-foundation="0"
			class="relative {`h-[${height}px]`} col-start-4 col-end-5 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each foundation[0] as card, index}
				{#if index === foundation[0].length - 2}
					<div
						data-card-rank={cardNumber(card?.card)}
						data-card-type={cardType(card?.component)}
						data-card-color={cardColor(card?.component)}
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
				{#if index === foundation[0].length - 1}
					<div
						data-card-rank={cardNumber(card?.card)}
						data-card-type={cardType(card?.component)}
						data-card-color={cardColor(card?.component)}
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
			data-foundation="1"
			class="relative {`h-[${height}px]`} col-start-5 col-end-6 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each foundation[1] as card, index}
				{#if index === foundation[1].length - 2}
					<div
						data-card-rank={cardNumber(card?.card)}
						data-card-type={cardType(card?.component)}
						data-card-color={cardColor(card?.component)}
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
				{#if index === foundation[1].length - 1}
					<div
						data-card-rank={cardNumber(card?.card)}
						data-card-type={cardType(card?.component)}
						data-card-color={cardColor(card?.component)}
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
			data-foundation="2"
			class="relative w-full {`h-[${height}px]`} col-start-6 col-end-7 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each foundation[2] as card, index}
				{#if index === foundation[2].length - 2}
					<div
						data-card-rank={cardNumber(card?.card)}
						data-card-type={cardType(card?.component)}
						data-card-color={cardColor(card?.component)}
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
				{#if index === foundation[2].length - 1}
					<div
						data-card-rank={cardNumber(card?.card)}
						data-card-type={cardType(card?.component)}
						data-card-color={cardColor(card?.component)}
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
			data-foundation="3"
			class="relative {`h-[${height}px]`} col-start-7 col-end-8 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each foundation[3] as card, index}
				{#if index === foundation[3].length - 2}
					<div
						data-card-rank={cardNumber(card?.card)}
						data-card-type={cardType(card?.component)}
						data-card-color={cardColor(card?.component)}
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
				{#if index === foundation[3].length - 1}
					<div
						data-card-rank={cardNumber(card?.card)}
						data-card-type={cardType(card?.component)}
						data-card-color={cardColor(card?.component)}
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
			data-tableau="0"
			class="relative col-start-1 containing_block row-start-2 row-end-3"
			><div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each tableau[0].faceUp as card, index}
				<div
					data-card-rank={cardNumber(card?.card)}
					data-card-type={cardType(card?.component)}
					data-card-color={cardColor(card?.component)}
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
			data-tableau="1"
			class="relative col-start-2 row-start-2 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each tableau[1].faceDown as _, index}
				<div class="{dimensions} cursor-default">
					<CardFaceDown {dimensions} />
				</div>
			{/each}
			{#each tableau[1].faceUp as card, index}
				<div
					data-card-rank={cardNumber(card?.card)}
					data-card-type={cardType(card?.component)}
					data-card-color={cardColor(card?.component)}
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
			data-tableau="2"
			class="relative col-start-3 row-start-2 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each tableau[2].faceDown as _, index}
				<div id={"_two" + index} class="{dimensions} cursor-default">
					<CardFaceDown {dimensions} />
				</div>
			{/each}
			{#each tableau[2].faceUp as card, index}
				<div
					data-card-rank={cardNumber(card?.card)}
					data-card-type={cardType(card?.component)}
					data-card-color={cardColor(card?.component)}
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
			data-tableau="3"
			class="relative col-start-4 row-start-2 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each tableau[3].faceDown as _, index}
				<div id={"_three" + index} class="{dimensions} cursor-default">
					<CardFaceDown {dimensions} />
				</div>
			{/each}
			{#each tableau[3].faceUp as card, index}
				<div
					data-card-rank={cardNumber(card?.card)}
					data-card-type={cardType(card?.component)}
					data-card-color={cardColor(card?.component)}
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
			data-tableau="4"
			class="relative col-start-5 row-start-2 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each tableau[4].faceDown as _, index}
				<div id={"_four" + index} class="{dimensions} cursor-default">
					<CardFaceDown {dimensions} />
				</div>
			{/each}
			{#each tableau[4].faceUp as card, index}
				<div
					data-card-rank={cardNumber(card?.card)}
					data-card-type={cardType(card?.component)}
					data-card-color={cardColor(card?.component)}
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
			data-tableau="5"
			class="relative col-start-6 row-start-2 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			></div>
			{#each tableau[5].faceDown as _, index}
				<div id={"_five" + index} class="{dimensions} cursor-default">
					<CardFaceDown {dimensions} />
				</div>
			{/each}
			{#each tableau[5].faceUp as card, index}
				<div
					data-card-rank={cardNumber(card?.card)}
					data-card-type={cardType(card?.component)}
					data-card-color={cardColor(card?.component)}
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
			data-tableau="6"
			class="relative col-start-7 row-start-2 containing_block"
		>
			<div
				on:dragover={dragOver}
				role="application"
				on:drop={drop}
				class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
			>
			</div>
			{#each tableau[6].faceDown as _, index}
				<div id={"_six" + index} class="{dimensions} cursor-default">
					<CardFaceDown {dimensions} />
				</div>
			{/each}
			{#each tableau[6].faceUp as card, index}
				<div
					data-card-rank={cardNumber(card?.card)}
					data-card-type={cardType(card?.component)}
					data-card-color={cardColor(card?.component)}
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
	.flip-card {
		animation: flip-card 700ms ease forwards;
	}
	.reveal-card {
		animation: reveal-card 50ms ease-in-out forwards;
	}
	.hide-card {
		transform: translateX(-100px);
		opacity: 50;
	}
	.valid-move {
		position: relative;
	}
	.valid-move::before {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 105%;
		height: 105%;
		border-radius: 12px;
		box-shadow: 0 0 4px 5px rgba(0, 204, 255, 0.733);
		animation: valid-move 1000ms ease-out forwards;
	}
	@keyframes reveal-card {
		to {
			transform: translateX(0);
			opacity: 100;
		}
	}
	@keyframes valid-move {
		to {
			height: 115%;
			width: 115%;
			opacity: 0;
		}
	}
	@keyframes flip-card {
		from {
			transform: rotateY(90deg);
		}
		to {
			transform: rotateY(0);
		}
	}
</style>
