import { type TFoundation, type card, type row } from "../types/Cards"

export function gameRulesAndLogic(foundationPileLength: number, activeCardRank: number,
    activeCardType: string,
    currentCardType: string,
    currentCardColor: string, activeCardColor: string, activeCardParentIndex: number,
    currentCardRank: number, activeCardIndex: number, parentIndex: number, foundation: TFoundation, stockPile: card[], tableau: row[]) {
    function dropIfTableauToTableau() {

        let currentCard = tableau[activeCardParentIndex].faceUp.slice(activeCardIndex)

        tableau[parentIndex].faceUp = [
            ...tableau[parentIndex].faceUp,
            ...currentCard,
        ]
        tableau[activeCardParentIndex].faceUp.splice(activeCardIndex)

    }
    function dropIfWastePileToTableau() {
        let currentCard = stockPile.pop()!
        tableau[parentIndex].faceUp.push(currentCard)


    }
    function dropIfFoundationToTableau(key: keyof TFoundation) {

        let currentCard = foundation[key].pop()!
        tableau[parentIndex].faceUp.push(currentCard)

    }
    // set rules to drop card on tableau
    function dropCardToTableauRules(): boolean {

        if (foundationPileLength < 2 && activeCardRank === 13) {
            return true
        } else if (
            currentCardColor !== activeCardColor &&
            activeCardRank + 1 === currentCardRank
        ) {
            return true
        }
        return false
    }
    const dropIfDraggedFromTableau = (key: keyof TFoundation) => {

        let currentCard = tableau[activeCardParentIndex].faceUp.pop()!
        foundation[key] = [...foundation[key], currentCard]

    }
    const dropIfDraggedFromWastePile = (key: keyof TFoundation) => {
        let currentCard = stockPile.pop()!
        foundation[key] = [...foundation[key], currentCard]

    }
    // check if condition is matched to drop card on foundation pile
    const dropCardToFoundationPileRules = (): boolean => {

        if (foundationPileLength < 2 && activeCardRank === 1) {
            return true
        } else if (
            currentCardType === activeCardType &&
            currentCardRank + 1 === activeCardRank
        ) {
            return true
        }
        return false
    }
    return { dropCardToFoundationPileRules, dropCardToTableauRules, dropIfTableauToTableau, dropIfWastePileToTableau, dropIfDraggedFromTableau, dropIfDraggedFromWastePile, dropIfFoundationToTableau }
}
