import { APIRequestContext, APIResponse } from "@playwright/test";
import { User } from "@src/types/user.types";

export class UserApi {
  constructor(private request: APIRequestContext) {}

  async createUser(user: User): Promise<APIResponse> {
    return await this.request.post("/api/v3/user", {
      data: user,
    });
  }

  async createUsersWithList(users: User[]): Promise<APIResponse> {
    return await this.request.post("/api/v3/user/createWithList", {
      data: users,
    });
  }

  async login(username: string, password: string): Promise<APIResponse> {
    const params = new URLSearchParams({
      username,
      password,
    });

    const queryString = params.toString();
    return await this.request.get(`/api/v3/user/login?${queryString}`);
  }

  async logout(): Promise<APIResponse> {
    return await this.request.get("/api/v3/user/logout");
  }

  async getUserByUsername(username: string): Promise<APIResponse> {
    return await this.request.get(`/api/v3/user/${username}`);
  }

  async updateUser(
    username: string,
    userData: Partial<User>
  ): Promise<APIResponse> {
    return await this.request.put(`/api/v3/user/${username}`, {
      data: userData,
    });
  }

  async deleteUser(username: string): Promise<APIResponse> {
    return await this.request.delete(`/api/v3/user/${username}`);
  }
}
