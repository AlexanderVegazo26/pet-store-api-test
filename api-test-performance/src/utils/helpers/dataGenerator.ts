import { faker } from "@faker-js/faker";
import { PetStatus } from "@enums/pet.enum";
import { OrderStatus } from "@enums/store.enum";
import { UserStatus } from "@enums/user.enum";
import type { Pet, Category, Tag } from "@schemas/pet.schema";
import type { Order } from "@schemas/store.schema";
import type { User } from "@schemas/user.schema";
import { generateUniqueIntId } from "@helpers/generateUniqueId";

export class PetGenerator {
  static category(overrides?: Partial<Category>): Category {
    return {
      id: generateUniqueIntId(),
      name: faker.animal.type(),
      ...overrides
    };
  }

  static tag(overrides?: Partial<Tag>): Tag {
    return {
      id: generateUniqueIntId(),
      name: faker.word.sample(),
      ...overrides
    };
  }

  static pet(overrides?: Partial<Pet>): Pet {
    return {
      id: generateUniqueIntId(),
      name: faker.animal.dog(),
      photoUrls: [faker.image.url()],
      category: PetGenerator.category(),
      tags: [PetGenerator.tag()],
      status: PetStatus.AVAILABLE,
      ...overrides
    };
  }

  static pets(count: number, overrides?: Partial<Pet>): Pet[] {
    return Array.from({ length: count }, () => this.pet(overrides));
  }
}

export class OrderGenerator {
  static order(overrides?: Partial<Order>): Order {
    return {
      id: generateUniqueIntId(),
      petId: faker.number.int({ min: 1, max: 1000 }),
      quantity: faker.number.int({ min: 1, max: 5 }),
      shipDate: faker.date.future().toISOString(),
      status: OrderStatus.PLACED,
      complete: false,
      ...overrides
    };
  }

  static orders(count: number, overrides?: Partial<Order>): Order[] {
    return Array.from({ length: count }, () => this.order(overrides));
  }
}

export class UserGenerator {
  static user(overrides?: Partial<User>): User {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      id: generateUniqueIntId(),
      username: faker.internet.username({ firstName, lastName }).toLowerCase(),
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      userStatus: UserStatus.ACTIVE,
      ...overrides
    };
  }

  static users(count: number, overrides?: Partial<User>): User[] {
    return Array.from({ length: count }, () => this.user(overrides));
  }
}

export class DataGenerator {
  static pet(overrides?: Partial<Pet>): Pet {
    return PetGenerator.pet(overrides);
  }

  static order(overrides?: Partial<Order>): Order {
    return OrderGenerator.order(overrides);
  }

  static user(overrides?: Partial<User>): User {
    return UserGenerator.user(overrides);
  }

  static users(count: number, overrides?: Partial<User>): User[] {
    return UserGenerator.users(count, overrides);
  }
}
