import { UserApi } from "@/api/userApi";
import { DataGenerator } from "@/helpers/dataGenerator";
import { XmlHelper } from "@/helpers/xmlhelper";
import { User } from "@/types/user.types";
import { test, expect } from "@playwright/test";

test.describe("User Endpoints", () => {
  let userApi: UserApi;

  test.beforeEach(async ({ request }) => {
    userApi = new UserApi(request);
  });

  test("should create a new user", async () => {
    const user: User = DataGenerator.generateUser();
    const createUserResponse = await userApi.createUser(user);

    expect(createUserResponse.status()).toBe(200);

    const getUserResponse = await userApi.getUserByUsername(user.username);
    const getUserResponseParsed = await XmlHelper.parseXmlResponse<{
      User: User;
    }>(getUserResponse);

    expect(getUserResponseParsed.User).toMatchObject({
      username: user.username,
      email: user.email,
    });
  });

  test("should create multiple users", async () => {
    const users: User[] = DataGenerator.generateUsers(5);

    const createUsersResponse = await userApi.createUsersWithList(users);
    expect(createUsersResponse.status()).toBe(200);

    for (const user of users) {
      const getUserResponse = await userApi.getUserByUsername(user.username);
      expect(getUserResponse.status()).toBe(200);
    }
  });

  test("should login user", async () => {
    const user = DataGenerator.generateUser();
    await userApi.createUser(user);
    const loginResponse = await userApi.login(user.username, user.password);
    expect(loginResponse.status()).toBe(200);
  });

  test("should logout user", async () => {
    const user = DataGenerator.generateUser();
    await userApi.createUser(user);
    const loginResponse = await userApi.login(user.username, user.password);
    expect(loginResponse.status()).toBe(200);

    const logoutResponse = await userApi.logout();
    expect(logoutResponse.status()).toBe(200);
  });

  test("should get user by username", async () => {
    const user = DataGenerator.generateUser();
    await userApi.createUser(user);

    const getUserResponse = await userApi.getUserByUsername(user.username);
    expect(getUserResponse.status()).toBe(200);

    const getUserResponseParsed = await XmlHelper.parseXmlResponse<{
      User: User;
    }>(getUserResponse);

    expect(getUserResponseParsed.User).toMatchObject({
      ...user,
    });
  });

  test("should update user", async () => {
    const user = DataGenerator.generateUser();
    await userApi.createUser(user);

    const userDataToUpdate: Partial<User> = {
      firstName: "UpdatedFirstName",
      email: "updated@updated.com",
    };

    const updatedUser: Partial<User> = { ...user, ...userDataToUpdate };

    const updateUserResponse = await userApi.updateUser(
      user.username,
      updatedUser
    );
    expect(updateUserResponse.status()).toBe(200);

    const getUserResponse = await userApi.getUserByUsername(user.username);
    const getUserResponseParsed = await XmlHelper.parseXmlResponse<{
      User: User;
    }>(getUserResponse);

    expect(getUserResponseParsed.User).toMatchObject({
      ...updatedUser,
    });
  });
});
