<script lang="ts">
	import Placeholder from "./lib/Placeholder.svelte"
	import { setCardNameAndNumberAtrribute } from "./helpers/SetCardNameAndNumberAtrribute"
	import CardFaceDown from "./lib/CardFaceDown.svelte"
	import { design, dimensions } from "./utils/dimensionsAndDesign"
	import Loader from "./lib/Loader.svelte"
	import {
		stockPile,
		wastePile,
		store,
		foundation,
		tableau,
	} from "./store.svelte"
	import { revealAndRedealStockpile } from "./hooks/useMoves"
	import Header from "./lib/Header.svelte"
	import Menu from "./lib/Menu.svelte"
	import Welcome from "./lib/Welcome.svelte"
	import Success from "./lib/Success.svelte"
	import { onMount } from "svelte"
	import { clickSound } from "./utils/audio"
	import { useDragAndDrop } from "./hooks/useDragAndDrop.svelte"
	import type { TFoundation } from "./types/Cards"
	import { useTouch } from "./hooks/useTouch.svelte"
	import HowToPlay from "./lib/HowToPlay.svelte"
	import ScreenOrientationPopup from "./lib/ScreenOrientationPopup.svelte"
	import Spinner from "./lib/Spinner.svelte"
	import Leaderboard from "./lib/Leaderboard.svelte"

	const { cardNumber, cardType, cardColor } = setCardNameAndNumberAtrribute()
	const { ondrag, ondragend, ondragstart, ondrop } = useDragAndDrop()
	const { touch } = useTouch()
	function keyBoardReveal(ev: KeyboardEvent) {}
	function dragOver(e: DragEvent) {
		e.preventDefault()
		if (e.dataTransfer != null) {
			e.dataTransfer.dropEffect = "move"
		}
	}

	onMount(() => {
		const difficulty = localStorage.getItem("difficulty")
		if (difficulty) store.difficulty = difficulty
		if (innerWidth < 990) {
			store.offsetTop = 10
			store.height = 100
			document.getElementById("main")?.classList.add("mobile")
		}
		if (screen.orientation.type === "portrait-primary") {
			store.popup = true
		}
		screen.orientation.addEventListener("change", (event) => {
			const target = event.target as ScreenOrientation
			const type = target.type
			if (type === "landscape-primary") {
				store.popup = false
			} else {
				store.popup = true
			}
		})
		if (
			navigator.userAgent.includes("iPhone") ||
			navigator.userAgent.includes("Android")
		) {
			store.isMobile = true
		}

		document.documentElement.style.setProperty(
			"--offset-top",
			store.offsetTop.toString() + "px"
		)
	})
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
				<!-- How to play -->
				{#if store.howToPlay}
					<HowToPlay />
				{/if}
				<!-- header -->
				<Header {clickSound} />
				<!-- Hamburger Menu -->
				<Menu {clickSound} />
				<!-- Main Area -->

				<div
					class="w-4/5 mx-auto h-screen absolute inset-0 pt-12 -z-10 -lg:overflow-hidden grid gap-4 lg:gap-y-8 grid-cols-7 grid-rows-[150px_auto] -lg:grid-rows-[105px_auto]"
				>
					<!-- Stockpile -->
					<div
						class="relative h-[140px] -lg:h-[100px] col-start-1 col-end-2 row-auto"
					>
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
						class="relative col-start-2 col-end-3 h-[140px] -lg:h-[100px] row-auto"
					>
						{#each wastePile as card, index}
							<div
								data-waste-pile="true"
								data-card-rank={cardNumber(card.card)}
								data-card-type={cardType(card.component)}
								data-card-color={cardColor(card.component)}
								draggable={index === wastePile.length - 1}
								role="button"
								tabindex="0"
								onkeydown={keyBoardReveal}
								onclick={touch}
								{ondragstart}
								{ondrag}
								{ondragend}
								class="{dimensions} {design} absolute top-0 {wastePile.length <=
								3
									? `left-${index * 6}`
									: wastePile.length > 3 && index < wastePile.length - 3
										? 'hidden'
										: `left-${(index + 3 - wastePile.length) * 6}`} stack_face_up {index ===
								wastePile.length - 1
									? 'reveal-card'
									: ''}"
							>
								<Placeholder {card} />
							</div>
						{/each}
					</div>
					<div></div>
					<!-- foundation -->
					{#each Array(4) as _, index}
						<div
							data-foundation={index}
							class="relative {dimensions}  row-auto border-2 rounded-xl border-gray-100"
						>
							<div
								ondragover={dragOver}
								role="button"
								tabindex="0"
								onkeydown={keyBoardReveal}
								onclick={touch}
								{ondrop}
								class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
							>
							</div>

							{#each foundation[index as keyof TFoundation] as card, i}
								{#if i === foundation[index as keyof TFoundation].length - 2}
									<div
										data-card-rank={cardNumber(card.card)}
										data-card-type={cardType(card.component)}
										data-card-color={cardColor(card.component)}
										draggable="true"
										role="button"
										tabindex="0"
										onkeydown={keyBoardReveal}
										onclick={touch}
										{ondragstart}
										{ondrag}
										{ondragend}
										class=" {dimensions} {design} absolute top-0 left-0"
									>
										<Placeholder {card} />
									</div>
								{/if}
								{#if i === foundation[index as keyof TFoundation].length - 1}
									<div
										data-card-rank={cardNumber(card.card)}
										data-card-type={cardType(card.component)}
										data-card-color={cardColor(card.component)}
										draggable="true"
										role="button"
										tabindex="0"
										onkeydown={keyBoardReveal}
										onclick={touch}
										{ondragstart}
										{ondrag}
										{ondragend}
										class=" {dimensions} {design} absolute top-0 left-0"
									>
										<Placeholder {card} />
									</div>
								{/if}
							{/each}
						</div>
					{/each}

					<!-- Tableau -->
					{#each Array(7) as _, index}
						<div
							data-tableau={index}
							class="relative col-start-{index +
								1} containing_block row-start-2 row-end-3"
							><div
								ondragover={dragOver}
								role="button"
								tabindex="0"
								onkeydown={keyBoardReveal}
								onclick={touch}
								{ondrop}
								class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
							>
							</div>
							{#if index > 0}
								{#each tableau[index].faceDown as _}
									<div
										class="absolute {dimensions} cursor-default {store.gameLoadingAnimation
											? '-translate-y-36 -translate-x-24 opacity-0'
											: ''}"
									>
										<CardFaceDown />
									</div>
								{/each}
							{/if}
							{#each tableau[index].faceUp as card, i}
								<div
									data-card-rank={cardNumber(card.card)}
									data-card-type={cardType(card.component)}
									data-card-color={cardColor(card.component)}
									data-index={i}
									draggable="true"
									role="button"
									tabindex="0"
									onkeydown={keyBoardReveal}
									onclick={touch}
									{ondragstart}
									{ondrag}
									{ondragend}
									class="absolute stack_face_up {dimensions} {design} {store.gameLoadingAnimation &&
									index == 0
										? '-translate-y-36'
										: store.gameLoadingAnimation && index > 0
											? '-translate-y-36 -translate-x-24 opacity-0'
											: ''}"
								>
									<Placeholder {card} />
								</div>
							{/each}
						</div>
					{/each}
				</div>
			</section>
		{:else}
			<!-- welcome screen -->
			<Welcome />
		{/if}
	{/if}
	{#if store.popup}
		<ScreenOrientationPopup />
	{/if}
	{#if store.leaderboard}
		<Leaderboard />
	{/if}
</main>

<style scoped>
	main {
		--stack-face-up-offset: 15px;
	}
	.gradient-text {
		background-image: linear-gradient(to bottom, #ff9900, #ff3366);
		background-clip: text;
		-webkit-background-clip: text; /* For Safari/Chrome */
		color: transparent;
	}
	.left-0 {
		left: 0;
	}
	.left-12 {
		left: 48px;
	}
	.left-6 {
		left: 24px;
	}
	.left-12 {
		left: 48px;
	}
	:global(body) {
		background-image: url("./assets/perfect-green-grass.jpg");
	}

	.dragging {
		box-shadow:
			0 0 10px 4px rgba(255, 217, 0, 0.733),
			20px 20px 0 rgba(0, 0, 0, 0.2) !important;
		z-index: 10;
	}
	.dragover_zone {
		z-index: -1;
	}
	.dragover_zone.show {
		z-index: 999;
		background-color: #ff9900;
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
		animation: reveal-card 50ms ease-in-out;
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
		from {
			transform: translateX(-100px);
			opacity: 50;
		}
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

	.containing_block div:nth-child(2) {
		top: 0;
	}
	.containing_block div:nth-child(3) {
		top: calc(var(--offset-top) * 1);
	}
	.containing_block div:nth-child(4) {
		top: calc(var(--offset-top) * 2);
	}

	.containing_block div:nth-child(5) {
		top: calc(var(--offset-top) * 3);
	}
	.containing_block div:nth-child(6) {
		top: calc(var(--offset-top) * 4);
	}
	.containing_block div:nth-child(7) {
		top: calc(var(--offset-top) * 5);
	}
	.containing_block div:nth-child(8) {
		top: calc(var(--offset-top) * 6);
	}
	.containing_block div:nth-child(9) {
		top: calc(var(--offset-top) * 7);
	}
	.containing_block div:nth-child(10) {
		top: calc(var(--offset-top) * 8);
	}
	.containing_block div:nth-child(11) {
		top: calc(var(--offset-top) * 9);
	}
	.containing_block div:nth-child(12) {
		top: calc(var(--offset-top) * 10);
	}
	.containing_block div:nth-child(13) {
		top: calc(var(--offset-top) * 11);
	}
	.containing_block div:nth-child(14) {
		top: calc(var(--offset-top) * 12);
	}
	.containing_block div:nth-child(15) {
		top: calc(var(--offset-top) * 13);
	}
</style>
