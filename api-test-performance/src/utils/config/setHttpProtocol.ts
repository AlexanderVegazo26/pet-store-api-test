import { http } from "@gatling.io/http";

export const httpProtocol = http
  .baseUrl("http://127.0.0.1:8080/api/v3")
  .acceptHeader("application/json")
  .contentTypeHeader("application/json");
