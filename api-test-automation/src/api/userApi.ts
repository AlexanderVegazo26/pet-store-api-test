// api/userApi.ts
import { APIRequestContext } from "@playwright/test";
import { User } from "../types/user.types";

export class UserApi {
  constructor(private request: APIRequestContext) {}

  async createUser(user: User) {
    return await this.request.post("/user", {
      data: user,
    });
  }

  async createWithList(users: User[]) {
    return await this.request.post("/user/createWithList", {
      data: users,
    });
  }

  async login(username: string, password: string) {
    const params = new URLSearchParams({
      username,
      password,
    });

    const queryString = params.toString();
    return await this.request.put(`/user/login?${queryString}`);
  }

  async logout() {
    return await this.request.get("/user/logout");
  }

  async getUserByUsername(username: string) {
    return await this.request.get(`/user/${username}`);
  }

  async updateUser(username: string, userData: Partial<User>) {
    return await this.request.put(`/user/${username}`, {
      data: userData,
    });
  }

  async deleteUser(username: string) {
    return await this.request.delete(`/user/${username}`);
  }
}
