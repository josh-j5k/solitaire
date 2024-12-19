<script lang="ts">
	import Placeholder from "./lib/Placeholder.svelte"
	import audio from "./hooks/useAudio"
	import { setCardNameAndNumberAtrribute } from "./helpers/SetCardNameAndNumberAtrribute"
	import CardFaceDown from "./lib/CardFaceDown.svelte"
	import { useDimensionDesign } from "./helpers/DimensionDesigns"
	import Loader from "./lib/Loader.svelte"
	import {
		stockPile,
		wastePile,
		store,
		foundation,
		tableau,
	} from "./store.svelte"
	import { revealAndRedealStockpile } from "./hooks/useMoves"
	import ondrag from "./utils/drag"
	import dragEnd from "./utils/dragEnd"
	import dragStart from "./utils/dragStart"
	import drop from "./utils/drop"
	import Header from "./lib/Header.svelte"
	import Menu from "./lib/Menu.svelte"
	import Welcome from "./lib/Welcome.svelte"
	import Success from "./lib/Success.svelte"
	import { onMount } from "svelte"
	import touchStart from "./utils/touchStart"
	import touchMove from "./utils/touchMove"
	import touchEnd from "./utils/touchEnd"

	const { cardNumber, cardType, cardColor } = setCardNameAndNumberAtrribute()
	const { design, dimensions } = useDimensionDesign()
	const { clickSound, shuffleSound } = audio()

	function keyBoardReveal(ev: KeyboardEvent) {}
	function dragOver(e: DragEvent) {
		e.preventDefault()
		if (e.dataTransfer != null) {
			e.dataTransfer.dropEffect = "move"
		}
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
	onMount(() => {})
</script>

<main id="main" ondragover={dragOver} role="application">
	{#if store.loader}
		<Loader />
	{:else}
		{#if store.win}
			<Success />
		{/if}
		{#if store.gameStarted}
			<section
				class="min-h-screen w-screen pt-12 overflow-hidden relative isolate"
			>
				<!-- header -->
				<Header {clickSound} />
				<!-- Hamburger Menu -->
				<Menu {clickSound} />
				<!-- Main Area -->
				<div
					class="w-4/5 mx-auto h-screen absolute inset-0 pt-12 -z-10 -lg:overflow-hidden grid gap-4 lg:gap-y-8 grid-cols-7 grid-rows-[150px_auto]"
				>
					<!-- Stockpile -->
					<div class="relative h-[140px] col-start-1 col-end-2 row-auto">
						{#if stockPile.length === 0 && wastePile.length > 0}
							<div
								id="container"
								role="button"
								tabindex="0"
								onclick={revealAndRedealStockpile}
								onkeydown={keyBoardReveal}
								class="relative {dimensions} border-2 border-white cursor-pointer rounded-lg before:content-[''] before:absolute before:w-1/2 before:aspect-square before:border-2
					before:rounded-full before:border-white before:inset-0
					before:m-auto
					 before:bg-transparent"
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
								class="w-4/5"
								role="button"
								tabindex="0"
								onclick={revealAndRedealStockpile}
								onkeydown={keyBoardReveal}
							>
								<CardFaceDown />
							</div>
						{/if}
					</div>
					<!-- wastePile -->
					<div
						data-stack-faceup
						class="relative col-start-2 col-end-3 h-[140px] row-auto"
					>
						{#each wastePile as card, index}
							{#if wastePile.length <= 3}
								{#if index === 0}
									<div
										data-waste-pile="true"
										data-card-rank={cardNumber(card.card)}
										data-card-type={cardType(card.component)}
										data-card-color={cardColor(card.component)}
										draggable={draggableOne(wastePile)}
										role="application"
										ondragstart={dragStart}
										{ondrag}
										ondragend={dragEnd}
										ontouchstart={touchStart}
										ontouchmove={touchMove}
										ontouchend={touchEnd}
										class=" {dimensions} {design} dragged top-0 stack_face_up {index ===
										wastePile.length - 1
											? 'hide-card'
											: ''}"
									>
										<Placeholder {card} />
									</div>
								{/if}
								{#if index === 1}
									<div
										data-waste-pile="true"
										data-card-rank={cardNumber(card.card)}
										data-card-type={cardType(card.component)}
										data-card-color={cardColor(card.component)}
										draggable={draggableTwo(wastePile)}
										role="application"
										ondragstart={dragStart}
										{ondrag}
										ondragend={dragEnd}
										class=" {dimensions} {design} dragged top-0 left-6 stack_face_up {index ===
										wastePile.length - 1
											? 'hide-card'
											: ''}"
									>
										<Placeholder {card} />
									</div>
								{/if}
								{#if index === 2}
									<div
										data-waste-pile="true"
										data-card-rank={cardNumber(card.card)}
										data-card-type={cardType(card.component)}
										data-card-color={cardColor(card.component)}
										draggable="true"
										role="application"
										ondragstart={dragStart}
										{ondrag}
										ondragend={dragEnd}
										class=" {dimensions} {design} dragged top-0 left-12 stack_face_up {index ===
										wastePile.length - 1
											? 'hide-card'
											: ''}"
									>
										<Placeholder {card} />
									</div>
								{/if}
							{:else}
								{#if index === wastePile.length - 3}
									<div
										data-waste-pile="true"
										data-card-rank={cardNumber(card.card)}
										data-card-type={cardType(card.component)}
										data-card-color={cardColor(card.component)}
										draggable={draggableOne(wastePile)}
										role="application"
										ondragstart={dragStart}
										{ondrag}
										ondragend={dragEnd}
										class=" {dimensions} {design} dragged top-0 stack_face_up"
									>
										<Placeholder {card} />
									</div>
								{/if}
								{#if index === wastePile.length - 2}
									<div
										data-waste-pile="true"
										data-card-rank={cardNumber(card.card)}
										data-card-type={cardType(card.component)}
										data-card-color={cardColor(card.component)}
										draggable={draggableTwo(wastePile)}
										role="application"
										ondragstart={dragStart}
										{ondrag}
										ondragend={dragEnd}
										class=" {dimensions} {design} dragged top-0 left-6 stack_face_up"
									>
										<Placeholder {card} />
									</div>
								{/if}
								{#if index === wastePile.length - 1}
									<div
										data-waste-pile="true"
										data-card-rank={cardNumber(card.card)}
										data-card-type={cardType(card.component)}
										data-card-color={cardColor(card.component)}
										draggable="true"
										role="application"
										ondragstart={dragStart}
										{ondrag}
										ondragend={dragEnd}
										class=" {dimensions} {design} dragged top-0 left-12 stack_face_up {index ===
										wastePile.length - 1
											? 'hide-card'
											: ''}"
									>
										<Placeholder {card} />
									</div>
								{/if}
							{/if}
						{/each}
					</div>
					<!-- foundation -->
					<div
						data-foundation="0"
						class="relative {dimensions} col-start-4 col-end-5 row-auto border-2 rounded-xl border-gray-100"
					>
						<div
							ondragover={dragOver}
							role="application"
							ondrop={drop}
							class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
						>
						</div>

						{#each foundation[0] as card, index}
							{#if index === foundation[0].length - 2}
								<div
									data-card-rank={cardNumber(card.card)}
									data-card-type={cardType(card.component)}
									data-card-color={cardColor(card.component)}
									draggable="true"
									role="application"
									ondragstart={dragStart}
									{ondrag}
									ondragend={dragEnd}
									class=" {dimensions} {design} dragged top-0 left-0"
								>
									<Placeholder {card} />
								</div>
							{/if}
							{#if index === foundation[0].length - 1}
								<div
									data-card-rank={cardNumber(card.card)}
									data-card-type={cardType(card.component)}
									data-card-color={cardColor(card.component)}
									draggable="true"
									role="application"
									ondragstart={dragStart}
									{ondrag}
									ondragend={dragEnd}
									class=" {dimensions} {design} dragged top-0 left-0"
								>
									<Placeholder {card} />
								</div>
							{/if}
						{/each}
					</div>
					<div
						data-foundation="1"
						class="relative {dimensions} col-start-5 col-end-6 row-auto border-2 rounded-xl border-gray-100"
					>
						<div
							ondragover={dragOver}
							role="application"
							ondrop={drop}
							class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
						>
						</div>
						{#each foundation[1] as card, index}
							{#if index === foundation[1].length - 2}
								<div
									data-card-rank={cardNumber(card.card)}
									data-card-type={cardType(card.component)}
									data-card-color={cardColor(card.component)}
									draggable="true"
									role="application"
									ondragstart={dragStart}
									{ondrag}
									ondragend={dragEnd}
									class=" {dimensions} {design} dragged top-0 left-0"
								>
									<Placeholder {card} />
								</div>
							{/if}
							{#if index === foundation[1].length - 1}
								<div
									data-card-rank={cardNumber(card.card)}
									data-card-type={cardType(card.component)}
									data-card-color={cardColor(card.component)}
									draggable="true"
									role="application"
									ondragstart={dragStart}
									{ondrag}
									ondragend={dragEnd}
									class=" {dimensions} {design} dragged top-0 left-0"
								>
									<Placeholder {card} />
								</div>
							{/if}
						{/each}
					</div>
					<div
						data-foundation="2"
						class="relative {dimensions} col-start-6 col-end-7 row-auto border-2 rounded-xl border-gray-100"
					>
						<div
							ondragover={dragOver}
							role="application"
							ondrop={drop}
							class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
						>
						</div>
						{#each foundation[2] as card, index}
							{#if index === foundation[2].length - 2}
								<div
									data-card-rank={cardNumber(card.card)}
									data-card-type={cardType(card.component)}
									data-card-color={cardColor(card.component)}
									data-index={index}
									draggable="true"
									role="application"
									ondragstart={dragStart}
									{ondrag}
									ondragend={dragEnd}
									class=" {dimensions} {design} dragged top-0 left-0"
								>
									<Placeholder {card} />
								</div>
							{/if}
							{#if index === foundation[2].length - 1}
								<div
									data-card-rank={cardNumber(card.card)}
									data-card-type={cardType(card.component)}
									data-card-color={cardColor(card.component)}
									data-index={index}
									draggable="true"
									role="application"
									ondragstart={dragStart}
									{ondrag}
									ondragend={dragEnd}
									class=" {dimensions} {design} dragged top-0 left-0"
								>
									<Placeholder {card} />
								</div>
							{/if}
						{/each}
					</div>
					<div
						data-foundation="3"
						class="relative {dimensions} col-start-7 col-end-8 row-auto border-2 rounded-xl border-gray-100"
					>
						<div
							ondragover={dragOver}
							role="application"
							ondrop={drop}
							class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
						>
						</div>
						{#each foundation[3] as card, index}
							{#if index === foundation[3].length - 2}
								<div
									data-card-rank={cardNumber(card.card)}
									data-card-type={cardType(card.component)}
									data-card-color={cardColor(card.component)}
									data-index={index}
									draggable="true"
									role="application"
									ondragstart={dragStart}
									{ondrag}
									ondragend={dragEnd}
									class=" {dimensions} {design} dragged top-0 left-0"
								>
									<Placeholder {card} />
								</div>
							{/if}
							{#if index === foundation[3].length - 1}
								<div
									data-card-rank={cardNumber(card.card)}
									data-card-type={cardType(card.component)}
									data-card-color={cardColor(card.component)}
									data-index={index}
									draggable="true"
									role="application"
									ondragstart={dragStart}
									{ondrag}
									ondragend={dragEnd}
									class=" {dimensions} {design} dragged top-0 left-0"
								>
									<Placeholder {card} />
								</div>
							{/if}
						{/each}
					</div>
					<!-- Tableau -->
					<div
						data-tableau="0"
						class="relative col-start-1 containing_block row-start-2 row-end-3"
						><div
							ondragover={dragOver}
							role="application"
							ondrop={drop}
							class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
						>
						</div>
						{#each tableau[0].faceUp as card, index}
							<div
								data-card-rank={cardNumber(card.card)}
								data-card-type={cardType(card.component)}
								data-card-color={cardColor(card.component)}
								data-index={index}
								draggable="true"
								role="application"
								ondragstart={dragStart}
								{ondrag}
								ondragend={dragEnd}
								class=" {dimensions} {design} {store.gameLoadingAnimation
									? '-translate-y-36'
									: ''}"
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
							ondragover={dragOver}
							role="application"
							ondrop={drop}
							class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
						>
						</div>
						{#each tableau[1].faceDown as _, index}
							<div
								class=" {dimensions} cursor-default {store.gameLoadingAnimation
									? '-translate-y-36 -translate-x-24 opacity-0'
									: ''}"
							>
								<CardFaceDown />
							</div>
						{/each}
						{#each tableau[1].faceUp as card, index}
							<div
								data-card-rank={cardNumber(card.card)}
								data-card-type={cardType(card.component)}
								data-card-color={cardColor(card.component)}
								data-index={index}
								draggable="true"
								role="application"
								ondragstart={dragStart}
								{ondrag}
								ondragend={dragEnd}
								class=" {dimensions} {design} {store.gameLoadingAnimation
									? '-translate-y-36 -translate-x-24 opacity-0'
									: ''} "
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
							ondragover={dragOver}
							role="application"
							ondrop={drop}
							class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
						>
						</div>
						{#each tableau[2].faceDown as _, index}
							<div
								id={"_two" + index}
								class=" {dimensions} {store.gameLoadingAnimation
									? '-translate-y-36 -translate-x-24 opacity-0'
									: ''} cursor-default"
							>
								<CardFaceDown />
							</div>
						{/each}
						{#each tableau[2].faceUp as card, index}
							<div
								data-card-rank={cardNumber(card.card)}
								data-card-type={cardType(card.component)}
								data-card-color={cardColor(card.component)}
								data-index={index}
								draggable="true"
								role="application"
								ondragstart={dragStart}
								{ondrag}
								ondragend={dragEnd}
								class=" {dimensions} {design} {store.gameLoadingAnimation
									? '-translate-y-36 -translate-x-24 opacity-0'
									: ''}"
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
							ondragover={dragOver}
							role="application"
							ondrop={drop}
							class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
						>
						</div>
						{#each tableau[3].faceDown as _, index}
							<div
								id={"_three" + index}
								class=" {dimensions} {store.gameLoadingAnimation &&
									'-translate-y-36 -translate-x-24 opacity-0'} cursor-default"
							>
								<CardFaceDown />
							</div>
						{/each}
						{#each tableau[3].faceUp as card, index}
							<div
								data-card-rank={cardNumber(card.card)}
								data-card-type={cardType(card.component)}
								data-card-color={cardColor(card.component)}
								data-index={index}
								draggable="true"
								role="application"
								ondragstart={dragStart}
								{ondrag}
								ondragend={dragEnd}
								class=" {dimensions} {design} {store.gameLoadingAnimation
									? '-translate-y-36 -translate-x-24 opacity-0'
									: ''}"
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
							ondragover={dragOver}
							role="application"
							ondrop={drop}
							class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
						>
						</div>
						{#each tableau[4].faceDown as _, index}
							<div
								id={"_four" + index}
								class=" {dimensions} {store.gameLoadingAnimation
									? '-translate-y-36 -translate-x-24 opacity-0'
									: ''} cursor-default"
							>
								<CardFaceDown />
							</div>
						{/each}
						{#each tableau[4].faceUp as card, index}
							<div
								data-card-rank={cardNumber(card.card)}
								data-card-type={cardType(card.component)}
								data-card-color={cardColor(card.component)}
								data-index={index}
								draggable="true"
								role="application"
								ondragstart={dragStart}
								{ondrag}
								ondragend={dragEnd}
								class=" {dimensions} {design} {store.gameLoadingAnimation
									? '-translate-y-36 -translate-x-24 opacity-0'
									: ''}"
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
							ondragover={dragOver}
							role="application"
							ondrop={drop}
							class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
						></div>
						{#each tableau[5].faceDown as _, index}
							<div
								id={"_five" + index}
								class=" {dimensions} {store.gameLoadingAnimation
									? '-translate-y-36 -translate-x-24 opacity-0'
									: ''} cursor-default"
							>
								<CardFaceDown />
							</div>
						{/each}
						{#each tableau[5].faceUp as card, index}
							<div
								data-card-rank={cardNumber(card.card)}
								data-card-type={cardType(card.component)}
								data-card-color={cardColor(card.component)}
								data-index={index}
								draggable="true"
								role="application"
								ondragstart={dragStart}
								{ondrag}
								ondragend={dragEnd}
								class=" {dimensions} {design} {store.gameLoadingAnimation
									? '-translate-y-36 -translate-x-24 opacity-0'
									: ''}"
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
							ondragover={dragOver}
							role="application"
							ondrop={drop}
							class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
						>
						</div>
						{#each tableau[6].faceDown as _, index}
							<div
								id={"_six" + index}
								class=" {dimensions} {store.gameLoadingAnimation
									? '-translate-y-36 -translate-x-24 opacity-0'
									: ''} cursor-default"
							>
								<CardFaceDown />
							</div>
						{/each}
						{#each tableau[6].faceUp as card, index}
							<div
								data-card-rank={cardNumber(card.card)}
								data-card-type={cardType(card.component)}
								data-card-color={cardColor(card.component)}
								data-index={index}
								draggable="true"
								role="application"
								ondragstart={dragStart}
								{ondrag}
								ondragend={dragEnd}
								class=" {dimensions} {design} {store.gameLoadingAnimation
									? '-translate-y-36 -translate-x-24 opacity-0'
									: ''}"
							>
								<Placeholder {card} />
							</div>
						{/each}
					</div>
				</div>
			</section>
		{:else}
			<!-- welcome screen -->
			<Welcome />
		{/if}
	{/if}
</main>

<style scoped>
	.gradient-text {
		background-image: linear-gradient(to bottom, #ff9900, #ff3366);
		background-clip: text;
		-webkit-background-clip: text; /* For Safari/Chrome */
		color: transparent;
	}

	section {
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
	div[data-foundation] > * {
		width: 100%;
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
