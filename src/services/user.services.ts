import { FilterQuery, QueryOptions } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import UserModel from "../models/user.model";

export async function findAllUsers() {
  return await UserModel.find();
}

export async function findUserById(id: string) {
  return await UserModel.findById(id);
}

export async function findUserByEmail(email: string) {
  return await UserModel.findOne({ email: email });
}

export async function findUser(
  query: FilterQuery<IUser>,
  options: QueryOptions = { lean: true }
): Promise<IUser | null> {
  return await UserModel.findOne(query, {}, options);
}

export async function createUser(userData: Partial<IUser>) {
  try {
    const result = await UserModel.create(userData);
    return { data: result, success: true };
  } catch (error) {
    throw error;
  }
}
