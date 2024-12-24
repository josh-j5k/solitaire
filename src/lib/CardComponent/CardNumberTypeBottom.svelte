<script lang="ts">
	import Component from "../Component.svelte"
	import type { component } from "../../types/Cards"

	let {
		class_props,
		component,
		card_number,
	}: { class_props: string; component: component; card_number: string } =
		$props()
</script>

<div
	class="absolute lg:bottom-1 bottom-0 right-2 rotate-180 flex flex-col items-center"
>
	<span class=" font-bold text-xl text-{class_props}"> {card_number} </span>
	<span class="w-3 aspect-square -lg:-mt-1">
		<Component {component}></Component>
	</span>
</div>
