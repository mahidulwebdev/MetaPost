const env = import.meta.env;
const envConfig = {
  appwriteUri: String(env.VITE_APPWRITE_URL),
  projectId: String(env.VITE_APPWRITE_PROJECT_ID),
  databaseId: String(env.VITE_APPWRITE_DATABASE_ID),
  collectionId: String(env.VITE_APPWRITE_COLLECTION_ID),
  bucketId: String(env.VITE_APPWRITE_BUCKET_ID),
};

export default envConfig;
