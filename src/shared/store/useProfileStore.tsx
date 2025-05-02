import { Models, Query } from "appwrite";
import { AgendaType } from "src/declarations/Agenda";
import { account, database } from "../../lib/appwrite";
import { Appwrite } from "../../lib/env";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type userProfile = {
    profile: AgendaType | undefined
    session: Models.User<Models.Preferences> | undefined
    getSession: () => void
    getProfile: () => void
}

export const useProfileStore = create(persist<userProfile>((set) => ({
    profile: undefined,
    session: undefined,

    getSession: async () => {
        const session = await account.get()
        set({session})
    },

    getProfile: async () => {
        const { email } = await account.get()
        const { documents } = await database.listDocuments(
            Appwrite.databaseId,
            Appwrite.collections.agenda,
            [
                Query.equal('email', email)
            ]
        )
        set({ profile: documents[0] as AgendaType })
    },
}), {
    name: 'profileSession'
}))