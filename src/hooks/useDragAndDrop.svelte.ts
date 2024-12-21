import { store, validateScore, tableau, foundation } from "../store.svelte"
import type { TFoundation } from "../types/Cards"
import resetZIndex from "../utils/resetZIndex"
import { dragEndSound, dragStartSound, dropSound, successAudio } from '../utils/audio'
import { dropCardToFoundationPileRules, dropCardToTableauRules, dropIfDraggedFromTableau, dropIfFoundationToTableau, dropIfTableauToTableau, dropIfWastePileToTableau, dropIfDraggedFromWastePile } from './useGameRules'
import { setScore, showWinnigScreen } from './useScore'
import { flipCard } from './useMoves'


export function useDragAndDrop() {
    let left = $state<string>()
    let top = $state<string>()
    let clientX = $state<number>()
    let clientY = $state<number>()
    let activeCardIndex = $state<number>()
    let isDraggedFromWastePile = $state<boolean>()
    let activeCardParentIndex = $state<number>()
    let activeCardType = $state<string>()
    let activeCardNumber = $state<number>()
    let activeCardColor = $state<string>()
    let activeCardElement = $state<HTMLDivElement>()
    let indices = $state<NodeListOf<Element>>()


    function ondragstart(e: DragEvent) {
        dragStartSound.load()
        const element = e.target as HTMLDivElement
        const parent = <HTMLDivElement>element.parentElement
        const dataWastePile = element.getAttribute("data-waste-pile")
        const dataFoundation = parent?.getAttribute("data-foundation")
        const dataTableau = parent?.getAttribute("data-tableau")
        indices = parent.querySelectorAll("div[data-index]")
        dragStartSound.play()
        top = element.style.top
        left = element.style.left
        activeCardIndex = parseInt(element.getAttribute("data-index")!)
        clientX = e.x
        clientY = e.y

        if (dataWastePile) {
            isDraggedFromWastePile = true
            activeCardParentIndex = -1
        } else {
            isDraggedFromWastePile = false
            dataFoundation
                ? (activeCardParentIndex = parseInt(dataFoundation))
                : (activeCardParentIndex = parseInt(dataTableau!))
        }
        const img = document.createElement("img")
        img.src =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAABtCAYAAABdsWrOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAjSURBVGhD7cExAQAAAMKg9U9tCy8gAAAAAAAAAAAAAAAAnmox0QABeT4g9gAAAABJRU5ErkJggg=="
        activeCardType = element.getAttribute("data-card-type")!
        activeCardNumber = parseInt(element.getAttribute("data-card-rank")!)
        activeCardColor = element.getAttribute("data-card-color")!
        activeCardElement = element
        e.dataTransfer?.setDragImage(img, 0, 0)
    }


    function ondrag(e: DragEvent) {
        const dragoverZone = document.querySelectorAll(".dragover_zone")
        dragoverZone.forEach((zone) => {
            zone.classList.add("show")
        })

        activeCardElement!.classList.add("dragging")
        let centerX = e.clientX - clientX!
        let centerY = e.clientY - clientY!
        activeCardElement!.style.transform = `translateX(${centerX.toString()}px) translateY(${centerY.toString()}px)`


        for (let index = 0; index < indices!.length; index++) {
            const element = indices![index] as HTMLDivElement
            if (index > activeCardIndex!) {
                element.classList.add("dragging")
                let centerX = e.clientX - clientX!
                let centerY = e.clientY - clientY!
                element.style.transform = `translateX(${centerX.toString()}px) translateY(${centerY.toString()}px)`
            }
        }
    }

    function ondragend(e: DragEvent) {
        dragEndSound.load()
        if (activeCardElement) {
            activeCardElement.style.transform = "translate(0)"
            activeCardElement.classList.remove("dragging")
            activeCardElement.style.top = top!
            activeCardElement.style.left = left!
            let topSliced = 0
            dragEndSound.play()
            topSliced = parseInt(top!.slice(0, -2))
            for (let index = 0; index < indices!.length; index++) {
                if (index > activeCardIndex!) {
                    topSliced += store.offsetTop
                    const element = indices![index] as HTMLDivElement
                    element.style.transform = "translate(0)"
                    element.style.top = topSliced.toString() + "px"
                    element.style.left = left!
                    element.classList.remove("dragging")
                }
            }

            resetZIndex()
        }
    }

    // Drop
    function ondrop(e: DragEvent) {
        e.preventDefault()

        const element = e.target as HTMLElement

        const parent = element.parentElement as HTMLDivElement
        const lastChildElementIndex = parent?.children.length! - 1
        const lastChildElement = parent?.children[lastChildElementIndex]
        const lastChildElementType =
            lastChildElement?.getAttribute("data-card-type")!
        const lastChildElementNumber = parseInt(
            lastChildElement?.getAttribute("data-card-rank")!
        )
        const lastChildElementColor =
            lastChildElement?.getAttribute("data-card-color")!
        const dataFoundation = parent?.getAttribute("data-foundation")
        const dataTableau = parent?.getAttribute("data-tableau")
        let parentIndex: number
        let dropTimeout: number


        if (parent.getAttribute("data-tableau")) {
            parentIndex = parseInt(dataTableau!)
        } else {
            parentIndex = parseInt(dataFoundation!)
        }

        const setDropKey = (): keyof TFoundation => parentIndex as keyof TFoundation
        const dragKey = (): keyof TFoundation =>
            activeCardParentIndex! as keyof TFoundation

        if (isDraggedFromWastePile) {
            if (dataTableau && dropCardToTableauRules(parent?.children.length!, lastChildElementColor, lastChildElementNumber, activeCardNumber!, activeCardColor!)) {
                dropIfWastePileToTableau(parentIndex)
                dropSound.play()
                setScore(false)

            } else if (dataFoundation && dropCardToFoundationPileRules(parent?.children.length!, lastChildElementType, lastChildElementNumber, activeCardNumber!, activeCardType!)) {
                const key = setDropKey()
                dropIfDraggedFromWastePile(key)
                parent.classList.add("valid-move")

                successAudio.play()
                validateScore[key].maxLength = foundation[key].length
                if (validateScore[key].currentLength < 0) {
                    validateScore[key].currentLength++
                } else {
                    setScore(true)
                }

                // setTimeout(() => {
                //     parent.classList.remove("valid-move")
                // }, 800)

            }
        } else if (
            dataTableau &&
            activeCardElement!.parentElement?.hasAttribute("data-foundation")
        ) {
            const key = dragKey()
            dropIfFoundationToTableau(key, parentIndex)

            dropSound.play()
            validateScore[key].currentLength -= 1

        } else if (dataTableau && dropCardToTableauRules(parent?.children.length!, lastChildElementColor, lastChildElementNumber, activeCardNumber!, activeCardColor!)) {
            dropIfTableauToTableau(parentIndex, activeCardParentIndex!, activeCardIndex!)

            setScore(false)

            flipCard(activeCardParentIndex!)
            dropSound.play()

        } else if (dataFoundation && dropCardToFoundationPileRules(parent?.children.length!, lastChildElementType, lastChildElementNumber, activeCardNumber!, activeCardType!)) {
            if (
                activeCardIndex !==
                tableau[activeCardParentIndex!].faceUp.length - 1
            ) {
                return
            }

            const key = setDropKey()
            dropIfDraggedFromTableau(key, activeCardParentIndex!)

            parent.classList.add("valid-move")
            successAudio.play()
            validateScore[key].maxLength = foundation[key].length
            if (validateScore[key].currentLength < 0) {
                validateScore[key].currentLength++
            } else {
                setScore(true)

            }
            // dropTimeout = setTimeout(() => {
            //     parent.classList.remove("valid-move")
            //     clearTimeout(dropTimeout)
            // }, 800)
            flipCard(activeCardParentIndex!)
        } else if (
            dataFoundation &&
            parent.hasAttribute("data-foundation") &&
            activeCardElement!.parentElement?.hasAttribute("data-foundation")
        ) {
            const key = setDropKey()
            const activeKey = dragKey()
            let currentCard = foundation[activeKey].pop()!
            foundation[key] = [...foundation[key], currentCard]
            parent.classList.add("valid-move")
            successAudio.play()
            // dropTimeout = setTimeout(() => {
            //     parent.classList.remove("valid-move")
            //     clearTimeout(dropTimeout)
            // }, 800)
        }

        showWinnigScreen()
        resetZIndex()
    }

    return {
        ondrag,
        ondragend,
        ondragstart,
        ondrop
    }
}