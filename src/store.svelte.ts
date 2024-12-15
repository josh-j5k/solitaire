import {
    type card,
    type cardComponent,
    type TFoundation,
    type row,
} from "./types/Cards"

export const state = $state({
    score: 0,
    streak: 5,
    gameLoadingAnimation: true,
    win: false,
    pause: false,
    gameStarted: false,
    menuToggled: false,
    loader: false,
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
export let stockPile = $state<card[]>([])

export let emptyTableau = $state<row[]>(
    new Array(7).fill({
        faceDown: <Array<card>>[],
        faceUp: <Array<card>>[],
    })
)
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
export let emptyFoundation = $state<TFoundation>({
    0: <Array<card>>[],
    1: <Array<card>>[],
    2: <Array<card>>[],
    3: <Array<card>>[],
})
export let wastePile = $state<card[]>([])
export let tableau = $state<row[]>([...emptyTableau])
export let foundation = $state<TFoundation>(emptyFoundation)

export let mousePositon = $state<{ x: number | undefined, y: number | undefined }>({
    x: undefined, y: undefined
})

export let dragAndDropState = <{ activeCard: string | undefined, activeCardElement: HTMLElement | undefined, activeCardNumber: number | undefined, activeCardColor: string | undefined, activeCardParentIndex: number | undefined, activeCardIndex: number | undefined, top: string | undefined, left: string | undefined, isDraggedFromWastePile: boolean | undefined, height: number, offsetTop: number }>{
    height: 180,
    offsetTop: 25
}

