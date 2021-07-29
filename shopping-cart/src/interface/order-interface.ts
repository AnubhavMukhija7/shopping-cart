export interface addressType {
    fullName:string,
    mobileNo:number,
    pinCode:number,
    flatNo:string,
    area:string,
    landmark:string,
    city:string,
    state:string,
    addressType:string,
}

export type addressesType= addressType[];

export interface Order{
    address:{
        fullName:string,
        mobileNo:number,
        pinCode:number,
        flatNo:string,
        area:string,
        landmark:string,
        city:string,
        state:string,
        addressType:string,
    },
    paymentDetails:{
        paymentOption:string,
        paymentMode:string,
        card:number,
        cardType:string,
        cardExpiry:{
            month:number,
            year:number
        }
        
    },
    delieveryDate:string,
}