import { resetStreak } from "./hooks/useScore"
import {
    type card,
    type TFoundation,
    type row,
} from "./types/Cards"

export const store = $state({
    score: 0,
    streak: 5,
    gameLoadingAnimation: true,
    win: false,
    pause: false,
    gameStarted: false,
    menuToggled: false,
    loader: false,
    difficulty: 'easy'
})
export let nonReactiveState = <{ totalCards: number, streakInterval: number | undefined, timeInterval: number | undefined }>{
    totalCards: 52,
    streakInterval: undefined,
    timeInterval: undefined

}
export let time = $state({
    minutes: 0,
    seconds: 0,
})

export let validateScore = {
    0: {
        maxLength: 0,
        currentLength: 0,
    },
    1: {
        maxLength: 0,
        currentLength: 0,
    },
    2: {
        maxLength: 0,
        currentLength: 0,
    },
    3: {
        maxLength: 0,
        currentLength: 0,
    },
}

export let stockPile = $state<card[]>([])
export let wastePile = $state<card[]>([])
export let tableau = $state<row[]>(Array(7).fill({
    faceDown: <Array<card>>[],
    faceUp: <Array<card>>[],
}))

export let foundation = $state<TFoundation>({
    0: <Array<card>>[],
    1: <Array<card>>[],
    2: <Array<card>>[],
    3: <Array<card>>[],
})

export let mousePositon = $state<{ x: number | undefined, y: number | undefined }>({
    x: undefined, y: undefined
})

export let dragAndDropState = <{ activeCard: string | undefined, activeCardElement: HTMLElement | undefined, activeCardNumber: number | undefined, activeCardColor: string | undefined, activeCardParentIndex: number | undefined, activeCardIndex: number | undefined, top: string | undefined, left: string | undefined, isDraggedFromWastePile: boolean | undefined, height: number, offsetTop: number, indices: number | undefined }>{
    height: 170,
    offsetTop: 20
}

export function resetStore() {
    for (const [key, value] of Object.entries(validateScore)) {
        value.currentLength = 0
        value.maxLength = 0
    }
    for (let [key, value] of Object.entries(dragAndDropState)) {
        if (!key.includes('height') || key != 'offsetTop') {
            value = undefined
        }
    }
    if (Object.keys(foundation).length > 0) {
        for (let [key, value] of Object.entries(foundation)) {
            value.length = 0
        }
    }
    tableau.forEach(item => {
        item.faceDown.length = 0
        item.faceUp.length = 0
    })
    stockPile.length = 0
    wastePile.length = 0
    mousePositon.x = undefined
    mousePositon.y = undefined
    if (nonReactiveState.streakInterval) clearInterval(nonReactiveState.streakInterval)
    if (nonReactiveState.timeInterval) clearInterval(nonReactiveState.timeInterval)
    nonReactiveState.totalCards = 52
    time.minutes = 0
    time.seconds = 0
    store.score = 0
    resetStreak()
}