import type { TFoundation } from '../types/Cards'
import { tableau, wastePile, foundation } from '../store.svelte'

export function dropIfTableauToTableau(parentIndex: number, activeCardParentIndex: number, activeCardIndex: number): void {
    let currentCard = tableau[activeCardParentIndex!].faceUp.slice(activeCardIndex)

    tableau[parentIndex].faceUp = [
        ...tableau[parentIndex].faceUp,
        ...currentCard,
    ]
    tableau[activeCardParentIndex!].faceUp.splice(activeCardIndex!)
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
export function dropCardToTableauRules(foundationPileLength: number, lastChildElementColor: string, lastChildElementNumber: number, activeCardNumber: number, activeCardColor: string): boolean {

    if (foundationPileLength < 2 && activeCardNumber === 13) {
        return true
    } else if (
        lastChildElementColor !== activeCardColor &&
        activeCardNumber! + 1 === lastChildElementNumber
    ) {
        return true
    }
    return false
}

// check if condition is matched to drop card on foundation pile
export const dropCardToFoundationPileRules = (foundationPileLength: number, lastChildElementType: string, lastChildElementNumber: number, activeCardNumber: number, activeCardType: string): boolean => {

    if (foundationPileLength < 2 && activeCardNumber === 1) {
        return true
    } else if (
        lastChildElementType === activeCardType &&
        lastChildElementNumber + 1 === activeCardNumber
    ) {
        return true
    }
    return false
}

export const dropIfDraggedFromTableau = (key: keyof TFoundation, activeCardParentIndex: number): void => {
    let currentCard = tableau[activeCardParentIndex!].faceUp.pop()!
    foundation[key] = [...foundation[key], currentCard]
}
export const dropIfDraggedFromWastePile = (key: keyof TFoundation) => {
    let currentCard = wastePile.pop()!
    foundation[key] = [...foundation[key], currentCard]

}