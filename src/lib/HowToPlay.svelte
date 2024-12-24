<script lang="ts">
	import { store } from "../store.svelte"
	import { pauseAndPlayGame } from "../hooks/usePlayGame"

	let current = $state<string>("basic")
</script>

<div
	class="bg-black/90 fixed h-screen w-screen overflow-y-auto top-0 left-0 z-[9999]"
>
	<div class=" w-full fixed top-0 flex text-xl font-bold bg-blue-900">
		<button
			aria-label="closeMenu"
			onclick={() => {
				store.howToPlay = false
				pauseAndPlayGame()
			}}
			class="absolute top-1 right-4 z-50"
		>
			<span>
				<svg
					viewBox="0 0 24 24"
					class="w-6 h-8"
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
		<div
			class="flex-1 p-4 relative before:content-[''] before:absolute before:w-full before:h-2 before:left-0 before:bottom-0 hover:before:bg-blue-500 {current ==
			'basic'
				? 'before:bg-blue-500'
				: ''}"
		>
			<button onclick={() => (current = "basic")}> Basics </button>
		</div>
		<div
			class="flex-1 p-4 relative before:content-[''] before:absolute before:w-full before:h-2 before:left-0 before:bottom-0 hover:before:bg-blue-500 {current ==
			'tips'
				? 'before:bg-blue-500'
				: ''}"
		>
			<button onclick={() => (current = "tips")}> Tips & Tricks </button>
		</div>
		<div
			class="flex-1 p-4 relative before:content-[''] before:absolute before:w-full before:h-2 before:left-0 before:bottom-0 hover:before:bg-blue-500 {current ==
			'scoring'
				? 'before:bg-blue-500'
				: ''}"
		>
			<button onclick={() => (current = "scoring")} class="flex-1">
				Scoring
			</button>
		</div>
		<div
			class="flex-1 p-4 relative before:content-[''] before:absolute before:w-full before:h-2 before:left-0 before:bottom-0 hover:before:bg-blue-500 {current ==
			'controls'
				? 'before:bg-blue-500'
				: ''}"
		>
			<button onclick={() => (current = "controls")} class="flex-1">
				Controls
			</button>
		</div>
	</div>
	<div class="pt-16 bg-black/80 min-h-screen text-white">
		{#if current === "basic"}
			<div class="max-w-3xl mx-auto border-b border-white py-8">
				<h2 class="text-2xl font-bold pb-6"> Objectives </h2>
				<div class="grid grid-cols-2 -lg:grid-cols-1 gap-4">
					<p class="text-xl"
						>The goal of Solitaire is to move all cards into four foundation
						piles, creating one pile per suit in ascending order from Ace up to
						King.
					</p>
					<img
						class="-lg:row-start-1"
						src="/src/assets/Screenshot 2024-12-23 215054.png"
						alt=""
					/>
				</div>
			</div>
			<div class="max-w-3xl mx-auto border-b border-white py-8">
				<h2 class="text-2xl font-bold pb-6"> Foundation Piles </h2>
				<div class="grid grid-cols-2 -lg:grid-cols-1 gap-4">
					<p class="text-xl"
						>To Start a foundation pile, place an Ace in the foundation and then
						add cards of the same suit in ascending order: A, 2, 3, 4, 5, 6, 7,
						8, 9, 10, J, Q, K.
					</p>
					<img
						class="-lg:row-start-1"
						src="/src/assets/Screenshot 2024-12-23 221515.png"
						alt=""
					/>
				</div>
			</div>
			<div class="max-w-3xl mx-auto border-b border-white py-8">
				<h2 class="text-2xl font-bold pb-6">Columns </h2>
				<div class="grid grid-cols-2 -lg:grid-cols-1 gap-4">
					<div>
						<p class="text-xl mb-6"
							>Move cards to the foundation or another column to create stacks
							and uncover face-down cards
						</p>
						<p class="text-xl"
							>Stacks must alternate between red and black suits and be in
							descending order: K, Q, J , 10, 9, 8, 7, 6, 5, 4, 3, 2, A.
						</p>
					</div>
					<img
						class="-lg:row-start-1"
						src="/src/assets/Screenshot (27).png"
						alt=""
					/>
				</div>
			</div>
			<div class="max-w-3xl mx-auto border-b border-white py-8">
				<h2 class="text-2xl font-bold pb-6">Empty Columns </h2>
				<div class="grid grid-cols-2 -lg:grid-cols-1 gap-4">
					<div>
						<p class="text-xl mb-6"
							>Empty columns are created when you move the last card of a
							column.
						</p>
						<p class="text-xl">Only Kings may be moved to empty column. </p>
					</div>
					<img
						class="-lg:row-start-1"
						src="/src/assets/Screenshot (251).png"
						alt=""
					/>
				</div>
			</div>
		{:else if current === "tips"}
			<div class="max-w-3xl mx-auto border-b border-white py-8">
				<h2 class="text-2xl font-bold pb-6">Face-Down Cards </h2>
				<div class="grid grid-cols-2 -lg:grid-cols-1 gap-4">
					<div>
						<p class="text-xl"
							>It is a good strategy to uncover face-down cards as quick as
							possible.
						</p>
					</div>
					<img
						class="-lg:row-start-1"
						src="/src/assets/Screenshot (251).png"
						alt=""
					/>
				</div>
			</div>
		{:else if current == "scoring"}
			<div class="max-w-3xl mx-auto border-b border-white py-8">
				<h2 class="text-2xl font-bold pb-6">Scoring</h2>
				<div class="">
					<div>
						<p class="text-xl mb-6"
							>For the easy difficulty, earn 10 points for moving cards to the
							foundation, and 5 points for uncovering face-down cards or moving
							cards from the stock pile.
						</p>
						<p class="text-xl mb-6"
							>You a points multiplayer of 1 for the easy mode, 1.5 for nomarl,
							2 for hard and 2.5 for extreme
						</p>
						<p class="text-xl mb-6"
							>When streaking, your points goes up from 10 to 15 for moving
							cards to foundation, 10 points for uncovering face-down cards or
							moving cards from the stock pile.
						</p>
						<p class="text-xl"
							>After every valid move, you have 5 seconds for the easy mode, 4
							seconds for normal, and 3 seconds for hard to get a valid move, to
							keep the streak alive
						</p>
					</div>
				</div>
			</div>
		{:else}
			<div class="max-w-3xl mx-auto border-b border-white py-8">
				{#if !store.isMobile}
					<h2 class="text-2xl font-bold pb-6">Drag and Drop</h2>
					<div class="">
						<p class="text-xl mb-6"
							>You move cards around by performing a drag and drop action
						</p>
					</div>
				{:else}
					<h2 class="text-2xl font-bold pb-6">Touch</h2>
					<div class="">
						<p class="text-xl mb-6"
							>You move cards around by tapping on the desired card you want to
							move around, then tap on the on the desired location
						</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
