import { type card, type cardComponent, type deck } from "../types/Cards"
import Spade from "../lib/icons/Spade.svelte"
import Club from "../lib/icons/Club.svelte"
import Diamond from "../lib/icons/Diamond.svelte"
import Heart from "../lib/icons/Heart.svelte"
type row = {
    faceDown: card[],
    faceUp: card[],
}
let components = <cardComponent>[
    { component: Spade },
    { component: Club },
    { component: Heart },
    { component: Diamond },
]
const arr = [
    "King",
    "Ace",
    "Queen",
    "Nine",
    "Jack",
    "Ten",
    "Eight",
    "Seven",
    "Five",
    "Six",
    "Three",
    "Four",
    "Two",
]


const cardTypeWithComponent = arr.map((card) => {
    return {
        card,
        components: components.map((component) => component),
    }
})

let Cards = <Array<card>>[]
cardTypeWithComponent.forEach((card) => {
    card.components.forEach((component) => {
        const obj = <card>{
            card: card.card,
            component: component.component,
        }
        Cards.push(obj)
    })
})

let stackFaceUp = <Array<card>>[]
let stackingRow = <Array<row>>[]
stackingRow = [
    {
        faceDown: [],
        faceUp: <Array<card>>[],
    },
    {
        faceDown: <Array<card>>[],
        faceUp: <Array<card>>[],
    },
    {
        faceDown: <Array<card>>[],
        faceUp: <Array<card>>[],
    },
    {
        faceDown: <Array<card>>[],
        faceUp: <Array<card>>[],
    },
    {
        faceDown: <Array<card>>[],
        faceUp: <Array<card>>[],
    },
    {
        faceDown: <Array<card>>[],
        faceUp: <Array<card>>[],
    },
    {
        faceDown: <Array<card>>[],
        faceUp: <Array<card>>[],
    },
]
let dataDeck = <deck>{
    dataDeckOne: <Array<card>>[],
    dataDeckTwo: <Array<card>>[],
    dataDeckThree: <Array<card>>[],
    dataDeckFour: <Array<card>>[],
}

export function useMain() {


    const Rows = {
        getStackingRow: (): row[] => stackingRow,
        updateStackingRow: (rowUpdatedValue: number, newValue: card[] | card): void => {

            stackingRow = stackingRow

            if (Array.isArray(newValue)) {
                stackingRow[rowUpdatedValue].faceUp = [...stackingRow[rowUpdatedValue].faceUp, ...newValue]
            }
            else {
                stackingRow[rowUpdatedValue].faceUp = [...stackingRow[rowUpdatedValue].faceUp, newValue]
            }

            stackingRow = stackingRow

        },
        removeOldArr: (rowUpdatedValue: number, removeFromIndex: number): void => {
            stackingRow[rowUpdatedValue].faceUp.splice(removeFromIndex)
            stackingRow = [...stackingRow]
            stackingRow = stackingRow

        },
        getValue: (rowIndex: number, sliceFromIndex: number): card[] => stackingRow[rowIndex].faceUp.slice(sliceFromIndex)

    }
    const dataStackFaceUp = {
        getStackFaceUp: (): card[] => stackFaceUp,
        removeCard: (): card => {
            let rCard = stackFaceUp.pop()!
            stackFaceUp = stackFaceUp
            return rCard
        },
        update: () => {
            stackFaceUp = stackFaceUp


        }
    }
    const decks = {
        getDeck: (): deck => dataDeck,
        updateDeck: (key: keyof deck, value: card): void => {
            dataDeck[key].push(value)
            dataDeck[key] = dataDeck[key]
        },
        removeDeck: (key: keyof deck): void => {
            dataDeck[key].pop()
        }
    }
    const dataCards = {
        getCards: (): card[] => Cards,
        updateCards: () => {
            Cards = [...stackFaceUp]
            Cards = Cards
            stackFaceUp = <Array<card>>[]
            stackFaceUp = stackFaceUp


        },
        removeCard: (index: number): void => {
            Cards.splice(index, 1)

        }
    }
    return { decks, dataStackFaceUp, Rows, dataCards, Cards, stackingRow, stackFaceUp, dataDeck }
}

