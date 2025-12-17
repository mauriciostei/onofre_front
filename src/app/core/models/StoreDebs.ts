import { client } from "./Client"
import { ProductsStore } from "./ProductsStore"

export interface StoreDebs {
    label?: string
    client?: client
    products?: ProductsStore[]
}