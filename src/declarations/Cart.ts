import { ProductType } from "./Warehouse"

export type CartItem = {
    product: ProductType
    quantity: number
}

export type Cart = {
    productCart: CartItem[]
    addToCart: (product: ProductType) => void
    lessToCart: (product: ProductType) => void
    deleteItem: (productId: string) => void
    clearCart: () => void
}