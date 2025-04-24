import { ProductType } from "./Warehouse"

export type Cart = {
    productCart: ProductType[]
    addToCart: (product: ProductType) => void
    deleteItem: (productId: number) => void
}