import { Message } from '@/interface/error-message-type'
import { Items } from '@/interface/items-interface'
import {items} from '../data/items-data'

interface GetItemsResponse {
    data : Items | [],
    message :Message,
}

export const getItemsService = () : GetItemsResponse => {
    return {
        data : items ? items : [],
        message : items ? 'Success' : 'Error'
    }
}