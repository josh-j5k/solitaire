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

        if (card === "Ace") { return 1 }

        else if (card === 'Two') {
            return 2
        }
        else if (card === 'Three') {
            return 3
        }
        else if (card === 'Four') {
            return 4
        }
        else if (card === 'Five') {
            return 5
        }
        else if (card === 'Six') {
            return 6
        }
        else if (card === 'Seven') {
            return 7
        }
        else if (card === 'Eight') {
            return 8
        }
        else if (card === 'Nine') {
            return 9
        }
        else if (card === 'Ten') {
            return 10
        }
        else if (card === 'Jack') {
            return 11
        }
        else if (card === 'Queen') {
            return 12
        }
        return 13

    }
    function cardColor(component: ComponentType): string {
        if (component === Spade || component === Club) {
            return 'black'
        }
        return 'red'
    }
    return { cardNumber, cardType, cardColor }
}