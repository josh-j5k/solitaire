import { type TFoundation, type card, type row } from "../types/Cards"

export function dropToFoundationPile() {

    const dropIfDraggedFromTableau = (key: keyof TFoundation, activeCardParentIndex: number, foundation: TFoundation, tableau: row[]) => {

        let currentCard = tableau[activeCardParentIndex].faceUp.pop()!
        foundation[key] = [...foundation[key], currentCard]
        foundation = foundation
        tableau = tableau
    }
    const dropIfDraggedFromWastePile = (key: keyof TFoundation, foundation: TFoundation, stockPile: card[],) => {
        console.log('dropIfDraggedFromWastePile')

        let currentCard = stockPile.pop()!
        foundation[key] = [...foundation[key], currentCard]
        foundation = foundation
        stockPile = stockPile
    }
    const dropCardToFoundationPileRules = (foundationPileLength: number, activeCardRank: number,
        activeCardType: string,
        currentFoundationCardType: string,
        currentFoundationCardRank: number,): boolean => {

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