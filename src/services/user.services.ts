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

export async function createUser(userData: Partial<IUser>) {
  try {
    const result = await UserModel.create(userData);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}
