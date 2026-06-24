// import { Role } from "../constants/index.js";
export type NewUser = {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: "customer"; // check
};
