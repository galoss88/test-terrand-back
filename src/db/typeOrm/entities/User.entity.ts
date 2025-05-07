import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User as UserDomain } from "../../../domain/entities/User";
import { RecipeEntity } from "./Recipe.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => RecipeEntity, (recipe) => recipe.user)
  recipes: RecipeEntity[];

  // Método para convertir entidad de DB a entidad de dominio
  toDomain(): UserDomain {
    return UserDomain.create({
      id: this.id,
      name: this.name,
      email: this.email,
      passwordHash: this.password,
    });
  }

  // Método para convertir entidad de dominio a entidad de DB
  static fromDomain(user: UserDomain): UserEntity {
    const entity = new UserEntity();
    // entity.id = user?.id ?? "";
    entity.name = user.name;
    entity.email = user.email;
    entity.password = user.passwordHash;
    return entity;
  }
}
