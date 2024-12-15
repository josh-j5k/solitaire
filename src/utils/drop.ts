import { dropCardToFoundationPileRules, dropCardToTableauRules, dropIfDraggedFromTableau, dropIfFoundationToTableau, dropIfTableauToTableau, dropIfWastePileToTableau, dropIfDraggedFromWastePile } from '../hooks/useGameRules'
import audio from "../hooks/useAudio"
import type { TFoundation } from '../types/Cards'
import { dragAndDropState, validateScore, foundation, tableau } from '../store.svelte'
import { setScore, showWinnigScreen } from '../hooks/useScore'
import { alignElements, flipCard } from '../hooks/useMoves'
import resetZIndex from './resetZIndex'


const { dropSound, successAudio } = audio()


export default function drop(e: DragEvent) {
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
        dragAndDropState.activeCardParentIndex! as keyof TFoundation

    if (dragAndDropState.isDraggedFromWastePile) {
        if (dataTableau && dropCardToTableauRules(parent?.children.length!, lastChildElementColor, lastChildElementNumber)) {
            dropIfWastePileToTableau(parentIndex)
            dropSound.play()
            setScore(false)
            dropTimeout = setTimeout(() => {
                const elements = document.querySelectorAll(
                    'div[data-waste-pile="true"]'
                )
                elements.forEach((ele) => ele.classList.remove("hide-card"))
                alignElements(parent)
                clearTimeout(dropTimeout)
            }, 0)
        } else if (dataFoundation && dropCardToFoundationPileRules(parent?.children.length!, lastChildElementType, lastChildElementNumber)) {
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

            setTimeout(() => {
                parent.classList.remove("valid-move")
            }, 800)
            dropTimeout = setTimeout(() => {
                const elements = document.querySelectorAll(
                    'div[data-waste-pile="true"]'
                )
                elements.forEach((ele) => ele.classList.remove("hide-card"))
                clearTimeout(dropTimeout)
            }, 0)
        }
    } else if (
        dataTableau &&
        dragAndDropState.activeCardElement!.parentElement?.hasAttribute("data-foundation")
    ) {
        const key = dragKey()
        dropIfFoundationToTableau(key, parentIndex)

        dropSound.play()
        validateScore[key].currentLength -= 1
        setTimeout(() => {
            alignElements(parent)
        }, 0)
    } else if (dataTableau && dropCardToTableauRules(parent?.children.length!, lastChildElementColor, lastChildElementNumber)) {
        dropIfTableauToTableau(parentIndex)

        setScore(false)

        flipCard(dragAndDropState.activeCardParentIndex!)
        dropSound.play()
        dropTimeout = setTimeout(() => {
            alignElements(parent)
            clearTimeout(dropTimeout)
        }, 0)
    } else if (dataFoundation && dropCardToFoundationPileRules(parent?.children.length!, lastChildElementType, lastChildElementNumber)) {
        if (
            dragAndDropState.activeCardIndex !==
            tableau[dragAndDropState.activeCardParentIndex!].faceUp.length - 1
        ) {
            return
        }

        const key = setDropKey()
        dropIfDraggedFromTableau(key)

        parent.classList.add("valid-move")
        successAudio.play()
        validateScore[key].maxLength = foundation[key].length
        if (validateScore[key].currentLength < 0) {
            validateScore[key].currentLength++
        } else {
            setScore(true)

        }
        dropTimeout = setTimeout(() => {
            parent.classList.remove("valid-move")
            clearTimeout(dropTimeout)
        }, 800)
        flipCard(dragAndDropState.activeCardParentIndex!)
    } else if (
        dataFoundation &&
        parent.hasAttribute("data-foundation") &&
        dragAndDropState.activeCardElement!.parentElement?.hasAttribute("data-foundation")
    ) {
        const key = setDropKey()
        const activeKey = dragKey()
        let currentCard = foundation[activeKey].pop()!
        foundation[key] = [...foundation[key], currentCard]
        parent.classList.add("valid-move")
        successAudio.play()
        dropTimeout = setTimeout(() => {
            parent.classList.remove("valid-move")
            clearTimeout(dropTimeout)
        }, 800)
    }

    showWinnigScreen()
    resetZIndex()
}