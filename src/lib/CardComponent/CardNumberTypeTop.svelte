<script lang="ts">
	import type { component } from "../../types/Cards"
	let {
		Component,
		class_props,
		card_number,
	}: { Component: component; class_props: string; card_number: string } =
		$props()
</script>

<div class="absolute top-1 left-2 flex flex-col items-center">
	<span class="font-bold text-xl text-{class_props}">
		{card_number}
	</span>
	<span class="w-3 aspect-square">
		<Component {class_props} />
	</span>
</div>
