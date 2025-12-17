import { client } from "./Client"

export interface ProductStoreList {
    id?: string,
    name?: string,
    price?: number,
    quantity?: number
}

export interface StoreList {
    id?: string,
    label?: string,
    client?: client,
    amount?: number,
    status?: string,
    products?: ProductStoreList[]
    payUrl?: string
}