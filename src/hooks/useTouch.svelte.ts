import { store, foundation, tableau, validateScore } from "../store.svelte";
import type { TFoundation } from "../types/Cards";
import { dropSound, dragStartSound, dragEndSound, successAudio } from "../utils/audio";
import resetZIndex from "../utils/resetZIndex";
import { dropCardToFoundationPileRules, dropCardToTableauRules, dropIfDraggedFromTableau, dropIfDraggedFromWastePile, dropIfFoundationToTableau, dropIfTableauToTableau, dropIfWastePileToTableau } from "./useGameRules";
import { flipCard } from "./useMoves";
import { setScore, showWinnigScreen } from "./useScore";


export function useTouch() {
    let top = $state<string>()
    let activeCardIndex = $state<number>()
    let isDraggedFromWastePile = $state<boolean>()
    let activeCardParentIndex = $state<number>()
    let activeCardType = $state<string>()
    let activeCardNumber = $state<number>()
    let activeCardColor = $state<string>()
    let activeCardElement = $state<HTMLDivElement>()
    let dataTableau = false

    function touch(e: MouseEvent) {

        if (!store.isMobile) {
            return
        }


        const dragoverZone = document.querySelectorAll(".dragover_zone")
        const element = e.currentTarget as HTMLDivElement
        const nodeList = element.parentElement!.querySelectorAll("div[data-index]")
        if (document.documentElement.dataset.dataDragging === "true") {
            validateMove(element)
            document.documentElement.dataset.dataDragging = "false"
            dragoverZone.forEach((zone) => {
                if (zone.classList.contains('show')) {
                    zone.classList.remove("show")
                }
            })
            for (let index = 0; index < nodeList!.length; index++) {
                const element = nodeList![index] as HTMLDivElement
                if (index >= activeCardIndex!) {
                    if (element.classList.contains("dragging")) {
                        element.classList.remove("dragging")
                    }
                    if (dataTableau) {
                        element.style.top = store.offsetTop.toString() + 'px'
                        element.style.transform = 'translateY(0)'
                    }

                }
            }
            return
        }
        setElement(element)

        dragoverZone.forEach((zone) => {
            zone.classList.add("show")
        })
        for (let index = 0; index < nodeList!.length; index++) {
            const element = nodeList![index] as HTMLDivElement
            if (index >= activeCardIndex!) {
                element.classList.add("dragging")
                if (dataTableau) {
                    element.style.top = '30px'
                    element.style.transform = 'translateY(-100px)'
                }

            }
        }
    }

    function validateMove(element: HTMLDivElement) {
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

                setTimeout(() => {
                    parent.classList.remove("valid-move")
                }, 800)

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
            dropTimeout = setTimeout(() => {
                parent.classList.remove("valid-move")
                clearTimeout(dropTimeout)
            }, 800)
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
            dropTimeout = setTimeout(() => {
                parent.classList.remove("valid-move")
                clearTimeout(dropTimeout)
            }, 800)
        }

        showWinnigScreen()
        resetZIndex()
    }

    function setElement(element: HTMLDivElement) {
        const parent = <HTMLDivElement>element.parentElement
        const dataWastePile = element.getAttribute("data-waste-pile")
        const dataFoundation = parent?.getAttribute("data-foundation")
        const dataTableauAtr = parent?.getAttribute("data-tableau")
        top = element.style.top
        activeCardIndex = parseInt(element.getAttribute("data-index")!)
        if (dataWastePile) {
            isDraggedFromWastePile = true
            activeCardParentIndex = -1
        } else {
            isDraggedFromWastePile = false
            if (dataFoundation) {
                activeCardParentIndex = parseInt(dataFoundation)
            } else {
                activeCardParentIndex = parseInt(dataTableauAtr!)
                dataTableau = true

            }

        }
        activeCardType = element.getAttribute("data-card-type")!
        activeCardNumber = parseInt(element.getAttribute("data-card-rank")!)
        activeCardColor = element.getAttribute("data-card-color")!
        activeCardElement = element
    }
    return { touch }
}