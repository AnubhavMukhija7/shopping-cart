export interface CartItem {
    name:string,
    price:number,
    quantity : number,
    colour : string,
    subtotal : number,
}

export type CartItems =  CartItem[];