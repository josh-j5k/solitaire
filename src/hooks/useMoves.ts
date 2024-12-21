import { tableau, stockPile, nonReactiveState, wastePile, store } from '../store.svelte'
import type { card } from '../types/Cards'
import { reDeal, dealCard, multiple } from '../utils/audio'




function setCardFaceDown(number: number) {
    for (let index = 0; index < number; index++) {
        let randomNumber = Math.floor(Math.random() * nonReactiveState.totalCards)
        tableau[number].faceDown.push(stockPile[randomNumber])
        stockPile.splice(randomNumber, 1)
        nonReactiveState.totalCards -= 1
    }
}
function shuffleArray(array: card[]) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[array[i], array[j]] = [array[j], array[i]]; } return array; }
export function shuffleAndArrangeCards() {
    stockPile.sort(() => (Math.random() > 0.5 ? 1 : -1))
    for (let index = 0; index < 7; index++) {
        let randomNumber = Math.floor(Math.random() * nonReactiveState.totalCards)
        tableau[index].faceUp.push(stockPile[randomNumber])
        stockPile.splice(randomNumber, 1)
        nonReactiveState.totalCards -= 1
    }
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
            element.classList.add("flip-card")
        }, 100)
        setTimeout(() => {
            const parent = containingBlock[index] as HTMLDivElement
            const element = parent.children[parent.children.length - 1]
            element.classList.remove("flip-card")
        }, 1000)
    }
}
let int = <undefined | number>undefined
export function revealAndRedealStockpile() {

    dealCard.load()
    let number = <undefined | number>undefined
    if (int) {
        clearInterval(int)
    }
    if (stockPile.length === 0) {

        stockPile.push(...wastePile.reverse())
        wastePile.length = 0
        reDeal.play()
        return
    }

    const element = stockPile.pop()!
    wastePile.push(element)
    if (store.difficulty === 'easy') {
        dealCard.play()

        return
    }
    multiple.play()
    if (store.difficulty === 'normal') {
        number = 1
    } else if (store.difficulty === 'hard') {
        number = 2
    }

    int = setInterval(() => {
        if (stockPile.length > 0) {
            number!--
            const element = stockPile.pop()!
            wastePile.push(element)
            if (number == 0) {
                clearInterval(int)
            }


        } else {
            clearInterval(int)
        }
    }, 100);

}

// export function alignElements(element: HTMLDivElement) {
//     const length = element.children.length
//     const adjLength = length - 1
//     const newHeight = adjLength * store.offsetTop + store.height

//     element.style.height = newHeight.toString() + "px"
//     for (let index = 1; index < length; index++) {
//         const top = (index - 1) * store.offsetTop
//         const ele = element.children[index] as HTMLDivElement
//         ele.style.top = top.toString() + "px"
//         ele.style.position = "absolute"
//     }
// }