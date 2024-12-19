import audio from "../hooks/useAudio"
import { dragAndDropState, mousePositon } from '../store.svelte'

const { dragStartSound } = audio()

export default function dragStart(e: DragEvent) {
    dragStartSound.load()
    const element = e.target as HTMLDivElement
    const parent = <HTMLDivElement>element.parentElement
    const dataWastePile = element.getAttribute("data-waste-pile")
    const dataFoundation = parent?.getAttribute("data-foundation")
    const dataTableau = parent?.getAttribute("data-tableau")
    dragStartSound.play()
    console.log(element);

    dragAndDropState.top = element.style.top
    dragAndDropState.left = element.style.left
    dragAndDropState.activeCardIndex = parseInt(element.getAttribute("data-index")!)
    mousePositon.x = e.x
    mousePositon.y = e.y
    if (element.classList.contains("dragged"))
        element.classList.remove("dragged")
    if (element.classList.contains("stack_face_up"))
        element.classList.remove("stack_face_up")

    if (dataWastePile) {
        dragAndDropState.isDraggedFromWastePile = true
        dragAndDropState.activeCardParentIndex = -1
    } else {
        dragAndDropState.isDraggedFromWastePile = false
        dataFoundation
            ? (dragAndDropState.activeCardParentIndex = parseInt(dataFoundation))
            : (dragAndDropState.activeCardParentIndex = parseInt(dataTableau!))
    }
    const img = document.createElement("img")
    img.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAABtCAYAAABdsWrOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAjSURBVGhD7cExAQAAAMKg9U9tCy8gAAAAAAAAAAAAAAAAnmox0QABeT4g9gAAAABJRU5ErkJggg=="
    dragAndDropState.activeCard = element.getAttribute("data-card-type")!
    dragAndDropState.activeCardNumber = parseInt(element.getAttribute("data-card-rank")!)
    dragAndDropState.activeCardColor = element.getAttribute("data-card-color")!
    dragAndDropState.activeCardElement = element
    e.dataTransfer?.setDragImage(img, 0, 0)
}