import { Account, Client, ID } from "appwrite";
import envConfig from "../config/env.config";

class AuthClass {
  client = new Client();
  account = new Account();
  constructor() {
    this.client
      .setEndpoint(envConfig.appwriteUri)
      .setProject(envConfig.projectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const createAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (createAccount) {
        return this.login(email, password);
      } else {
        return createAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      const login = await this.account.createEmailPasswordSession(
        email,
        password
      );

      return login;
    } catch (error) {
      throw error;
    }
  }
  async getcurrentuser() {
    try {
      const getUser = this.account.get();
      const user = getUser ? getUser : null;
      return user;
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      // here we can specify whixh session should be delete
      //   this.account.deleteSession("current");
      // or del all sessions
      this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthClass();

export default authService;
