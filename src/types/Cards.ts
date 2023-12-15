import { type ComponentType } from "svelte"
type component = {
    component: ComponentType
}
export type cardComponent = Array<component>


export type card = {
    card: string
    component: ComponentType
}
