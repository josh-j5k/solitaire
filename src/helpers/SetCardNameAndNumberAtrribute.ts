import { type ComponentType } from "svelte"
import Spade from "../lib/icons/Spade.svelte"
import Club from "../lib/icons/Club.svelte"
import Diamond from "../lib/icons/Diamond.svelte"

export function setCardNameAndNumberAtrribute() {
    function cardType(component: ComponentType): string {
        if (component === Spade) {
            return "spade"
        } else if (component === Club) {
            return "club"
        } else if (component === Diamond) {
            return "diamond"
        }
        return "heart"
    }
    function cardNumber(card: string): number {
        let number = 0
        switch (card) {
            case "Ace":
                number = 1
                break
            case "Two":
                number = 2
                break
            case "Three":
                number = 3
                break
            case "Four":
                number = 4
                break
            case "Five":
                number = 5
                break
            case "Six":
                number = 6
                break
            case "Seven":
                number = 7
                break
            case "Eight":
                number = 8
                break
            case "Nine":
                number = 9
                break
            case "Ten":
                number = 10
                break
            case "Jack":
                number = 11
                break
            case "Queen":
                number = 12
                break
            case "King":
                number = 13
                break
        }
        return number
    }
    return { cardNumber, cardType }
}