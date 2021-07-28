export interface address {
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

export type addresses= address[];

export interface order{
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
    },
    delieveryDate:string,
}