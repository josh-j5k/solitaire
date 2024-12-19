<script lang="ts">
	import { store, time } from "../store.svelte"
	const { clickSound } = $props()
	let fullscreen = $state(false)
	async function toggleFullscreen() {
		if (document.fullscreenEnabled) {
			if (!document.fullscreenElement) {
				await document.documentElement.requestFullscreen()
				fullscreen = true
			} else if (document.exitFullscreen) {
				document.exitFullscreen()
				fullscreen = false
			}
		}
	}
</script>

<div
	class="absolute top-0 w-full h-11 before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-[#00000038] before:-z-10"
>
	<div class="w-5/6 mx-auto h-full flex items-center justify-between">
		<div class="w-full flex gap-5 capitalize">
			<button
				aria-label="open menu"
				onclick={() => {
					clickSound.load()
					clickSound.play()
					store.menuToggled = true
				}}
				class="w-8 aspect-square flex justify-center items-center bg-[#00000083] transition-opacity {store.menuToggled
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
			<button
				onclick={toggleFullscreen}
				class="text-white text-2xl"
				aria-label="toggle fullscreen"
			>
				{#if fullscreen}
					<span>
						<i class="fa-solid fa-compress"></i>
					</span>
				{:else}
					<span>
						<i class="fa-solid fa-expand"></i>
					</span>
				{/if}
			</button>
			<span class="text-3xl text-white">
				{store.difficulty}
			</span>
		</div>

		<div class="flex w-full justify-center gap-6 items-center">
			<div class="flex gap-3">
				<span class="text-3xl text-white">Score:</span>
				<span class="text-3xl text-white">{store.score}</span>
			</div>
		</div>

		<div class="flex w-full justify-end">
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
