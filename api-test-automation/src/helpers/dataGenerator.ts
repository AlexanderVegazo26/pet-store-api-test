import { faker } from "@faker-js/faker";
import { generateUniqueIntId } from "./generateUniqueId";
import { Pet } from "@src/types/pet.types";
import { PetStatus } from "@enums/pet.enum";
import { Order } from "@src/types/store.types";
import { User } from "@src/types/user.types";
import { OrderStatus } from "@enums/store.enum";
import { UserStatus } from "@enums/user.enum";

export class DataGenerator {
  static generatePet(): Pet {
    return {
      id: generateUniqueIntId(),
      name: faker.animal.dog(),
      photoUrls: [faker.image.url()],
      category: {
        id: faker.number.int({ min: 1, max: 100 }),
        name: faker.animal.type(),
      },
      tags: [
        {
          id: faker.number.int({ min: 1, max: 100 }),
          name: faker.word.sample(),
        },
      ],
      status: PetStatus.AVAILABLE,
    };
  }

  static generateOrder(petId?: number, quantity?: number): Order {
    return {
      id: generateUniqueIntId(),
      petId: petId || faker.number.int({ min: 1, max: 1000 }),
      quantity: quantity || faker.number.int({ min: 1, max: 5 }),
      shipDate: faker.date.future().toISOString(),
      status: OrderStatus.PLACED,
      complete: false,
    };
  }

  static generateUser(): User {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet
      .userName({ firstName, lastName })
      .toLowerCase();

    return {
      id: generateUniqueIntId(),
      username,
      firstName,
      lastName,
      email: faker.internet
        .email({ firstName, lastName, provider: "yopmail.com" })
        .toLowerCase(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      userStatus: UserStatus.ACTIVE,
    };
  }

  static generateUsers(count: number): User[] {
    return Array.from({ length: count }, () => this.generateUser());
  }
}
