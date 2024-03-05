import { type TFoundation, type card, type row } from "../types/Cards"

export function dropToTableau() {
    function dropIfTableauToTableau(activeCardParentIndex: number, activeCardIndex: number, parentIndex: number, tableau: row[]) {

        let currentCard =
            tableau[activeCardParentIndex].faceUp.slice(activeCardIndex)
        tableau[parentIndex].faceUp = [
            ...tableau[parentIndex].faceUp,
            ...currentCard,
        ]
        tableau[activeCardParentIndex].faceUp.splice(activeCardIndex)
        tableau = tableau
    }
    function dropIfWastePileToTableau(parentIndex: number, stockPile: card[], tableau: row[]) {
        let currentCard = stockPile.pop()!
        tableau[parentIndex].faceUp.push(currentCard)

        tableau = tableau
        stockPile = stockPile
    }
    function dropIfFoundationToTableau(key: keyof TFoundation, foundation: TFoundation, parentIndex: number, tableau: row[]) {

        let currentCard = foundation[key].pop()!
        tableau[parentIndex].faceUp.push(currentCard)
        tableau = tableau
        foundation = foundation
    }
    function dropCardToTableauRules(foundationPileLength: number, activeCardRank: number, currentTableauCardColor: string, activeCardColor: string, currentTableauCardRank: number): boolean {


        if (foundationPileLength < 2 && activeCardRank === 13) {
            return true
        } else if (
            currentTableauCardColor !== activeCardColor &&
            activeCardRank + 1 === currentTableauCardRank
        ) {
            return true
        }
        return false
    }
    return { dropIfTableauToTableau, dropIfWastePileToTableau, dropIfFoundationToTableau, dropCardToTableauRules }
}