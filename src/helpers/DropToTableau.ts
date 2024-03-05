import { type TFoundation, type card, type row } from "../types/Cards"

export function dropToTableau(foundationPileLength: number, activeCardRank: number, currentTableauCardColor: string, activeCardColor: string, currentTableauCardRank: number, activeCardParentIndex: number, activeCardIndex: number, parentIndex: number, foundation: TFoundation, stockPile: card[], tableau: row[]) {
    function dropIfTableauToTableau() {

        let currentCard =
            tableau[activeCardParentIndex].faceUp.slice(activeCardIndex)
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
    function dropCardToTableauRules(): boolean {


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