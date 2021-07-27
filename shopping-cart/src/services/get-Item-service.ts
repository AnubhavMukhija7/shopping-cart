import { Message } from '@/interface/error-message-type'
import { Item } from '@/interface/items-interface'
import {items} from '../data/items-data'

interface GetItemResponse {
    data : Item | {},
    message :Message,
}

export const getItemService = (id:number) : GetItemResponse => {
    const item = items.find(item => item.id === id)
    return {
        data : item ? item : {},
        message : item ? 'Success' : 'Error'
    }
}