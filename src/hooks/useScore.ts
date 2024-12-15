import { state, nonReactiveState, validateScore, } from '../store.svelte'
import audio from './useAudio'

const { winningSound } = audio()
export function setScore(isFoundation: boolean) {
    if (nonReactiveState.streakInterval) {
        isFoundation ? (state.score += 15) : (state.score += 10)
    } else {
        isFoundation ? (state.score += 10) : (state.score += 5)
    }

    if (nonReactiveState.streakInterval) {
        state.streak = 5

    } else {
        streaking()
    }
}

export function streaking() {
    nonReactiveState.streakInterval = setInterval(() => {
        state.streak--
        if (state.streak === 0) {
            state.streak = 5
            clearInterval(nonReactiveState.streakInterval)
        }
    }, 1000)
}

export function showWinnigScreen() {
    if (
        validateScore[0].maxLength === 13 &&
        validateScore[1].maxLength === 13 &&
        validateScore[2].maxLength === 13 &&
        validateScore[3].maxLength === 13
    ) {
        state.win = true
        winningSound.play()
        clearInterval(nonReactiveState.timeInterval)
    }
}
