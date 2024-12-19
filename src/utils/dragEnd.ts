import resetZIndex from "./resetZIndex"
import audio from "../hooks/useAudio"
import { dragAndDropState, mousePositon } from '../store.svelte'

const { dragEndSound } = audio()

export default function dragEnd(e: MouseEvent) {
    dragEndSound.load()
    const element = e.target as HTMLDivElement
    element.style.transform = "translate(0)"
    element.classList.remove("dragging")
    let topSliced = '0'
    dragEndSound.play()
    if (dragAndDropState.top) {
        topSliced = dragAndDropState.top.slice(0, -2)
    }
    const topNumber = parseInt(topSliced)
    // const currentIndex = element.getAttribute("data-index")!

    let parent = element.parentElement as HTMLDivElement

    element.classList.remove("dragging")
    element.style.left = dragAndDropState.left!
    element.style.top = dragAndDropState.top!
    element.style.transform = "translate(0)"

    let newOffsetTop = topNumber

    if (parent) {

        const indices = parent.querySelectorAll("div[data-index]")

        for (let index = 0; index < indices.length; index++) {
            if (index > dragAndDropState.activeCardIndex!) {
                newOffsetTop += dragAndDropState.offsetTop
                const element = indices[index] as HTMLDivElement
                element.style.transform = "translate(0)"
                element.style.top = newOffsetTop.toString() + "px"
                element.classList.remove("dragging")
            }
        }
    }
    if (dragAndDropState.isDraggedFromWastePile) {
        element.classList.add("stack_face_up")
    }
    document.onmousemove = null
    resetZIndex()
}