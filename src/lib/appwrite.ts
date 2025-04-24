import { Account, Client, Databases, Storage, ID } from "appwrite"
import { Appwrite } from "./env"

const client = new Client()
client.setProject(Appwrite.projectId)

const database = new Databases(client)
const storage = new Storage(client)
const account = new Account(client)

export {
    database, storage, account, ID
}