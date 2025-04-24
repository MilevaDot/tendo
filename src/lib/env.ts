export const Appwrite = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    collections: {
        warehouses: import.meta.env.VITE_APPWRITE_WAREHOUSE_COLLECTION_ID,
        agenda: import.meta.env.VITE_APPWRITE_AGENDA_COLLECTION_ID,
        product: import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID,
    },
    bucketFilesId: import.meta.env.VITE_APPWRITE_BUCKET_FILES_ID,
}