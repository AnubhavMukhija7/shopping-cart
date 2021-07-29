import { CartItems } from "@/interface/cart-items-interace";
import { Items } from "@/interface/items-interface";
import { getItemsService } from "@/services/get-items-service";

export default{
    state:{
        cartItems:[] as CartItems,
        subTotalPrice : 0 as number,
            tax: 0 as number,
            totalPrice : 0,
    },
    mutation:{
        ADD_ITEMS(state:any,payload:any){
            state.cartItems.push(payload.data);
        },
        UPDATE_ITEMS(){
        }
    },
    actions:{
        addItems(context:any,payload:any){
            context.commit('ADD_ITEMS',payload)
        }
    },
    
}