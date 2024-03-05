import { type TFoundation, type card, type row } from "../types/Cards"

export function dropToFoundationPile(foundationPileLength: number, activeCardRank: number,
    activeCardType: string,
    currentFoundationCardType: string,
    currentFoundationCardRank: number, activeCardParentIndex: number, foundation: TFoundation, stockPile: card[], tableau: row[]) {

    const dropIfDraggedFromTableau = (key: keyof TFoundation) => {

        let currentCard = tableau[activeCardParentIndex].faceUp.pop()!
        foundation[key] = [...foundation[key], currentCard]
        foundation = foundation
        tableau = tableau
    }
    const dropIfDraggedFromWastePile = (key: keyof TFoundation) => {
        console.log('dropIfDraggedFromWastePile')

        let currentCard = stockPile.pop()!
        foundation[key] = [...foundation[key], currentCard]
        foundation = foundation
        stockPile = stockPile
    }
    const dropCardToFoundationPileRules = (): boolean => {

        if (foundationPileLength < 2 && activeCardRank === 1) {
            return true
        } else if (
            currentFoundationCardType === activeCardType &&
            currentFoundationCardRank + 1 === activeCardRank
        ) {
            return true
        }
        return false
    }
    return { dropCardToFoundationPileRules, dropIfDraggedFromWastePile, dropIfDraggedFromTableau }
}