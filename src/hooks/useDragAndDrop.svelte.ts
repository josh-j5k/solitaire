import { store, validateScore, tableau, foundation } from "../store.svelte"
import type { TFoundation } from "../types/Cards"
import resetZIndex from "../utils/resetZIndex"
import { dragEndSound, dragStartSound, dropSound, successAudio } from '../utils/audio'
import { dropCardToFoundationPileRules, dropCardToTableauRules, dropIfDraggedFromTableau, dropIfFoundationToTableau, dropIfTableauToTableau, dropIfWastePileToTableau, dropIfDraggedFromWastePile } from './useGameRules'
import { setScore, showWinnigScreen } from './useScore'
import { flipCard } from './useMoves'


export function useDragAndDrop() {

    let clientX = <number | undefined>undefined
    let clientY = <number | undefined>undefined
    let activeCardIndex = <number | undefined>undefined
    let isDraggedFromWastePile = false
    let activeCardParentIndex = <number | undefined>undefined
    let activeCardType = <string | undefined>undefined
    let activeCardNumber = <number | undefined>undefined
    let activeCardColor = <string | undefined>undefined
    let activeCardElement = <HTMLDivElement | undefined>undefined
    let indices = <NodeListOf<Element> | undefined>undefined
    let drop = false

    function ondragstart(e: DragEvent) {
        dragStartSound.load()
        const element = e.target as HTMLDivElement
        const parent = <HTMLDivElement>element.parentElement
        const dataWastePile = element.getAttribute("data-waste-pile")
        const dataFoundation = parent?.getAttribute("data-foundation")
        const dataTableau = parent?.getAttribute("data-tableau")
        indices = parent.querySelectorAll("div[data-index]")
        dragStartSound.play()
        if (element.getAttribute("data-index")) {
            activeCardIndex = parseInt(element.getAttribute("data-index")!)
        }
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
        const dragoverZone = document.querySelectorAll(".dragover_zone")

        setTimeout(() => {
            dragoverZone.forEach((zone) => {
                zone.classList.add("show")
            })
        }, 5);
    }


    function ondrag(e: DragEvent) {


        let centerX = e.clientX - clientX!
        let centerY = e.clientY - clientY!


        if (activeCardIndex !== undefined) {
            for (let index = 0; index < indices!.length; index++) {
                const element = indices![index] as HTMLDivElement
                if (index >= activeCardIndex!) {
                    element.classList.add("dragging")
                    let centerX = e.clientX - clientX!
                    let centerY = e.clientY - clientY!
                    element.style.transform = `translateX(${centerX.toString()}px) translateY(${centerY.toString()}px)`
                }
            }
        } else {
            activeCardElement!.classList.add("dragging")
            activeCardElement!.style.transform = `translateX(${centerX.toString()}px) translateY(${centerY.toString()}px)`
        }
    }

    function ondragend(e: DragEvent) {
        e.preventDefault()
        if (
            drop === false
        ) {


            if (activeCardIndex !== undefined) {
                for (let index = 0; index < indices!.length; index++) {
                    if (index >= activeCardIndex!) {

                        const element = indices![index] as HTMLDivElement
                        element.style.transform = "translate(0)"

                        element.classList.remove("dragging")
                    }
                }

            } {
                activeCardElement!.style.transform = "translate(0)"
                activeCardElement!.classList.remove("dragging")

            }
        } {
            dragEndSound.load()

            dragEndSound.play()
            drop = false
        }
        resetZIndex()
        activeCardIndex = undefined
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
                drop = true

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

                showWinnigScreen()
                drop = true
            }
        } else if (
            dataTableau &&
            activeCardElement!.parentElement?.hasAttribute("data-foundation") && dropCardToTableauRules(parent?.children.length!, lastChildElementColor, lastChildElementNumber, activeCardNumber!, activeCardColor!)
        ) {
            const key = dragKey()
            dropIfFoundationToTableau(key, parentIndex)
            dropSound.play()
            validateScore[key].currentLength -= 1
            drop = true
        } else if (dataTableau && dropCardToTableauRules(parent?.children.length!, lastChildElementColor, lastChildElementNumber, activeCardNumber!, activeCardColor!)) {
            dropIfTableauToTableau(parentIndex, activeCardParentIndex!, activeCardIndex!)

            setScore(false)

            flipCard(activeCardParentIndex!)
            dropSound.play()
            drop = true
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
            showWinnigScreen()
            flipCard(activeCardParentIndex!)
            drop = true
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
            drop = true
        }
        // activeCardIndex = undefined

        // resetZIndex()
    }

    return {
        ondrag,
        ondragend,
        ondragstart,
        ondrop
    }
}