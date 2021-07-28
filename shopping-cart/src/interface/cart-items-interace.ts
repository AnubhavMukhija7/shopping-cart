export interface CartItem {
    id:number,
    name:string,
    price:number,
    size:string,
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