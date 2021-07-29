import { Items } from '@/interface/items-interface';

export const filterItem= (items :Items , filterBy:any):Items=>{
    let arr=[] as Items;
    if(filterBy==='Default'){
        items.forEach(item=>{
            if(item.availablePieces>0){
                arr.push(item);
            }
        })
    }
    if(filterBy.includes('Male Products')){
        items.forEach(item=>{
            if(item.gender==='M'){
                arr.push(item);
            }
        })
    }
    if(filterBy.includes('Female Products')){
        items.forEach(item=>{
            if(item.gender==='F'){
                arr.push(item);
            }
        })
    }else{
        arr=items;
    }
    console.log(arr);
    return arr;
}
