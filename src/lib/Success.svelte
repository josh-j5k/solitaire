<script lang="ts">
	import { startGame } from "../hooks/usePlayGame"
	import { store } from "../store.svelte"
</script>

<div
	id="success"
	class="fixed w-screen h-screen bg-[#00000041] flex justify-center items-center z-50 inset-0"
>
	<div
		class=" flex flex-col gap-4 max-w-2xl px-12 h-96 bg-[url(/src/assets/15717677_SL_120319_25700_10.jpg)] bg-left-top justify-center items-center transition-transform duration-700 ease-in -translate-y-[200%] {store.win &&
			'translate-y-0'}"
	>
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
