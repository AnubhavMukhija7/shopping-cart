import { Items } from '@/interface/items-interface';

export const filterItem= (items :Items , filterBy:any):Items=>{
    let arr=[] as Items;
    if(filterBy.length===0){
        const defaultArr=[] as Items;
        items.forEach(item=>{
            if(item.availablePieces>0){
                defaultArr.push(item);
            }
        })
        arr=defaultArr;
    }else{
        arr=[];
        if(filterBy.includes('Male Products')){
            const mArr=[] as Items
            items.forEach(item=>{
                if(item.gender==='M'){
                    mArr.push(item);
                }
            });
            arr = arr.concat(mArr);
        }
        if(filterBy.includes('Female Products')){
            const fArr=[] as Items;
            items.forEach(item=>{
                if(item.gender==='F'){
                    fArr.push(item);
                }
            })
            arr =arr.concat(fArr);
        }
        if(filterBy.includes('Include Out of Stock')){
            const outArr=[] as Items;
            items.forEach(item=>{
                outArr.push(item);
            })
            arr=[...arr,...outArr]
            
        }
    }
    const key='id';
    arr = getUniqueItems(arr,key)
    return arr;
}

const getUniqueItems=(arr:Items,key:any):Items=>{
    return[...new Map(arr.map(item=>[item[key],item])).values()]
}