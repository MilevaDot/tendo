import { Models } from "appwrite";

export interface WarehouseType extends Models.Document {
    name: string
    active: boolean
    short_name: string
    description: string
}

export interface ProductType extends Models.Document {
    name: string
    code: string
    price: number
    photo_url: string
    published: boolean
}
