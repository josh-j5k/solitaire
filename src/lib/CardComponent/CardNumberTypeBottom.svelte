<script lang="ts">
	import type { component } from "../../types/Cards"
	let {
		Component,
		class_props,
		card_number,
	}: { Component: component; class_props: string; card_number: string } =
		$props()
</script>

<div class="absolute bottom-1 right-2 rotate-180 flex flex-col items-center">
	<span class=" font-bold text-xl text-{class_props}"> {card_number} </span>
	<span class="w-3 aspect-square">
		<Component {class_props}></Component>
	</span>
</div>
