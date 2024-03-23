<script lang="ts">
	import Placeholder from "./lib/Placeholder.svelte"

	import { setCardNameAndNumberAtrribute } from "./helpers/SetCardNameAndNumberAtrribute"
	import CardFaceDown from "./lib/CardFaceDown.svelte"
	import { gameRulesAndLogic } from "./helpers/GameRulesAndLogic"
	import { useDimensionDesign } from "./helpers/DimensionDesigns"
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
	import Loader from "./lib/Loader.svelte"
	let components = <cardComponent>[
		{ component: Spade },
		{ component: Club },
		{ component: Heart },
		{ component: Diamond },
	]
	const { cardNumber, cardType, cardColor } = setCardNameAndNumberAtrribute()
	const { design, dimensions } = useDimensionDesign()
	const offsetTop = 25
	const time = {
		minutes: 0,
		seconds: 0,
	}

	const successAudio = new Audio("/src/assets/audio/success_H3LxEVI6.m4a")
	const dealCard = new Audio("/src/assets/audio/Reveal Card.m4a")
	const dragStartSound = new Audio(
		"/src/assets/audio/Solitaire Card Game SFX - Page 2_2.m4a"
	)
	const dragEndSound = new Audio(
		"/src/assets/audio/Solitaire Card Game SFX - Page 2_3.m4a"
	)
	const dropSound = new Audio(
		"/src/assets/audio/Solitaire Card Game SFX - Page 2_4.m4a"
	)
	const clickSound = new Audio(
		"/src/assets/audio/click-for-game-menu-131903.mp3"
	)
	const reDeal = new Audio(
		"/src/assets/audio/Solitaire Card Game SFX - Page 2_5.m4a"
	)
	const winningSound = new Audio(
		"/src/assets/audio/positive-notification-new-level-152480.mp3"
	)
	const shuffleSound = new Audio(
		"/src/assets/audio/Solitaire Card shuffle SFX - Page 2.m4a"
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
	const height = 180
	let stockPile = <Array<card>>[]

	const emptyTableau = <Array<row>>[
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

	const emptyFoundation = <TFoundation>{
		0: <Array<card>>[],
		1: <Array<card>>[],
		2: <Array<card>>[],
		3: <Array<card>>[],
	}
	let wastePile = <Array<card>>[]
	let tableau = [...emptyTableau]
	let foundation = emptyFoundation

	let score = 0
	let streak = 5
	let gameLoadingAnimation = true
	let win = false
	let pause = false
	let gameStarted = false
	let activeCard: string
	let activeCardElement: HTMLElement
	let activeCardNumber: number
	let activeCardColor: string
	let activeCardParentIndex: number
	let activeCardIndex: number
	let isDraggedFromWastePile = false
	let top: string
	let left: string
	let menuToggled = false
	let mouseX: number
	let mouseY: number
	let totalCards = 52
	let streakInterval: number
	let timeInterval: number
	let loader = false
	let validateScore = {
		0: {
			maxLength: 0,
			currentLength: 0,
		},
		1: {
			maxLength: 0,
			currentLength: 0,
		},
		2: {
			maxLength: 0,
			currentLength: 0,
		},
		3: {
			maxLength: 0,
			currentLength: 0,
		},
	}
	function reset() {
		stockPile = <Array<card>>[]
		wastePile = <Array<card>>[]
		tableau.forEach((ele) => {
			ele.faceDown = <Array<card>>[]
			ele.faceUp = <Array<card>>[]
		})
		foundation[0] = <Array<card>>[]
		foundation[1] = <Array<card>>[]
		foundation[2] = <Array<card>>[]
		foundation[3] = <Array<card>>[]

		clearInterval(timeInterval)
		time.minutes = 0
		time.seconds = 0
		totalCards = 52
		score = 0
		menuToggled = false
	}
	function setCardFaceDown(number: number) {
		for (let index = 0; index < number; index++) {
			let randomNumber = Math.floor(Math.random() * totalCards)
			tableau[number].faceDown.push(stockPile[randomNumber])
			stockPile.splice(randomNumber, 1)
			totalCards -= 1
		}
	}
	function shuffleAndArrangeCards() {
		for (let index = 0; index < 7; index++) {
			let randomNumber = Math.floor(Math.random() * totalCards)
			tableau[index].faceUp.push(stockPile[randomNumber])
			stockPile.splice(randomNumber, 1)
			totalCards -= 1
		}

		stockPile.sort(() => (Math.random() > 0.5 ? 1 : -1))
		for (let index = 1; index < 7; index++) {
			setCardFaceDown(index)
		}
	}
	function playStartAnimationAndAlignCards() {
		const containingBlock = document.querySelectorAll(".containing_block")
		shuffleSound.play()
		let index = 1
		let parentIndex = 1
		let startingParentIndex = 1
		containingBlock[0].children[1].classList.add("face-up-first-animation")
		let animationInterval = setInterval(() => {
			if (parentIndex > containingBlock.length - 1) {
				index++
				containingBlock[startingParentIndex].children[index].classList.add(
					"face-up-animation"
				)
				startingParentIndex++
				parentIndex = startingParentIndex
			} else {
				containingBlock[parentIndex].children[index].classList.add(
					"face-down-animation"
				)
				parentIndex++
			}
			if (index > 6) {
				gameLoadingAnimation = false
				containingBlock[0].children[1].classList.remove(
					"face-up-first-animation"
				)
				containingBlock.forEach((ele) => {
					for (let index = 0; index < ele.children.length; index++) {
						const element = ele.children[index]
						if (element.classList.contains("face-down-animation")) {
							element.classList.remove("face-down-animation")
						}
						if (element.classList.contains("face-up-animation")) {
							element.classList.remove("face-up-animation")
						}
					}
				})
				clearInterval(animationInterval)
				gameLoadingAnimation = false
			}
		}, 50)
	}
	function setTimer() {
		timeInterval = setInterval(() => {
			time.seconds++
			if (time.seconds > 59) {
				time.seconds = 0
				time.minutes += 1
			}
		}, 1000)
	}
	function startGame() {
		cardTypeWithComponent.forEach((card) => {
			card.components.forEach((component) => {
				const obj = <card>{
					card: card.card,
					component: component.component,
				}
				stockPile.push(obj)
			})
		})
		shuffleAndArrangeCards()
		let startGameTimeout = setTimeout(() => {
			const containingBlock = document.querySelectorAll(".containing_block")
			containingBlock.forEach((ele) => {
				const block = ele as HTMLDivElement
				alignElements(block)
			})
			playStartAnimationAndAlignCards()
			clearTimeout(startGameTimeout)
		}, 5)
		setTimer()
	}
	function startNewGame() {
		loader = true
		if (win) {
			win = false
		}

		clickSound.play()
		reset()
		cardTypeWithComponent.forEach((card) => {
			card.components.forEach((component) => {
				const obj = <card>{
					card: card.card,
					component: component.component,
				}
				stockPile.push(obj)
			})
		})
		let mainTimeout: number

		shuffleAndArrangeCards()
		tableau = tableau
		wastePile = wastePile
		stockPile = stockPile
		foundation = foundation
		score = score
		gameLoadingAnimation = true

		mainTimeout = setTimeout(() => {
			const containingBlock = document.querySelectorAll(".containing_block")
			containingBlock.forEach((ele) => {
				const block = ele as HTMLDivElement
				alignElements(block)
			})
			playStartAnimationAndAlignCards()
			clearTimeout(mainTimeout)
			loader = false

			setTimer()
		}, 1000)
	}
	function pauseAndPlayGame() {
		clickSound.play()
		pause = !pause
		if (pause) {
			clearInterval(timeInterval)
			clearInterval(streakInterval)
		} else {
			setTimer()
			streaking()
		}
	}
	function newGame() {
		clickSound.play()
		if (win) {
			win = false
		}
		if (!gameStarted) {
			gameStarted = true
		}

		startGame()
	}
	function streaking() {
		streakInterval = setInterval(() => {
			streak--
			if (streak < 1) {
				streak = 5
				clearInterval(streakInterval)
			}
		}, 1000)
	}
	function setScore(isFoundation: boolean) {
		if (streak < 5 && streak > 0) {
			isFoundation ? (score += 15) : (score += 10)
		} else {
			isFoundation ? (score += 10) : (score += 5)
		}
	}

	function revealAndRedealStockpile() {
		if (stockPile.length === 0) {
			stockPile = wastePile.reverse()
			stockPile = stockPile
			wastePile = <Array<card>>[]
			wastePile = wastePile
			reDeal.play()
		} else {
			const element = stockPile.pop()!
			wastePile.push(element)
			stockPile = stockPile
			wastePile = wastePile
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
	function showWinnigScreen() {
		if (
			validateScore[0].maxLength === 13 &&
			validateScore[1].maxLength === 13 &&
			validateScore[2].maxLength === 13 &&
			validateScore[3].maxLength === 13
		) {
			win = true
			winningSound.play()
			clearInterval(timeInterval)
		}
	}
	function dragStart(e: DragEvent) {
		const element = e.target as HTMLDivElement
		const parent = <HTMLDivElement>element.parentElement
		const dataWastePile = element.getAttribute("data-waste-pile")
		const dataFoundation = parent?.getAttribute("data-foundation")
		const dataTableau = parent?.getAttribute("data-tableau")
		dragStartSound.play()
		top = element.style.top
		left = element.style.left

		mouseX = e.x
		mouseY = e.y
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
		const img = document.createElement("img")
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

		const dragoverZone = document.querySelectorAll(".dragover_zone")
		dragoverZone.forEach((zone) => {
			zone.classList.add("show")
		})

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
			wastePile,
			tableau
		)
		let dropTimeout: number
		const setDropKey = (): keyof TFoundation => parentIndex as keyof TFoundation
		const dragKey = (): keyof TFoundation =>
			activeCardParentIndex as keyof TFoundation

		if (isDraggedFromWastePile) {
			if (dataTableau && dropCardToTableauRules()) {
				dropIfWastePileToTableau()
				tableau = tableau
				wastePile = wastePile
				dropSound.play()
				setScore(false)
				if (streak > 0 && streak < 5) {
					streak = 5
					streakInterval && clearInterval(streakInterval)
					streaking()
				} else {
					streaking()
				}
				dropTimeout = setTimeout(() => {
					const elements = document.querySelectorAll(
						'div[data-waste-pile="true"]'
					)
					elements.forEach((ele) => ele.classList.remove("hide-card"))
					alignElements(parent)
					clearTimeout(dropTimeout)
				}, 0)
			} else if (dataFoundation && dropCardToFoundationPileRules()) {
				const key = setDropKey()
				dropIfDraggedFromWastePile(key)

				wastePile = wastePile
				foundation = foundation
				parent.classList.add("valid-move")

				successAudio.play()
				validateScore[key].maxLength = foundation[key].length
				if (validateScore[key].currentLength < 0) {
					validateScore[key].currentLength++
				} else {
					setScore(true)
					if (streak > 0 && streak < 5) {
						streak = 5
						streakInterval && clearInterval(streakInterval)
						streaking()
					} else {
						streaking()
					}
				}

				setTimeout(() => {
					parent.classList.remove("valid-move")
				}, 800)
				dropTimeout = setTimeout(() => {
					const elements = document.querySelectorAll(
						'div[data-waste-pile="true"]'
					)
					elements.forEach((ele) => ele.classList.remove("hide-card"))
					clearTimeout(dropTimeout)
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
			validateScore[key].currentLength -= 1
			setTimeout(() => {
				alignElements(parent)
			}, 0)
		} else if (dataTableau && dropCardToTableauRules()) {
			dropIfTableauToTableau()
			tableau[activeCardParentIndex] = tableau[activeCardParentIndex]
			tableau = tableau
			setScore(false)
			if (streak > 0 && streak < 5) {
				streak = 5
				streakInterval && clearInterval(streakInterval)
				streaking()
			} else {
				streaking()
			}
			flipCard(activeCardParentIndex)
			dropSound.play()
			dropTimeout = setTimeout(() => {
				alignElements(parent)
				clearTimeout(dropTimeout)
			}, 0)
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
			parent.classList.add("valid-move")
			successAudio.play()
			validateScore[key].maxLength = foundation[key].length
			if (validateScore[key].currentLength < 0) {
				validateScore[key].currentLength++
			} else {
				setScore(true)
				if (streak > 0 && streak < 5) {
					streak = 5
					streakInterval && clearInterval(streakInterval)
					streaking()
				} else {
					streaking()
				}
			}
			dropTimeout = setTimeout(() => {
				parent.classList.remove("valid-move")
				clearTimeout(dropTimeout)
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
			dropTimeout = setTimeout(() => {
				parent.classList.remove("valid-move")
				clearTimeout(dropTimeout)
			}, 800)
		}

		showWinnigScreen()
		resetZIndex()
	}

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
	{#if loader}
		<Loader />
	{/if}
	{#if win}
		<div
			id="success"
			class="fixed w-screen h-screen bg-[#00000041] flex justify-center items-center z-50 inset-0"
		>
			<div
				class=" flex flex-col gap-4 max-w-2xl px-12 h-96 bg-[url(/src/assets/15717677_SL_120319_25700_10.jpg)] bg-left-top justify-center items-center transition-transform duration-700 ease-in -translate-y-[200%] {win &&
					'translate-y-0'}"
			>
				<span class="text-5xl font-extrabold uppercase gradient-text">
					Congratulations!
				</span>
				<span class="text-4xl font-extrabold uppercase gradient-text">
					You Win
				</span>
				<button
					on:click={startNewGame}
					class="bg-blue-500 border border-blue-500 transition-colors hover:bg-transparent text-white text-2xl py-2 px-8 rounded capitalize"
				>
					New Game
				</button>
			</div>
		</div>
	{/if}
	{#if gameStarted}
		<div
			class="absolute top-0 w-full h-11 before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-[#00000038] before:-z-10"
		>
			<div class="w-5/6 mx-auto h-full flex items-center justify-between">
				<div class="w-full">
					<button
						on:click={() => {
							clickSound.play()
							menuToggled = true
						}}
						class="w-8 aspect-square flex justify-center items-center bg-[#00000083] transition-opacity {menuToggled
							? 'opacity-0'
							: 'opacity-100'}"
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
		<div
			class="w-1/4 h-screen fixed top-0 flex flex-col items-center gap-8 left-0 py-24 bg-[#000000dc] z-50 transition-transform duration-150 {menuToggled
				? 'translate-x-0'
				: '-translate-x-full'}"
		>
			<button
				on:click={() => {
					clickSound.play()
					menuToggled = false
				}}
				class="absolute top-6 right-4"
			>
				<span>
					<svg
						viewBox="0 0 24 24"
						class="w-8 h-8"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier">
							<path
								d="M7.75716 7.75736C8.14768 7.36683 8.78084 7.36683 9.17137 7.75736L11.9998 10.5858L14.8283 7.75736C15.2188 7.36684 15.852 7.36684 16.2425 7.75736C16.6331 8.14789 16.6331 8.78105 16.2425 9.17158L13.4141 12L16.2424 14.8284C16.633 15.2189 16.633 15.8521 16.2424 16.2426C15.8519 16.6332 15.2187 16.6332 14.8282 16.2426L11.9998 13.4143L9.17146 16.2426C8.78094 16.6332 8.14777 16.6332 7.75725 16.2426C7.36672 15.8521 7.36672 15.219 7.75725 14.8284L10.5856 12L7.75716 9.17157C7.36663 8.78104 7.36663 8.14788 7.75716 7.75736Z"
								fill="#fff"
							></path>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
								fill="#fff"
							></path>
						</g></svg
					>
				</span>
			</button>
			<button on:click={startNewGame} class="flex gap-4 group">
				<span>
					<svg
						viewBox="0 0 32 32"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						class="w-10 h-10 group-hover:scale-90 transition-transform"
						fill="#000000"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier">
							<title>plus</title> <desc>Created with Sketch Beta.</desc>
							<defs> </defs>
							<g
								id="Page-1"
								stroke="none"
								stroke-width="1"
								fill="none"
								fill-rule="evenodd"
							>
								<g
									id="Icon-Set-Filled"
									transform="translate(-362.000000, -1037.000000)"
									fill="#00a3f5"
								>
									<path
										d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049"
										id="plus"
									>
									</path>
								</g>
							</g>
						</g></svg
					>
				</span>
				<span
					class="capitalize text-3xl font-bold text-white group-hover:text-[#00a3f5]"
					>new game</span
				>
			</button>
			<button on:click={pauseAndPlayGame} class=" flex gap-4 group">
				<span>
					{#if pause}
						<svg
							viewBox="0 0 24 24"
							fill="none"
							class="w-10 h-10 group-hover:scale-90 transition-transform"
							xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier">
								<path
									d="M3 12L3 18.9671C3 21.2763 5.53435 22.736 7.59662 21.6145L10.7996 19.8727M3 8L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L14.0026 18.131"
									stroke="#00a3f5"
									stroke-width="1.5"
									stroke-linecap="round"
								></path>
							</g></svg
						>
					{:else}
						<svg
							viewBox="0 0 24 24"
							class="w-10 h-10 group-hover:scale-90 transition-transform"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier">
								<path
									d="M2 18C2 19.8856 2 20.8284 2.58579 21.4142C3.17157 22 4.11438 22 6 22C7.88562 22 8.82843 22 9.41421 21.4142C10 20.8284 10 19.8856 10 18V6C10 4.11438 10 3.17157 9.41421 2.58579C8.82843 2 7.88562 2 6 2C4.11438 2 3.17157 2 2.58579 2.58579C2 3.17157 2 4.11438 2 6V14"
									stroke="#00a3f5"
									stroke-width="1.5"
									stroke-linecap="round"
								></path>
								<path
									d="M22 6C22 4.11438 22 3.17157 21.4142 2.58579C20.8284 2 19.8856 2 18 2C16.1144 2 15.1716 2 14.5858 2.58579C14 3.17157 14 4.11438 14 6V18C14 19.8856 14 20.8284 14.5858 21.4142C15.1716 22 16.1144 22 18 22C19.8856 22 20.8284 22 21.4142 21.4142C22 20.8284 22 19.8856 22 18V10"
									stroke="#00a3f5"
									stroke-width="1.5"
									stroke-linecap="round"
								></path>
							</g></svg
						>
					{/if}
				</span>
				<span
					class="capitalize text-3xl font-bold text-white group-hover:text-[#00a3f5]"
				>
					{pause ? "continue game" : "pause game"}
				</span>
			</button>
			<button class="flex gap-4 group">
				<span>
					<svg
						class="w-10 h-10 group-hover:scale-90 transition-transform"
						fill="#00a3f5"
						viewBox="0 0 32 32"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier">
							<title>recycle</title>
							<path
								d="M15.966 1.232c-0.97 0.021-1.901 0.261-2.807 0.655l1.404 2.62c0.463-0.165 0.937-0.277 1.404-0.281 1.599 0 3.292 0.853 4.585 3.088l5.333 9.264 1.778-2.901-4.491-7.86c-1.714-2.964-4.434-4.608-7.205-4.585 0 0 0 0 0 0zM7.171 8.811l-4.117 7.205c-1.569 2.715-1.68 5.792-0.374 8.234 0.541 1.012 1.362 1.842 2.339 2.526l1.497-2.526c-0.502-0.397-0.929-0.867-1.216-1.403-0.781-1.46-0.831-3.41 0.281-5.334l5.053-8.702h-3.462zM27.194 21.536c-0.098 0.48-0.239 0.896-0.468 1.311-0.801 1.448-2.372 2.526-4.866 2.526h-10.199l1.778 2.994h8.421c3.402 0 6.146-1.601 7.486-4.023 0.472-0.855 0.732-1.824 0.842-2.807l-2.994 0zM11.272 12.6l-6.728-3.879 6.728-3.879-0 7.759zM22.219 15.005l6.728 3.879 0-7.759-6.729 3.879zM8.193 26.81l6.728-3.879 0 7.759-6.729-3.879z"
							></path>
						</g></svg
					>
				</span>
				<span
					class="capitalize text-3xl font-bold text-white group-hover:text-[#00a3f5]"
				>
					change difficulty
				</span>
			</button>
		</div>
		<div class="w-4/5 mx-auto grid gap-4 gap-y-12 grid-cols-7">
			<div class="relative col-start-1 col-end-2 row-start-1 row-end-2">
				{#if stockPile.length === 0 && wastePile.length > 0}
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
				{:else if stockPile.length === 0 && wastePile.length === 0}
					<div
						class="relative {dimensions} border-2 border-white rounded-lg flex flex-col justify-center items-center gap-3"
					>
						<svg
							fill="#fff"
							viewBox="0 0 24 24"
							id="check-mark-circle-2"
							data-name="Flat Line"
							xmlns="http://www.w3.org/2000/svg"
							class="icon flat-line w-10"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier"
								><polyline
									id="primary"
									points="21 5 12 14 8 10"
									style="fill: none; stroke: #fff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"
								></polyline><path
									id="primary-2"
									data-name="primary"
									d="M20.94,11A8.26,8.26,0,0,1,21,12a9,9,0,1,1-9-9,8.83,8.83,0,0,1,4,1"
									style="fill: none; stroke: #fff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"
								></path></g
							></svg
						>
						<span class="text-white"> Solved! </span>
					</div>
				{:else}
					<div
						role="button"
						tabindex="0"
						on:click={revealAndRedealStockpile}
						on:keydown={keyBoardReveal}
					>
						<CardFaceDown />
					</div>
				{/if}
			</div>
			<div
				data-stack-faceup
				class="relative col-start-2 col-end-3 row-start-1 row-end-2"
			>
				{#each wastePile as card, index}
					{#if wastePile.length <= 3}
						{#if index === 0}
							<div
								data-waste-pile="true"
								data-card-rank={cardNumber(card?.card)}
								data-card-type={cardType(card?.component)}
								data-card-color={cardColor(card?.component)}
								draggable={draggableOne(wastePile)}
								role="application"
								on:dragstart={dragStart}
								on:drag={drag}
								on:dragend={dragEnd}
								class="{dimensions} {design} dragged top-0 stack_face_up {index ===
									wastePile.length - 1 && 'hide-card'}"
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
								draggable={draggableTwo(wastePile)}
								role="application"
								on:dragstart={dragStart}
								on:drag={drag}
								on:dragend={dragEnd}
								class="{dimensions} {design} dragged top-0 left-6 stack_face_up {index ===
									wastePile.length - 1 && 'hide-card'}"
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
									wastePile.length - 1 && 'hide-card'}"
							>
								<Placeholder {card} />
							</div>
						{/if}
					{:else}
						{#if index === wastePile.length - 3}
							<div
								data-waste-pile="true"
								data-card-rank={cardNumber(card?.card)}
								data-card-type={cardType(card?.component)}
								data-card-color={cardColor(card?.component)}
								draggable={draggableOne(wastePile)}
								role="application"
								on:dragstart={dragStart}
								on:drag={drag}
								on:dragend={dragEnd}
								class="{dimensions} {design} dragged top-0 stack_face_up"
							>
								<Placeholder {card} />
							</div>
						{/if}
						{#if index === wastePile.length - 2}
							<div
								data-waste-pile="true"
								data-card-rank={cardNumber(card?.card)}
								data-card-type={cardType(card?.component)}
								data-card-color={cardColor(card?.component)}
								draggable={draggableTwo(wastePile)}
								role="application"
								on:dragstart={dragStart}
								on:drag={drag}
								on:dragend={dragEnd}
								class="{dimensions} {design} dragged top-0 left-6 stack_face_up"
							>
								<Placeholder {card} />
							</div>
						{/if}
						{#if index === wastePile.length - 1}
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
									wastePile.length - 1 && 'hide-card'}"
							>
								<Placeholder {card} />
							</div>
						{/if}
					{/if}
				{/each}
			</div>
			<div
				data-foundation="0"
				class="relative {`h-[180px]`} col-start-4 col-end-5 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
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
				class="relative {dimensions} col-start-5 col-end-6 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
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
				class="relative {dimensions} col-start-6 col-end-7 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
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
				class="relative {dimensions} col-start-7 col-end-8 row-start-1 row-end-2 border-2 rounded-xl border-gray-100"
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
						class="{dimensions} {design} {gameLoadingAnimation &&
							'-translate-y-36'}"
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
					<div
						class="{dimensions} cursor-default {gameLoadingAnimation &&
							'-translate-y-36 -translate-x-24 opacity-0'}"
					>
						<CardFaceDown />
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
						class="{dimensions} {design} {gameLoadingAnimation &&
							'-translate-y-36 -translate-x-24 opacity-0'} "
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
					<div
						id={"_two" + index}
						class="{dimensions} {gameLoadingAnimation &&
							'-translate-y-36 -translate-x-24 opacity-0'} cursor-default"
					>
						<CardFaceDown />
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
						class="{dimensions} {design} {gameLoadingAnimation &&
							'-translate-y-36 -translate-x-24 opacity-0'}"
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
					<div
						id={"_three" + index}
						class="{dimensions} {gameLoadingAnimation &&
							'-translate-y-36 -translate-x-24 opacity-0'} cursor-default"
					>
						<CardFaceDown />
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
						class="{dimensions} {design} {gameLoadingAnimation &&
							'-translate-y-36 -translate-x-24 opacity-0'}"
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
					<div
						id={"_four" + index}
						class="{dimensions} {gameLoadingAnimation &&
							'-translate-y-36 -translate-x-24 opacity-0'} cursor-default"
					>
						<CardFaceDown />
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
						class="{dimensions} {design} {gameLoadingAnimation &&
							'-translate-y-36 -translate-x-24 opacity-0'}"
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
					<div
						id={"_five" + index}
						class="{dimensions} {gameLoadingAnimation &&
							'-translate-y-36 -translate-x-24 opacity-0'} cursor-default"
					>
						<CardFaceDown />
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
						class="{dimensions} {design} {gameLoadingAnimation &&
							'-translate-y-36 -translate-x-24 opacity-0'}"
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
					<div
						id={"_six" + index}
						class="{dimensions} {gameLoadingAnimation &&
							'-translate-y-36 -translate-x-24 opacity-0'} cursor-default"
					>
						<CardFaceDown />
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
						class="{dimensions} {design} {gameLoadingAnimation &&
							'-translate-y-36 -translate-x-24 opacity-0'}"
					>
						<Placeholder {card} />
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div
			class="h-screen w-screen fixed top-0 isolate flex flex-col justify-center"
		>
			<img
				draggable="false"
				src="/src/assets/15717677_SL_120319_25700_10.jpg"
				alt=""
				class="absolute inset-0 w-full h-full -z-10"
			/>
			<div class="max-w-2xl translate-x-52">
				<h1
					class="capitalize font-bold leading-[50px] text-white text-5xl mb-6"
				>
					Welcome to the world of Solitaire
				</h1>
				<div class="w-full flex justify-center">
					<button
						on:click={newGame}
						type="button"
						class="bg-blue-500 border border-blue-500 transition-colors hover:bg-transparent text-white text-2xl py-2 px-8 rounded capitalize"
					>
						start game
					</button>
				</div>
			</div>
		</div>
	{/if}
</main>

<style scoped>
	.gradient-text {
		background-image: linear-gradient(to bottom, #ff9900, #ff3366);
		background-clip: text;
		-webkit-background-clip: text; /* For Safari/Chrome */
		color: transparent;
	}

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
	.face-up-animation {
		animation: flip-translate 200ms ease forwards;
	}
	.face-up-first-animation {
		animation: flip-first-translate 200ms ease forwards;
	}
	.face-down-animation {
		animation: translate-y 200ms ease forwards;
	}
	@keyframes reveal-card {
		to {
			transform: translateX(0);
			opacity: 100;
		}
	}
	@keyframes translate-y {
		from {
			transform: translate(-5rem, -9rem);
			opacity: 1;
		}
		to {
			transform: translate(0);
			opacity: 1;
		}
	}
	@keyframes flip-translate {
		from {
			transform: translate(-5rem, -9rem) rotateY(90deg);
			opacity: 1;
		}
		to {
			transform: translate(0) rotateY(0);
			opacity: 1;
		}
	}
	@keyframes flip-first-translate {
		from {
			transform: translateY(-9rem) rotateY(90deg);
		}
		to {
			transform: translateY(0) rotateY(0);
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
