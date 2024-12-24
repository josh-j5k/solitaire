<script lang="ts">
	import { startGame } from "../hooks/usePlayGame"
	import { store, time } from "../store.svelte"

	function keydown(event: KeyboardEvent) {
		if (event.code === "Enter" || event.code === "NumpadEnter") {
			submit()
		}
	}
	function submit() {}
</script>

<div
	id="success"
	class="fixed w-screen h-screen bg-[#00000041] flex justify-center items-center z-50 inset-0"
>
	<div
		class=" flex flex-col gap-4 max-w-4xl px-12 h-96 bg-[url(/src/assets/15717677_SL_120319_25700_10.jpg)] bg-left-top justify-center items-center transition-transform duration-700 ease-in -translate-y-[200%] {store.win &&
			'translate-y-0'}"
	>
		<div class="flex justify-between w-full">
			<label for="name" class="flex flex-col text-2xl text-white">
				Name
				<input
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
			<button onclick={submit} class=" bg-violet-700 px-3 py-1 rounded">
				Submit Score
			</button>
		</div>
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
