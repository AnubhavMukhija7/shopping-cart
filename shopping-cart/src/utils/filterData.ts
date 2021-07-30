import { Items } from '@/interface/items-interface';

export const filterItem= (items :Items , filterBy:any):Items=>{
    let arr=[] as Items;
    if(filterBy.includes('Male Products')){
        const mArr=[] as Items
        items.forEach(item=>{
            if(item.gender==='M'){
                mArr.push(item);
            }
        })
        arr=[...arr,...mArr]
    }
    if(filterBy.includes('Female Products')){
        const fArr=[] as Items;
        items.forEach(item=>{
            if(item.gender==='F'){
                fArr.push(item);
            }
        })
        arr =[...arr,...fArr]
    }
    if(filterBy.includes('Include Out of Stock')){
        const outArr=[] as Items;
        items.forEach(item=>{
            outArr.push(item);
        })
        arr=[...arr,...outArr]
    }
    if(filterBy.length===0){
        items.forEach(item=>{
            if(item.availablePieces>0){
                arr.push(item);
            }
        })
    }
    return arr;
}
