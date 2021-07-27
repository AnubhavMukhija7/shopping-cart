export interface Item {
    kind: string,
    id: number,
    description: string,
    title: string,
    availability: boolean,
    imageLink: string,
    brand: string|null,
    availablePieces: number,
    condition: Condition,
    color: Color[],
    price: Price,
    gender: Gender,
    sizes: Size[]
}

export type Items = Item[];

type Color = 'black'|'blue'| 'white' | 'green' | 'yellow' | 'purpule'  
type Gender = 'M' | 'F' |'O'
type Size = 'XS'|'S'| 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' 
type Condition = 'new' | 'old' | 'refurbished'
interface Price {
    value: number,
    currency: string
}