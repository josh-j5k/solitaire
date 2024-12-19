<script lang="ts">
	import { store } from "../store.svelte"
	import { pauseAndPlayGame, startGame } from "../hooks/usePlayGame"

	const { clickSound } = $props()

	let dropdown = $state(false)
	function toggleDropdown() {
		clickSound.load()
		clickSound.play()
		dropdown = !dropdown
	}
	function changeDifficulty(e: string) {
		clickSound.load()
		clickSound.play()
		if (store.difficulty !== e) {
			store.difficulty = e
			startGame()
		}
	}
</script>

<div
	class="w-1/4 h-screen fixed top-0 left-0 py-24 bg-black/75 z-50 transition-transform duration-150 {store.menuToggled
		? 'translate-x-0'
		: '-translate-x-full'}"
>
	<nav class="flex flex-col items-center gap-8">
		<button
			aria-label="closeMenu"
			onclick={() => {
				clickSound.load()
				clickSound.play()
				store.menuToggled = false
			}}
			class="absolute top-6 right-4"
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
		<button onclick={startGame} class="flex gap-4 group">
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
				{#if store.pause}
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
				{store.pause ? "continue game" : "pause game"}
			</span>
		</button>
		<div class="relative">
			<button onclick={toggleDropdown} class="flex gap-4 group">
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
			{#if dropdown}
				<div class="bg-black/90 absolute left-4 top-12 w-11/12 p-8 z-30 shadow">
					<ul class="flex flex-col items-center gap-3 text-4xl">
						<button
							onclick={() => changeDifficulty("easy")}
							class="hover:text-blue-500 capitalize {store.difficulty ==
								'easy' && 'text-blue-500'}"
						>
							easy
						</button>
						<button
							onclick={() => changeDifficulty("normal")}
							class="hover:text-blue-500 capitalize {store.difficulty ==
								'normal' && 'text-blue-500'}"
						>
							normal
						</button>
						<button
							onclick={() => changeDifficulty("hard")}
							class="hover:text-blue-500 capitalize {store.difficulty ==
								'hard' && 'text-blue-500'}"
						>
							hard
						</button>
					</ul>
				</div>
			{/if}
		</div>
	</nav>
</div>
