import { CartItems,CartItem } from "@/interface/cart-items-interace";
import { Items } from "@/interface/items-interface";
import { getItemsService } from "@/services/get-items-service";

export default{
    state:{
        cartItems:[] as CartItems,
        subTotalPrice : 0 as number,
        tax: 0 as number,
        totalPrice : 0,
    },
    mutations:{
        ADD_ITEMS(state:any,payload:any){
            state.cartItems.push(payload);            
        },
        UPDATE_ITEMS(state:any,payload:any){
                state.cartItems=payload;
                let total=0;
                const productArray= state.cartItems;
                productArray.forEach((product:CartItem) => {
                    if(product.quantity>0){
                        total+=product.price*product.quantity;
                    }else{
                        alert('enter the quantity in positive value');
                        product.quantity=1;
                    }
                });
                console.log(total);
                state.subTotalPrice=total;
                state.tax = (12/100)*total;
                state.totalPrice = state.subTotalPrice+state.tax;
        },
        DELETE_ITEMS(state:any,productId:number){
            state.cartItems= state.cartItems.filter((product:CartItem) => product.id!== productId);
        }
    },
    actions:{
        addItems(context:any,payload:any){
            context.commit('ADD_ITEMS',payload)
        },
        updateProducts(context:any,payload:any){
            context.commit('UPDATE_ITEMS',payload)
        },
        deleteProduct(context:any,productId:number){
            context.commit('DELETE_ITEMS',productId);
        }
    },
    
}