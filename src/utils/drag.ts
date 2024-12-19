import { dragAndDropState, mousePositon } from '../store.svelte'

export default function drag(e: DragEvent) {
    const element = e.target as HTMLDivElement
    const parent = element.offsetParent as HTMLDivElement
    const indices = parent.querySelectorAll("div[data-index]")

    const dragoverZone = document.querySelectorAll(".dragover_zone")
    dragoverZone.forEach((zone) => {
        zone.classList.add("show")
    })

    element.classList.add("dragging")
    let centerX = e.clientX - mousePositon.x!
    let centerY = e.clientY - mousePositon.y!
    console.log(centerX, centerY);
    element.style.transform = `translateX(${centerX.toString()}px) translateY(${centerY.toString()}px)`
    // element.style['--moz-transform'] = `translateX(${centerX.toString()}px) translateY(${centerY.toString()}px)`

    for (let index = 0; index < indices.length; index++) {
        const element = indices[index] as HTMLDivElement
        if (index > dragAndDropState.activeCardIndex!) {
            element.classList.add("dragging")
            let centerX = e.clientX - mousePositon.x!
            let centerY = e.clientY - mousePositon.y!
            element.style.transform = `translateX(${centerX.toString()}px) translateY(${centerY.toString()}px)`
            // element.style['--moz-transform'] = `translateX(${centerX.toString()}px) translateY(${centerY.toString()}px)`
        }
    }
}