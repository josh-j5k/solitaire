import type { TFoundation } from '../types/Cards'
import { tableau, wastePile, foundation, dragAndDropState } from '../store.svelte'

export function dropIfTableauToTableau(parentIndex: number): void {
    let currentCard = tableau[dragAndDropState.activeCardParentIndex!].faceUp.slice(dragAndDropState.activeCardIndex)

    tableau[parentIndex].faceUp = [
        ...tableau[parentIndex].faceUp,
        ...currentCard,
    ]
    tableau[dragAndDropState.activeCardParentIndex!].faceUp.splice(dragAndDropState.activeCardIndex!)
}

export function dropIfWastePileToTableau(parentIndex: number): void {
    let currentCard = wastePile.pop()!
    tableau[parentIndex].faceUp = [...tableau[parentIndex].faceUp, currentCard]
}

export function dropIfFoundationToTableau(key: keyof TFoundation, parentIndex: number): void {

    let currentCard = foundation[key].pop()!
    tableau[parentIndex].faceUp.push(currentCard)

}
// set rules to drop card on tableau
export function dropCardToTableauRules(foundationPileLength: number, lastChildElementColor: string, lastChildElementNumber: number): boolean {

    if (foundationPileLength < 2 && dragAndDropState.activeCardNumber === 13) {
        return true
    } else if (
        lastChildElementColor !== dragAndDropState.activeCardColor &&
        dragAndDropState.activeCardNumber! + 1 === lastChildElementNumber
    ) {
        return true
    }
    return false
}

// check if condition is matched to drop card on foundation pile
export const dropCardToFoundationPileRules = (foundationPileLength: number, lastChildElementType: string, lastChildElementNumber: number): boolean => {

    if (foundationPileLength < 2 && dragAndDropState.activeCardNumber === 1) {
        return true
    } else if (
        lastChildElementType === dragAndDropState.activeCard &&
        lastChildElementNumber + 1 === dragAndDropState.activeCardNumber
    ) {
        return true
    }
    return false
}

export const dropIfDraggedFromTableau = (key: keyof TFoundation): void => {
    let currentCard = tableau[dragAndDropState.activeCardParentIndex!].faceUp.pop()!
    foundation[key] = [...foundation[key], currentCard]
}
export const dropIfDraggedFromWastePile = (key: keyof TFoundation) => {
    let currentCard = wastePile.pop()!
    foundation[key] = [...foundation[key], currentCard]

}