import { User as UserDomain } from "../entities/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<UserDomain | null>;
  findById(id: string): Promise<UserDomain | null>;
  save(user: UserDomain): Promise<UserDomain>;
  findAll(): Promise<UserDomain[]>;
  delete(id: string): Promise<boolean>;
}
