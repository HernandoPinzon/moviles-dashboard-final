// api/users.js
import { ENV } from "../utils";
const USERS_ROUTE = "users";

export class UsersApi {
  baseApi = ENV.BASE_PATH;

  async getAllUsers(accessToken) {
    const url = `${this.baseApi}/${USERS_ROUTE}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUser(userId, accessToken) {
    const url = `${this.baseApi}/${USERS_ROUTE}/${userId}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteUser(userId, accessToken) {
    const url = `${this.baseApi}/${USERS_ROUTE}/${userId}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateUser(userId, accessToken, user) {
    const url = `${this.baseApi}/${USERS_ROUTE}/${userId}`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
