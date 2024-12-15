
import Spade from "../lib/icons/Spade.svelte"
import Club from "../lib/icons/Club.svelte"
import Diamond from "../lib/icons/Diamond.svelte"
import type { component } from "../types/Cards"

export function setCardNameAndNumberAtrribute() {
    function cardType(component: component): string {
        switch (component) {
            case Spade:
                return "spade";
            case Club:
                return "club";
            case Diamond:
                return "diamond";
            default:
                return "heart";
        }
    }
    function cardNumber(card: string): number {
        switch (card) {
            case "Ace":
                return 1;
            case "Two":
                return 2;
            case "Three":
                return 3;
            case "Four":
                return 4;
            case "Five":
                return 5;
            case "Six":
                return 6;
            case "Seven":
                return 7;
            case "Eight":
                return 8;
            case "Nine":
                return 9;
            case "Ten":
                return 10;
            case "Jack":
                return 11;
            case "Queen":
                return 12;
            default:
                return 13;
        }


    }
    function cardColor(component: component): string {
        if (component === Spade || component === Club) {
            return 'black'
        }
        return 'red'
    }
    return { cardNumber, cardType, cardColor }
}