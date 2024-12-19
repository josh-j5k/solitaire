<script lang="ts">
	import type { component } from "../../types/Cards"
	import Component from "../Component.svelte"

	let {
		class_props,
		component,
		card_number,
	}: { class_props: string; component: component; card_number: string } =
		$props()
</script>

<div class="absolute top-1 left-2 flex flex-col items-center">
	<span class="font-bold text-xl text-{class_props}">
		{card_number}
	</span>
	<span class="w-3 aspect-square">
		<Component {component} {class_props} />
	</span>
</div>
