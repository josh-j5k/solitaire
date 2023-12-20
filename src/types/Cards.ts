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
    dataDeckOne: Array<card>,
    dataDeckTwo: Array<card>,
    dataDeckThree: Array<card>,
    dataDeckFour: Array<card>,
}
