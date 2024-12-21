import { store, nonReactiveState, validateScore, } from '../store.svelte'
import { winningSound } from '../utils/audio'



export function setScore(isFoundation: boolean) {
    if (nonReactiveState.streakInterval) {
        isFoundation ? (store.score += Math.round(15 * difficultyMultiplier())) : (store.score += Math.round(15 * difficultyMultiplier()))
    } else {
        isFoundation ? (store.score += 10) : (store.score += 5)
    }

    if (nonReactiveState.streakInterval) {
        resetStreak()
    } else {
        streaking()
    }
}

export function streaking() {
    nonReactiveState.streakInterval = setInterval(() => {
        store.streak--
        if (store.streak === 0) {
            resetStreak()
            clearInterval(nonReactiveState.streakInterval)
        }
    }, 1000)
}
export function resetStreak() {
    switch (store.difficulty) {
        case 'easy':
            store.streak = 5
            break;
        case 'medium':
            store.streak = 4
            break;
        case 'hard':
            store.streak = 3
            break
        default:
            break;
    }
}
function difficultyMultiplier(): number {
    switch (store.difficulty) {
        case 'extreme':
            return 2.5
        case 'medium':
            return 1.5
        case 'hard':
            return 2
        default:
            return 1
    }
}
export function showWinnigScreen() {
    if (
        validateScore[0].maxLength === 13 &&
        validateScore[1].maxLength === 13 &&
        validateScore[2].maxLength === 13 &&
        validateScore[3].maxLength === 13
    ) {
        store.win = true
        winningSound.play()
        clearInterval(nonReactiveState.timeInterval)
    }
}
