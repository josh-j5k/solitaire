import { stockPile, wastePile, tableau, foundation, time, nonReactiveState, state } from '../store.svelte'
import Spade from "../lib/icons/Spade.svelte"
import Club from "../lib/icons/Club.svelte"
import Diamond from "../lib/icons/Diamond.svelte"
import Heart from "../lib/icons/Heart.svelte"
import audio from './useAudio'
import type { cardComponent, card } from '../types/Cards'
import { shuffleAndArrangeCards, alignElements } from './useMoves'
import { streaking } from './useScore'


const { shuffleSound, clickSound } = audio()
const arr = ["King", "Ace", "Queen", "Nine", "Jack", "Ten", "Eight", "Seven", "Five", "Six", "Three", "Four", "Two",]

let components = [Spade, Diamond, Heart, Club] as cardComponent
const cardTypeWithComponent = arr.map((card) => {
    return {
        card,
        components: components.map((component) => component),
    }
})


function reset() {
    stockPile.length = 0
    wastePile.length = 0
    tableau.forEach((ele) => {
        ele.faceDown.length = 0
        ele.faceUp.length = 0
    })
    for (const [key, value] of Object.entries(foundation)) value.length = 0

    clearInterval(nonReactiveState.timeInterval)
    time.minutes = 0
    time.seconds = 0
    nonReactiveState.totalCards = 52
    state.score = 0
    state.menuToggled = false
}

function playStartAnimationAndAlignCards() {
    const containingBlock = document.querySelectorAll(".containing_block")
    shuffleSound.play()
    let index = 1
    let parentIndex = 1
    let startingParentIndex = 1
    containingBlock[0].children[1].classList.add("face-up-first-animation")
    let animationInterval = setInterval(() => {
        if (parentIndex > containingBlock.length - 1) {
            index++
            containingBlock[startingParentIndex].children[index].classList.add(
                "face-up-animation"
            )
            startingParentIndex++
            parentIndex = startingParentIndex
        } else {
            containingBlock[parentIndex].children[index].classList.add(
                "face-down-animation"
            )
            parentIndex++
        }
        if (index > 6) {
            state.gameLoadingAnimation = false
            containingBlock[0].children[1].classList.remove(
                "face-up-first-animation"
            )
            containingBlock.forEach((ele) => {
                for (let index = 0; index < ele.children.length; index++) {
                    const element = ele.children[index]
                    if (element.classList.contains("face-down-animation")) {
                        element.classList.remove("face-down-animation")
                    }
                    if (element.classList.contains("face-up-animation")) {
                        element.classList.remove("face-up-animation")
                    }
                }
            })
            clearInterval(animationInterval)
            state.gameLoadingAnimation = false
        }
    }, 50)
}

function setTimer() {
    nonReactiveState.timeInterval = setInterval(() => {
        time.seconds++
        if (time.seconds > 59) {
            time.seconds = 0
            time.minutes += 1
        }
    }, 1000)
}

function startGame() {
    cardTypeWithComponent.forEach((card) => {
        card.components.forEach((component) => {
            const obj = <card>{
                card: card.card,
                component: component,
            }
            stockPile.push(obj)
        })
    })
    shuffleAndArrangeCards()
    let startGameTimeout = setTimeout(() => {
        const containingBlock = document.querySelectorAll(".containing_block")
        containingBlock.forEach((ele) => {
            const block = ele as HTMLDivElement
            alignElements(block)
        })
        playStartAnimationAndAlignCards()
        clearTimeout(startGameTimeout)
    }, 5)
    setTimer()
}

export function startNewGame() {
    state.loader = true
    if (state.win) {
        state.win = false
    }
    clickSound.play()
    reset()
    cardTypeWithComponent.forEach((card) => {
        card.components.forEach((component) => {
            const obj = <card>{
                card: card.card,
                component: component,
            }
            stockPile.push(obj)
        })
    })
    let mainTimeout: number

    shuffleAndArrangeCards()

    state.gameLoadingAnimation = true

    mainTimeout = setTimeout(() => {
        const containingBlock = document.querySelectorAll(".containing_block")
        containingBlock.forEach((ele) => {
            const block = ele as HTMLDivElement
            alignElements(block)
        })
        playStartAnimationAndAlignCards()
        clearTimeout(mainTimeout)
        state.loader = false

        setTimer()
    }, 1000)
}

export function pauseAndPlayGame() {
    clickSound.play()
    state.pause = !state.pause
    if (state.pause) {
        clearInterval(nonReactiveState.timeInterval)
        clearInterval(nonReactiveState.streakInterval)
    } else {
        setTimer()
        streaking()
    }
}
export function newGame() {
    clickSound.play()
    if (state.win) {
        state.win = false
    }
    if (!state.gameStarted) {
        state.gameStarted = true
    }

    startGame()
}

