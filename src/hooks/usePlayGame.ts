import { stockPile, time, nonReactiveState, store, resetStore } from '../store.svelte'
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

let components = ['Spade', "Diamond", "Heart", "Club"]
const cardTypeWithComponent = arr.map((card) => {
    return {
        card,
        components: components.map((component) => component),
    }
})


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
            store.gameLoadingAnimation = false
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
            store.gameLoadingAnimation = false
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

    resetStore()
    if (store.win) store.win = false
    if (store.menuToggled) store.menuToggled = false
    store.loader = true
    clickSound.play()
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

    store.gameLoadingAnimation = true

    mainTimeout = setTimeout(() => {
        const containingBlock = document.querySelectorAll(".containing_block")
        containingBlock.forEach((ele) => {
            const block = ele as HTMLDivElement
            alignElements(block)
        })
        playStartAnimationAndAlignCards()
        clearTimeout(mainTimeout)
        store.loader = false

        setTimer()
    }, 2000)

}

export function pauseAndPlayGame() {
    shuffleSound.load()
    clickSound.play()
    store.pause = !store.pause
    if (store.pause) {
        clearInterval(nonReactiveState.timeInterval)
        clearInterval(nonReactiveState.streakInterval)
    } else {
        setTimer()
        streaking()
    }
}
export function newGame() {
    clickSound.play()
    if (store.win) {
        store.win = false
    }
    if (!store.gameStarted) {
        store.gameStarted = true
    }

    startGame()
}

