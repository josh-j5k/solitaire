import { dragAndDropState } from "../store.svelte"

export function useDimensionDesign() {
    let dimensions = `w-full h-[170px]`
    let design = "bg-white relative rounded-lg cursor-default"

    return { dimensions, design }
}