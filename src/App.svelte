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
		state,
		time,
		foundation,
		tableau,
	} from "./store.svelte"
	import { pauseAndPlayGame, startNewGame, newGame } from "./hooks/usePlayGame"
	import { revealAndRedealStockpile } from "./hooks/useMoves"
	import drag from "./utils/drag"
	import dragEnd from "./utils/dragEnd"
	import dragStart from "./utils/dragStart"
	import drop from "./utils/drop"

	const { cardNumber, cardType, cardColor } = setCardNameAndNumberAtrribute()
	const { design, dimensions } = useDimensionDesign()
	const { clickSound } = audio()

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
</script>

<main
	ondragover={dragOver}
	role="application"
	class="min-h-screen w-screen pt-12 overflow-hidden relative isolate"
>
	{#if state.loader}
		<Loader />
	{/if}
	{#if state.win}
		<div
			id="success"
			class="fixed w-screen h-screen bg-[#00000041] flex justify-center items-center z-50 inset-0"
		>
			<div
				class=" flex flex-col gap-4 max-w-2xl px-12 h-96 bg-[url(/src/assets/15717677_SL_120319_25700_10.jpg)] bg-left-top justify-center items-center transition-transform duration-700 ease-in -translate-y-[200%] {state.win &&
					'translate-y-0'}"
			>
				<span class="text-5xl font-extrabold uppercase gradient-text">
					Congratulations!
				</span>
				<span class="text-4xl font-extrabold uppercase gradient-text">
					You Win
				</span>
				<button
					onclick={startNewGame}
					class="bg-blue-500 border border-blue-500 transition-colors hover:bg-transparent text-white text-2xl py-2 px-8 rounded capitalize"
				>
					New Game
				</button>
			</div>
		</div>
	{/if}
	{#if state.gameStarted}
		<div
			class="absolute top-0 w-full h-11 before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-[#00000038] before:-z-10"
		>
			<div class="w-5/6 mx-auto h-full flex items-center justify-between">
				<div class="w-full">
					<button
						aria-label="open menu"
						onclick={() => {
							clickSound.play()
							state.menuToggled = true
						}}
						class="w-8 aspect-square flex justify-center items-center bg-[#00000083] transition-opacity {state.menuToggled
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
						<span class="text-3xl text-white">{state.score}</span>
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
			class="w-1/4 h-screen fixed top-0 flex flex-col items-center gap-8 left-0 py-24 bg-[#000000dc] z-50 transition-transform duration-150 {state.menuToggled
				? 'translate-x-0'
				: '-translate-x-full'}"
		>
			<button
				aria-label="closeMenu"
				onclick={() => {
					clickSound.play()
					state.menuToggled = false
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
			<button onclick={startNewGame} class="flex gap-4 group">
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
			<button onclick={pauseAndPlayGame} class=" flex gap-4 group">
				<span>
					{#if state.pause}
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
					{state.pause ? "continue game" : "pause game"}
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
						onclick={revealAndRedealStockpile}
						onkeydown={keyBoardReveal}
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
						onclick={revealAndRedealStockpile}
						onkeydown={keyBoardReveal}
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
								ondragstart={dragStart}
								ondrag={drag}
								ondragend={dragEnd}
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
								ondragstart={dragStart}
								ondrag={drag}
								ondragend={dragEnd}
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
								ondragstart={dragStart}
								ondrag={drag}
								ondragend={dragEnd}
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
								ondragstart={dragStart}
								ondrag={drag}
								ondragend={dragEnd}
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
								ondragstart={dragStart}
								ondrag={drag}
								ondragend={dragEnd}
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
								ondragstart={dragStart}
								ondrag={drag}
								ondragend={dragEnd}
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
					ondragover={dragOver}
					role="application"
					ondrop={drop}
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
							ondragstart={dragStart}
							ondrag={drag}
							ondragend={dragEnd}
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
							ondragstart={dragStart}
							ondrag={drag}
							ondragend={dragEnd}
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
					ondragover={dragOver}
					role="application"
					ondrop={drop}
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
							ondragstart={dragStart}
							ondrag={drag}
							ondragend={dragEnd}
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
							ondragstart={dragStart}
							ondrag={drag}
							ondragend={dragEnd}
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
					ondragover={dragOver}
					role="application"
					ondrop={drop}
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
							ondragstart={dragStart}
							ondrag={drag}
							ondragend={dragEnd}
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
							ondragstart={dragStart}
							ondrag={drag}
							ondragend={dragEnd}
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
					ondragover={dragOver}
					role="application"
					ondrop={drop}
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
							ondragstart={dragStart}
							ondrag={drag}
							ondragend={dragEnd}
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
							ondragstart={dragStart}
							ondrag={drag}
							ondragend={dragEnd}
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
					ondragover={dragOver}
					role="application"
					ondrop={drop}
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
						ondragstart={dragStart}
						ondrag={drag}
						ondragend={dragEnd}
						class="{dimensions} {design} {state.gameLoadingAnimation &&
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
					ondragover={dragOver}
					role="application"
					ondrop={drop}
					class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
				>
				</div>
				{#each tableau[1].faceDown as _, index}
					<div
						class="{dimensions} cursor-default {state.gameLoadingAnimation &&
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
						ondragstart={dragStart}
						ondrag={drag}
						ondragend={dragEnd}
						class="{dimensions} {design} {state.gameLoadingAnimation &&
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
					ondragover={dragOver}
					role="application"
					ondrop={drop}
					class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
				>
				</div>
				{#each tableau[2].faceDown as _, index}
					<div
						id={"_two" + index}
						class="{dimensions} {state.gameLoadingAnimation &&
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
						ondragstart={dragStart}
						ondrag={drag}
						ondragend={dragEnd}
						class="{dimensions} {design} {state.gameLoadingAnimation &&
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
					ondragover={dragOver}
					role="application"
					ondrop={drop}
					class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
				>
				</div>
				{#each tableau[3].faceDown as _, index}
					<div
						id={"_three" + index}
						class="{dimensions} {state.gameLoadingAnimation &&
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
						ondragstart={dragStart}
						ondrag={drag}
						ondragend={dragEnd}
						class="{dimensions} {design} {state.gameLoadingAnimation &&
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
					ondragover={dragOver}
					role="application"
					ondrop={drop}
					class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
				>
				</div>
				{#each tableau[4].faceDown as _, index}
					<div
						id={"_four" + index}
						class="{dimensions} {state.gameLoadingAnimation &&
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
						ondragstart={dragStart}
						ondrag={drag}
						ondragend={dragEnd}
						class="{dimensions} {design} {state.gameLoadingAnimation &&
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
					ondragover={dragOver}
					role="application"
					ondrop={drop}
					class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
				></div>
				{#each tableau[5].faceDown as _, index}
					<div
						id={"_five" + index}
						class="{dimensions} {state.gameLoadingAnimation &&
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
						ondragstart={dragStart}
						ondrag={drag}
						ondragend={dragEnd}
						class="{dimensions} {design} {state.gameLoadingAnimation &&
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
					ondragover={dragOver}
					role="application"
					ondrop={drop}
					class="absolute w-full h-[inherit] inset-0 opacity-0 dragover_zone"
				>
				</div>
				{#each tableau[6].faceDown as _, index}
					<div
						id={"_six" + index}
						class="{dimensions} {state.gameLoadingAnimation &&
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
						ondragstart={dragStart}
						ondrag={drag}
						ondragend={dragEnd}
						class="{dimensions} {design} {state.gameLoadingAnimation &&
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
						onclick={newGame}
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
