export interface CartItem {
    name:string,
    price:number,
    quantity : number,
    availableQuantity : number,
    colour : string,
    subtotal : number,
}

export type productObj={
    price:number,
    quantity:number,
}

export type CartItems =  CartItem[];