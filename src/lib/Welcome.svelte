<script lang="ts">
	import { newGame } from "../hooks/usePlayGame"
</script>

<div class="h-screen w-screen fixed top-0 isolate flex flex-col justify-center">
	<img
		draggable="false"
		src="/src/assets/15717677_SL_120319_25700_10.jpg"
		alt=""
		class="absolute inset-0 w-full h-full -z-10"
	/>
	<div class="max-w-2xl md:translate-x-52 mx-auto">
		<h1
			class="capitalize font-bold px-8 md:bg-transparent bg-black/30 py-8 text-center leading-[60px] text-white text-5xl mb-6"
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
