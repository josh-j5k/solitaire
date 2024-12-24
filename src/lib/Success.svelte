<script lang="ts">
	import { startGame } from "../hooks/usePlayGame"
	import { store, time } from "../store.svelte"

	function keydown(event: KeyboardEvent) {
		if (event.code === "Enter" || event.code === "NumpadEnter") {
			submit()
		}
	}
	let submitted = $state(false)
	let loading = $state(false)
	let name = $state("")
	async function submit() {
		if (name.trim().length > 0) {
			loading = true
			const response = await fetch(
				import.meta.env.VITE_API_URL + "/api/solitaire/leaderboard",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name,
						score: store.score,
						time: time.minutes * 60 + time.seconds,
					}),
				}
			)
			if (response.ok) {
				submitted = true
				loading = false
			}
		}
	}
</script>

<div
	id="success"
	class="fixed w-screen h-screen bg-[#00000041] flex justify-center items-center z-50 inset-0"
>
	<div
		class=" flex flex-col gap-4 max-w-4xl px-12 h-96 bg-[url(/src/assets/15717677_SL_120319_25700_10.jpg)] bg-left-top justify-center items-center transition-transform duration-700 ease-in -translate-y-[200%] {store.win &&
			'translate-y-0'}"
	>
		{#if !submitted}
			<div class="flex justify-between w-full">
				<label for="name" class="flex flex-col text-2xl text-white">
					Name
					<input
						bind:value={name}
						onkeydown={keydown}
						placeholder="Enter your name"
						type="text"
						name="name"
						id="name"
						class="bg-transparent border-0 px-2 rounded outline-1 outline outline-blue-600"
					/>
				</label>
				<div class="flex flex-col text-2xl text-white">
					<span>Time</span>
					<span class="text-xl">
						<span>{time.minutes > 9 ? time.minutes : "0" + time.minutes}</span>
						:
						<span>{time.seconds > 9 ? time.seconds : "0" + time.seconds}</span>
					</span>
				</div>
				<div class="flex flex-col text-2xl text-white">
					<span>Score</span>
					<span class="text-xl">{store.score}</span>
				</div>
			</div>
			<div class="mb-8">
				<button
					onclick={submit}
					class=" bg-violet-700 flex gap-2 items-center px-3 py-1 rounded"
				>
					{#if loading}
						<span>
							<svg
								class="w-5 animate-spin"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
									id="SVGRepo_tracerCarrier"
									stroke-linecap="round"
									stroke-linejoin="round"
								></g><g id="SVGRepo_iconCarrier">
									<path
										d="M9 3.51221C5.50442 4.74772 3 8.08143 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.9706 21.0001 21 16.9707 21 12.0001C21 8.08143 18.4956 4.74772 15 3.51221"
										stroke="#0c79ed"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
								</g></svg
							>
						</span>
					{/if}
					Submit Score
				</button>
			</div>
		{:else}
			<div class="flex justify-center text-xl text-green-500">
				Score submitted successfuly
			</div>
		{/if}
		<span class="text-5xl font-extrabold uppercase gradient-text">
			Congratulations!
		</span>
		<span class="text-4xl font-extrabold uppercase gradient-text">
			You Win
		</span>
		<button
			onclick={startGame}
			class="bg-blue-500 border border-blue-500 transition-colors hover:bg-transparent text-white text-2xl py-2 px-8 rounded capitalize"
		>
			New Game
		</button>
	</div>
</div>
