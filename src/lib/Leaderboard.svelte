<script lang="ts">
	import { store } from "../store.svelte"
	import Spinner from "./Spinner.svelte"
	import { pauseAndPlayGame } from "../hooks/usePlayGame"
</script>

<div
	class="max-w-3xl fixed inset-0 m-auto min-h-[80%] overflow-auto bg-black/90"
>
	<button
		aria-label="closeMenu"
		onclick={() => {
			pauseAndPlayGame()
			store.leaderboard = false
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
	{#if store.spinerState}
		<Spinner />
	{:else}
		<div class="w-full">
			<div class="flex justify-center items-center pt-8 gap-4 mb-4">
				<span>
					<svg
						class="w-14"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M4 0H12V2H16V4C16 6.45641 14.2286 8.49909 11.8936 8.92038C11.5537 10.3637 10.432 11.5054 9 11.874V14H12V16H4V14H7V11.874C5.56796 11.5054 4.44628 10.3637 4.1064 8.92038C1.77136 8.49909 0 6.45641 0 4V2H4V0ZM12 6.82929V4H14C14 5.30622 13.1652 6.41746 12 6.82929ZM4 4H2C2 5.30622 2.83481 6.41746 4 6.82929V4Z"
								fill="#d4bb16"
							></path>
						</g></svg
					>
				</span>
				<h1 class="uppercase text-4xl"> top 10 leaderbord </h1>
				<span>
					<svg
						class="w-14"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M4 0H12V2H16V4C16 6.45641 14.2286 8.49909 11.8936 8.92038C11.5537 10.3637 10.432 11.5054 9 11.874V14H12V16H4V14H7V11.874C5.56796 11.5054 4.44628 10.3637 4.1064 8.92038C1.77136 8.49909 0 6.45641 0 4V2H4V0ZM12 6.82929V4H14C14 5.30622 13.1652 6.41746 12 6.82929ZM4 4H2C2 5.30622 2.83481 6.41746 4 6.82929V4Z"
								fill="#d4bb16"
							></path>
						</g></svg
					>
				</span>
			</div>
			<div class="py-3 flex gap-2 mb-3 w-3/4 mx-auto">
				<h2
					class="uppercase relative before:content-[''] before:absolute before:left-0 before:right-0 before:mx-auto before:w-4 before:h-10 before:-z-10 before:top-10 before:bg-inherit flex-1 text-3xl py-1 px-2 text-center bg-green-900"
				>
					Name
				</h2>
				<h2
					class="uppercase relative before:content-[''] before:absolute before:left-0 before:right-0 before:mx-auto before:w-4 before:h-10 before:-z-10 before:top-10 before:bg-inherit flex-1 text-3xl py-1 px-2 text-center bg-green-900"
				>
					score
				</h2>
				<h2
					class="uppercase relative before:content-[''] before:absolute before:left-0 before:right-0 before:mx-auto before:w-4 before:h-10 before:-z-10 before:top-10 before:bg-inherit flex-1 text-3xl py-1 px-2 text-center bg-green-900"
				>
					time
				</h2>
			</div>
			<div class="w-3/4 mx-auto">
				{#each store.leaderboardData as data}
					<div class="w-full flex gap-4 mb-4">
						<div
							class="uppercase flex items-center justify-center py-1 px-4 flex-1 gap-2 rounded-xl round-shadow text-lg font-bold bg-green-700"
						>
							<span>
								<svg
									class="w-8"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
										id="SVGRepo_tracerCarrier"
										stroke-linecap="round"
										stroke-linejoin="round"
									></g><g id="SVGRepo_iconCarrier">
										<path
											d="M21.08 8.58003V15.42C21.08 16.54 20.48 17.58 19.51 18.15L13.57 21.58C12.6 22.14 11.4 22.14 10.42 21.58L4.48003 18.15C3.51003 17.59 2.91003 16.55 2.91003 15.42V8.58003C2.91003 7.46003 3.51003 6.41999 4.48003 5.84999L10.42 2.42C11.39 1.86 12.59 1.86 13.57 2.42L19.51 5.84999C20.48 6.41999 21.08 7.45003 21.08 8.58003Z"
											stroke="#ffffff"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M12 11.0001C13.2869 11.0001 14.33 9.95687 14.33 8.67004C14.33 7.38322 13.2869 6.34009 12 6.34009C10.7132 6.34009 9.67004 7.38322 9.67004 8.67004C9.67004 9.95687 10.7132 11.0001 12 11.0001Z"
											stroke="#ffffff"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M16 16.6601C16 14.8601 14.21 13.4001 12 13.4001C9.79 13.4001 8 14.8601 8 16.6601"
											stroke="#ffffff"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
									</g></svg
								>
							</span>
							{data.name.length > 10
								? data.name.slice(0, 10).concat("...")
								: data.name}
						</div>
						<div
							class="uppercase flex round-shadow flex-1 items-center justify-center py-1 px-4 gap-2 rounded-xl text-lg font-bold bg-green-700"
						>
							{data.score}
						</div>
						<div
							class="uppercase flex round-shadow text-lg font-bold gap-2 items-center justify-center py-1 px-4 flex-1 rounded-xl bg-green-700"
						>
							{data.time}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.round-shadow {
		box-shadow:
			4px 0 0 rgb(146, 146, 146),
			-4px 0 0 rgb(146, 146, 146);
	}
</style>
