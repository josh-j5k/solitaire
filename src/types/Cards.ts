
export type component = 'Spade' | "Diamond" | "Heart" | "Club"
export type cardComponent = component[]

export type card = {
    card: string
    component: component
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
