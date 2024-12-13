import {
  User,
  createUserResponseSchema,
  getUserByUsernameResponseSchema,
  updateUserResponseSchema,
  deleteUserResponseSchema,
  loginResponseSchema,
  logoutResponseSchema,
} from "@schemas/user.schema";
import { UserApi } from "@api/user-api";
import { DataGenerator } from "@helpers/dataGenerator";
import { test, expect } from "@playwright/test";

test.describe("User API Contract Tests", () => {
  let userApi: UserApi;

  test.beforeEach(async ({ request }) => {
    userApi = new UserApi(request);
  });

  test(
    "create user response should match schema",
    { tag: ["@contract"] },
    async () => {
      const user = DataGenerator.user();
      const response = await userApi.createUser(user);
      const responseBody = await response.json();

      expect(() =>
        createUserResponseSchema.parse({
          success: true,
          data: responseBody,
        })
      ).not.toThrow();
    }
  );

  test(
    "get user by username response should match schema",
    { tag: ["@contract"] },
    async () => {
      const user = await (
        await userApi.createUser(DataGenerator.user())
      ).json();
      const response = await userApi.getUserByUsername(user.username);
      const responseBody = await response.json();

      expect(() =>
        getUserByUsernameResponseSchema.parse({
          success: true,
          data: responseBody,
        })
      ).not.toThrow();
    }
  );

  test(
    "update user response should match schema",
    { tag: ["@contract"] },
    async () => {
      const user = await (
        await userApi.createUser(DataGenerator.user())
      ).json();
      const updatedUser = { ...user, firstName: "Updated" };
      const response = await userApi.updateUser(user.username, updatedUser);
      const responseBody = await response.json();

      expect(() =>
        updateUserResponseSchema.parse({
          success: true,
          data: responseBody,
        })
      ).not.toThrow();
    }
  );
});
