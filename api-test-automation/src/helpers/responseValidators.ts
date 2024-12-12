import { APIResponse } from "@playwright/test";
import { z } from "zod";

export const validateResponse = async <T>(
  response: APIResponse,
  schema: z.ZodType<T>,
  expectedStatus: number
): Promise<void> => {
  const status = response.status();

  if (status !== expectedStatus) {
    throw new Error(`Expected status ${expectedStatus}, but got ${status}`);
  }

  if (status >= 200 && status < 300) {
    const data = await response.json();
    try {
      schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(
          "Schema validation failed:",
          JSON.stringify(error.errors, null, 2)
        );
      }
      throw error;
    }
  }
};

export const validateErrorResponse = async (
  response: APIResponse,
  expectedStatus: number,
  expectedMessage?: string
): Promise<void> => {
  const status = response.status();

  if (status !== expectedStatus) {
    throw new Error(
      `Expected error status ${expectedStatus}, but got ${status}`
    );
  }

  if (expectedMessage) {
    const data = await response.json();
    if (data.message !== expectedMessage) {
      throw new Error(
        `Expected error message "${expectedMessage}", but got "${data.message}"`
      );
    }
  }
};
