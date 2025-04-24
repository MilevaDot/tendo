import { Models } from "appwrite";

export interface AgendaType extends Models.Document {
    name: string
    email: string
    photo_address: string
    phone: string
    dni: string
}