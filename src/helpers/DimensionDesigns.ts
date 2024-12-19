import { dragAndDropState } from "../store.svelte"

export function useDimensionDesign() {
    let dimensions = `w-[80%] h-[140px] -lg:h-[100px]`
    let design = "bg-white relative rounded-lg cursor-default"

    return { dimensions, design }
}