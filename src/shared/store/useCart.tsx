import { create } from "zustand";
import { Cart } from "../../declarations/Cart";
import { ProductType } from "../../declarations/Warehouse";

export const useCart = create<Cart>((set) => ({
    productCart: [],
    
    addToCart: (product: ProductType) => set((state) => ({
        productCart: [...state.productCart, product]
    })),

    deleteItem: (productId: number) => set((state) => ({
        // productCart: state.productCart.filter
    })) 

}))
