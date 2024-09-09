import { Client, Databases, ID, Query, Storage } from "appwrite";
import envConfig from "../config/env.config";

class storage {
  client = new Client();
  database;
  storage;
  constructor() {
    this.client
      .setEndpoint(envConfig.appwriteUri)
      .setProject(envConfig.projectId);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  // ----- auth service
  async createPost({ title, slug, content, image, status, userId }) {
    try {
      return await this.database.createDocument(
        envConfig.databaseId,
        envConfig.collectionId,
        slug,
        {
          title,
          content,
          image,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(slug, { title, content, image, status }) {
    try {
      return await this.database.updateDocument(
        envConfig.databaseId,
        envConfig.collectionId,
        slug,
        {
          title,
          content,
          image,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        envConfig.databaseId,
        envConfig.collectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async getPost(slug) {
    try {
      return await this.database.getDocument(
        envConfig.databaseId,
        envConfig.collectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async getPosts(query = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        envConfig.databaseId,
        envConfig.collectionId,
        query
      );
    } catch (error) {
      throw error;
    }
  }
  // ------ file service
  async uploadFile(file) {
    try {
      await this.storage.createFile(envConfig.bucketId, ID.unique(), file);
    } catch (error) {
      throw error;
    }
  }
  async deleteFile(fileID) {
    try {
      return await this.storage.deleteFile(envConfig.bucketId, fileID);
    } catch (error) {
      throw error;
    }
  }
  async getFilePreview(fileID) {
    try {
      return this.storage.getFilePreview(envConfig.bucketId, fileID);
    } catch (error) {
      throw error;
    }
  }
}

const storagService = new storage();
export default storagService;
