
export function dragAndDrop(offsetTop: number) {
    let eleWidth = 0
    let eleHeight = 0
    function dragStart(e: DragEvent) {
        const element = e.target as HTMLDivElement
        element.id = "dragging"
        element.style.top = "0"
        if (element.classList.contains("dragged"))
            element.classList.remove("dragged")
        if (element.classList.contains("stack_face_up"))
            element.classList.remove("stack_face_up")
        const img = document.createElement("img")
        eleHeight = element.clientHeight / 2
        eleWidth = element.clientWidth / 2
        img.src =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAABtCAYAAABdsWrOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAjSURBVGhD7cExAQAAAMKg9U9tCy8gAAAAAAAAAAAAAAAAnmox0QABeT4g9gAAAABJRU5ErkJggg=="

        e.dataTransfer?.setData("text/plain", element.id)
        e.dataTransfer?.setDragImage(img, 0, 0)
    }
    function dragOver(e: DragEvent) {
        e.preventDefault()
        const element = e.target as HTMLElement

        if (e.dataTransfer != null) {
            e.dataTransfer.dropEffect = "move"
        }
    }

    function drag(e: DragEvent) {
        const dragoverZone = document.querySelectorAll(".dragover_zone")
        dragoverZone.forEach((zone) => {
            zone.classList.add("show")
        })
        const element = e.target as HTMLDivElement
        element.classList.add("dragging")
        const parent = element.offsetParent as HTMLDivElement
        let centerX = e.clientX - parent.offsetLeft - eleWidth
        let centerY = e.clientY - parent.offsetTop - eleHeight + offsetTop
        element.style.transform = `translateX(${centerX.toString()}px) translateY(${centerY.toString()}px)`
    }
    function dragEnd(e: DragEvent) {
        const dragoverZone = document.querySelectorAll(".dragover_zone")
        const element = e.target as HTMLDivElement
        element.style.transform = "translate(0)"
        element.classList.remove("dragging")
        dragoverZone.forEach((zone) => {
            zone.classList.remove("show")
        })
    }
    function drop(e: DragEvent) {
        e.preventDefault()
        const element = e.target as HTMLElement
        const parent = element.parentElement
        const id = e.dataTransfer?.getData("text/plain")!
        const data = document.getElementById(id)!
        parent?.appendChild(data)
        const index = parent?.children.length! - 2
        const top = index * offsetTop
        data.classList.add("dragged")
        data.style.top = top.toString() + "px"
        data.id = ""
    }
    return { drag, dragEnd, dragOver, dragStart, drop }
}