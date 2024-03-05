import { type ComponentType } from "svelte"
type component = {
    component: ComponentType
}
export type cardComponent = Array<component>


export type card = {
    card: string
    component: ComponentType
}

export type TFoundation = {
    0: Array<card>,
    1: Array<card>,
    2: Array<card>,
    3: Array<card>,
}

export type row = {
    faceDown: card[]
    faceUp: card[]
}
