import { type ComponentType } from "svelte"
type component = {
    component: ComponentType
}
export type cardComponent = Array<component>


export type card = {
    card: string
    component: ComponentType
}

export type deck = {
    0: Array<card>,
    1: Array<card>,
    2: Array<card>,
    3: Array<card>,
}
