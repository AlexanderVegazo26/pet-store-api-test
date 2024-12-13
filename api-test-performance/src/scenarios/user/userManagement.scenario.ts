import { faker } from "@faker-js/faker";
import { exec, scenario, StringBody } from "@gatling.io/core";
import { http, status } from "@gatling.io/http";
import { DataGenerator } from "@helpers/dataGenerator";
import { User } from "@schemas/user.schema";

const createUserSteps = () =>
  exec((session) => {
    const user: User = DataGenerator.user();
    return session.set("testUser", user);
  })
    .exec(
      http("Create user")
        .post("/user")
        .body(
          StringBody((session) => {
            const user = session.get("testUser") as User;
            return JSON.stringify(user);
          })
        )
        .check(status().is(200))
    )
    .pause(1);

export const createUserScenario = () => {
  return scenario("Create User").exec(createUserSteps()).pause(1);
};

export const createUsersWithListScenario = () => {
  const users: User[] = DataGenerator.users(5);

  return scenario("Create Users with List")
    .exec(
      http("Creates list of users with given input array")
        .post("/user/createWithList")
        .body(StringBody(JSON.stringify(users)))
        .check(status().is(200))
    )
    .pause(1);
};

export const getUserByUsernameScenario = () => {
  return scenario("Get User by Username")
    .exec(createUserSteps())
    .exec(
      http("Get user by user name")
        .get((session) => {
          const user = session.get("testUser") as User;
          return `/user/${user.username}`;
        })
        .check(status().is(200))
    )
    .pause(1);
};

export const updateUserScenario = () => {
  return scenario("Update User")
    .exec(createUserSteps())
    .exec((session) => {
      const updatedUser = {
        ...(session.get("testUser") as User),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email()
      };
      return session.set("updatedUser", updatedUser);
    })
    .exec(
      http("Update user")
        .put((session) => {
          const user = session.get("testUser") as User;
          return `/user/${user.username}`;
        })
        .body(
          StringBody((session) => {
            const updatedUser = session.get("updatedUser") as User;
            return JSON.stringify(updatedUser);
          })
        )
        .check(status().is(200))
    )
    .pause(1);
};

export const deleteUserScenario = () => {
  return scenario("Delete User")
    .exec(createUserSteps())
    .exec(
      http("Delete user")
        .delete((session) => {
          const user = session.get("testUser") as User;
          return `/user/${user.username}`;
        })
        .check(status().is(200))
    )
    .pause(1);
};
