import { tableau, stockPile, nonReactiveState, dragAndDropState, wastePile } from '../store.svelte'
import audio from './useAudio'

const { reDeal, dealCard } = audio()

function setCardFaceDown(number: number) {
    for (let index = 0; index < number; index++) {
        let randomNumber = Math.floor(Math.random() * nonReactiveState.totalCards)
        tableau[number].faceDown.push(stockPile[randomNumber])
        stockPile.splice(randomNumber, 1)
        nonReactiveState.totalCards -= 1
    }
}
export function shuffleAndArrangeCards() {
    for (let index = 0; index < 7; index++) {
        let randomNumber = Math.floor(Math.random() * nonReactiveState.totalCards)
        tableau[index].faceUp.push(stockPile[randomNumber])
        stockPile.splice(randomNumber, 1)
        nonReactiveState.totalCards -= 1
    }
    stockPile.sort(() => (Math.random() > 0.5 ? 1 : -1))
    for (let index = 1; index < 7; index++) {
        setCardFaceDown(index)
    }
}

export function flipCard(index: number) {
    if (
        tableau[index].faceUp.length === 0 &&
        tableau[index].faceDown.length > 0
    ) {
        const containingBlock = document.querySelectorAll(".containing_block")
        setTimeout(() => {
            let card = tableau[index].faceDown.pop()!

            tableau[index].faceUp.push(card)
            tableau[index] = tableau[index]
        }, 100)
        setTimeout(() => {
            const parent = containingBlock[index] as HTMLDivElement
            const element = parent.children[parent.children.length - 1]
            alignElements(parent)
            element.classList.add("flip-card")
        }, 100)
        setTimeout(() => {
            const parent = containingBlock[index] as HTMLDivElement
            const element = parent.children[parent.children.length - 1]
            element.classList.remove("flip-card")
        }, 1000)
    }
}
export function revealAndRedealStockpile() {
    if (stockPile.length === 0) {
        stockPile.length = 0
        stockPile.push(...wastePile.reverse())
        wastePile.length = 0
        reDeal.play()
    } else {
        const element = stockPile.pop()!
        wastePile.push(element)

        dealCard.play()
        setTimeout(() => {
            const currentWastePile = document.querySelectorAll(
                'div[data-waste-pile="true"]'
            )
            const wastePileCardPosition = currentWastePile.length - 1
            const wastePileCard = currentWastePile[wastePileCardPosition]
            wastePileCard.classList.add("reveal-card")
        }, 0)

        setTimeout(() => {
            const currentWastePile = document.querySelectorAll(
                'div[data-waste-pile="true"]'
            )
            const wastePileCardPosition = currentWastePile.length - 1
            const wastePileCard = currentWastePile[wastePileCardPosition]
            wastePileCard.classList.remove("reveal-card")
            wastePileCard.classList.remove("hide-card")
        }, 800)
    }
}

export function alignElements(element: HTMLDivElement) {
    const length = element.children.length
    const adjLength = length - 1
    const newHeight = adjLength * dragAndDropState.offsetTop + dragAndDropState.height

    element.style.height = newHeight.toString() + "px"
    for (let index = 1; index < length; index++) {
        const top = (index - 1) * dragAndDropState.offsetTop
        const ele = element.children[index] as HTMLDivElement
        ele.style.top = top.toString() + "px"
        ele.style.position = "absolute"
    }
}