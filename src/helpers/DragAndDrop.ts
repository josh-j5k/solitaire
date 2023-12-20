import type { deck } from "../types/Cards"
import { useMain } from "./Main"
export function dragAndDrop(offsetTop: number,) {
    let { decks, dataStackFaceUp, Rows } = useMain()
    let eleWidth = 0
    let eleHeight = 0
    let activeCard: string
    let activeCardNumber: number
    let activeCardColor: string
    let activeCardParentIndex: number
    let activeCardIndex: number
    let dataStackFace = false
    let validMove = false
    let top: string
    function setDeckKey(parentIndex: number): keyof deck {
        if (parentIndex - 7 === 1) {
            return 'dataDeckOne'
        } else if (parentIndex - 7 === 2) {
            return "dataDeckTwo"
        } else if (parentIndex - 7 === 3) {
            return "dataDeckThree"
        }
        return "dataDeckFour"

    }

    function dragStart(e: DragEvent) {
        const element = e.target as HTMLDivElement
        const parent = element.parentElement?.getAttribute('data-game')
        if (parent) {
            activeCardParentIndex = parseInt(parent)
        } else {
            dataStackFace = true
        }
        activeCardIndex = parseInt(element.getAttribute('data-index')!)
        element.id = "dragging"
        top = element.style.top
        element.style.top = "0"
        if (element.classList.contains("dragged"))
            element.classList.remove("dragged")
        if (element.classList.contains("stack_face_up"))
            element.classList.remove("stack_face_up")
        const img = document.createElement("img")
        eleHeight = element.clientHeight / 2
        eleWidth = element.clientWidth / 2
        img.src =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAABtCAYAAABdsWrOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAjSURBVGhD7cExAQAAAMKg9U9tCy8gAAAAAAAAAAAAAAAAnmox0QABeT4g9gAAAABJRU5ErkJggg==";
        activeCard = element.getAttribute('data-type')!
        activeCardNumber = parseInt(element.getAttribute('data-card')!)
        activeCardColor = element.getAttribute('data-color')!
        // e.dataTransfer?.setData("text/plain", element.id)
        e.dataTransfer?.setDragImage(img, 0, 0)


    }
    function dragOver(e: DragEvent) {
        e.preventDefault()
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
        element.style.top = top
    }
    function drop(e: DragEvent) {
        e.preventDefault()
        const element = e.target as HTMLElement
        const parent = element.parentElement

        const lastChildElementIndex = parent?.children.length! - 1
        const lastChildElement = parent?.children[lastChildElementIndex]
        // const lastChildElementType = lastChildElement?.getAttribute('data-type')
        const lastChildElementNumber = parseInt(lastChildElement?.getAttribute('data-card')!)
        const parentIndex = parseInt(parent?.getAttribute('data-game')!)
        const lastChildElementColor = lastChildElement?.getAttribute('data-color')!
        const lastChildIndex = lastChildElement?.getAttribute('data-index')!
        const isTrue = (x: number, y: number) => x + 1 === y
        function setCard() {
            const key = setDeckKey(parentIndex)
            let currentCard = dataStackFaceUp.removeCard()
            decks.updateDeck(key, currentCard)
            dataStackFaceUp.update()
        }

        if (parentIndex === activeCardIndex) {
            return
        }
        let currentCard = Rows.getValue(activeCardParentIndex, activeCardIndex)
        Rows.removeOldArr(activeCardParentIndex, activeCardIndex)
        // Rows.updateStackingRow(parentIndex, currentCard)

        // if (dataStackFace) {
        //     if (parentIndex < 7) {
        //         if (lastChildElementColor !== activeCardColor && isTrue(activeCardNumber, lastChildElementNumber)) {
        //             let currentCard = dataStackFaceUp.removeCard()
        //             Rows.updateStackingRow(parentIndex, currentCard)
        //             dataStackFaceUp.update()
        //         } else {

        //             if (parent?.children.length! < 2 && activeCardNumber === 1) {
        //                 setCard()
        //             } else if (lastChildElementColor === activeCardColor && lastChildElementNumber + 1 === activeCardNumber) {
        //                 setCard()
        //             }

        //         }
        //     }

        // } else {
        //     if (parentIndex < 7) {
        //         if (lastChildElementColor !== activeCardColor && isTrue(activeCardNumber, lastChildElementNumber)) {
        //             let currentCard = Rows.getValue(activeCardParentIndex, activeCardIndex)
        //             Rows.updateStackingRow(parentIndex, currentCard)
        //         }

        //     } else {

        //         if (parent?.children.length! < 2 && activeCardNumber === 1) {
        //             setCard()
        //         } else if (lastChildElementColor === activeCardColor && lastChildElementNumber + 1 === activeCardNumber) {
        //             setCard()
        //         }
        //         return

        //     }
        // }


        // const id = e.dataTransfer?.getData("text/plain")!
        // const data = document.getElementById(id)!
        // parent?.appendChild(data)
        // const index = parent?.children.length! - 2
        // const top = index * offsetTop
        // data.classList.add("dragged")
        // data.style.top = top.toString() + "px"
        // data.id = ""
    }
    return { drag, dragEnd, dragOver, dragStart, drop }
}