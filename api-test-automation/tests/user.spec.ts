import { User } from "@schemas/user.schema";
import { UserApi } from "@api/user-api";
import { DataGenerator } from "@helpers/dataGenerator";
import { test, expect } from "@playwright/test";

test.describe("User Endpoints", () => {
  let userApi: UserApi;

  test.beforeEach(async ({ request }) => {
    userApi = new UserApi(request);
  });

  test("should create a new user", { tag: ["@smoke"] }, async () => {
    const user: User = DataGenerator.user();
    const response = await userApi.createUser(user);

    expect(response.status()).toBe(200);
    const getUserResponse = await userApi.getUserByUsername(user.username);
    expect(await getUserResponse.json()).toMatchObject({
      username: user.username,
      email: user.email,
    });
  });

  test("should create multiple users", async () => {
    const users: User[] = DataGenerator.users(3);
    const response = await userApi.createUsersWithList(users);

    expect(response.status()).toBe(200);
    for (const user of users) {
      const getUserResponse = await userApi.getUserByUsername(user.username);
      expect(getUserResponse.status()).toBe(200);
    }
  });

  test("should login user", { tag: ["@smoke"] }, async () => {
    const user = DataGenerator.user();
    await userApi.createUser(user);

    const response = await userApi.login(user.username, user.password);
    expect(response.status()).toBe(200);
  });

  test("should logout user", { tag: ["@smoke"] }, async () => {
    const user = DataGenerator.user();
    await userApi.createUser(user);

    await userApi.login(user.username, user.password);
    const response = await userApi.logout();
    expect(response.status()).toBe(200);
  });

  test("should get user by username", { tag: ["@smoke"] }, async () => {
    const user = DataGenerator.user();
    await userApi.createUser(user);

    const response = await userApi.getUserByUsername(user.username);
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({
      username: user.username,
      email: user.email,
    });
  });

  test("should update user", { tag: ["@smoke"] }, async () => {
    const user = DataGenerator.user();
    await userApi.createUser(user);

    const updatedUser = DataGenerator.user({
      username: user.username,
      firstName: "UpdatedFirstName",
      email: "updated@example.com",
    });

    const updateResponse = await userApi.updateUser(user.username, updatedUser);
    expect(updateResponse.status()).toBe(200);

    const getUserResponse = await userApi.getUserByUsername(user.username);
    expect(await getUserResponse.json()).toMatchObject({
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      email: updatedUser.email,
    });
  });
});
