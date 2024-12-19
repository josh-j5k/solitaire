import { stockPile, time, nonReactiveState, store, resetStore } from '../store.svelte'
import Spade from "../lib/icons/Spade.svelte"
import Club from "../lib/icons/Club.svelte"
import Diamond from "../lib/icons/Diamond.svelte"
import Heart from "../lib/icons/Heart.svelte"
import audio from './useAudio'
import type { cardComponent, card, component } from '../types/Cards'
import { shuffleAndArrangeCards, alignElements } from './useMoves'
import { streaking } from './useScore'


const { shuffleSound, clickSound } = audio()
const arr = ["Ace", "King", "Queen", "Nine", "Jack", "Ten", "Eight", "Seven", "Five", "Six", "Three", "Four", "Two",]

let components = ['Spade', "Diamond", "Heart", "Club"] as component[]
function setStockPile() {
    arr.forEach(item => {
        components.forEach(type => {
            stockPile.push({ card: item, component: type })
        })
    })
}

function playStartAnimationAndAlignCards() {
    const containingBlock = document.querySelectorAll(".containing_block")
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

export function startGame() {
    resetStore()
    store.loader = true
    if (store.win) store.win = false
    if (!store.gameStarted) store.gameStarted = true
    if (store.menuToggled) store.menuToggled = false
    if (!store.gameLoadingAnimation) store.gameLoadingAnimation = true
    shuffleSound.load()
    setStockPile()
    shuffleAndArrangeCards()


    let startGameTimeout = setTimeout(() => {
        store.loader = false
        shuffleSound.play()
        setTimeout(() => {
            const containingBlock = document.querySelectorAll(".containing_block")
            containingBlock.forEach((ele) => {
                const block = ele as HTMLDivElement
                alignElements(block)
            })
            playStartAnimationAndAlignCards()
            clearTimeout(startGameTimeout)
            setTimer()

        }, 10);
    }, 1000)

}


export function pauseAndPlayGame() {
    clickSound.load()
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


