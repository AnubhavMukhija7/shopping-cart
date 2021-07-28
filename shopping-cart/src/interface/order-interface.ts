export interface address {
    fullName:string,
    mobileNo:number,
    pinCode:number,
    FlatNo:string,
    Area:string,
    landmark:string,
    town:string,
    state:string,
    addressType:string,
}

export type addresses= address[];

export interface order{
    address:{
        fullName:string,
        mobileNo:number,
        pinCode:number,
        FlatNo:string,
        Area:string,
        landmark:string,
        town:string,
        state:string,
        addressType:string,
    },
    paymentDetails:{
        paymentOption:string,
    },
    delieveryDate:string,
}