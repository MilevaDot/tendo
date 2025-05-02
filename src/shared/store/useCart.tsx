import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { Cart } from "../../declarations/Cart";
import { ProductType } from "../../declarations/Warehouse";

export const useCart = create(persist<Cart>((set) => ({
    productCart: [],
    
    addToCart: (product: ProductType) => set((state) => {
        const exist = state.productCart.find(item => item.product.$id === product.$id)

        if ( exist ) {
            return {
                productCart: state.productCart.map(item => item.product.$id == product.$id ?
                    {...item, quantity: item.quantity + 1} : item
                )
            }
        } else {
            return { productCart: [...state.productCart, { product, quantity: 1 }] }
        }

    }),

    lessToCart: (product: ProductType) => set((state) => {
        return {
            productCart: state.productCart.map(item => item.product.$id == product.$id ?
                {...item, quantity: item.quantity - 1} : item
            )
        }
    }),

    deleteItem: (productId: string) => set((state) => ({
        productCart: state.productCart.filter((item) => item.product.$id !== productId)
    })),

    clearCart: () => set(() => ({
        productCart: []
    }))

}), {
    name: 'shoppingCart'
}))
