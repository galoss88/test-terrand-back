import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RecipeDomain } from "../../../domain/entities/Recipe";
import { UserEntity } from "./User.entity";

@Entity("recipes")
export class RecipeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  title: string;

  @Column()
  imageUrl: string;

  @Column("text")
  description: string;

  @Column("text", { array: true })
  ingredients: string[];

  @Column("text", { array: true })
  instructions: string[];

  //Relacion con user, muchos a uno
  @ManyToOne(() => UserEntity, (user) => user.recipes)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  toDomain(): RecipeDomain {
    const recipeDomain = RecipeDomain.create({
      id: this.id,
      description: this.description,
      image: this.imageUrl,
      ingredients: this.ingredients,
      instructions: this.instructions,
      title: this.title,
      userId: this.user?.id ?? null,
    });

    return recipeDomain;
  }

  fromDomain(recipe: RecipeDomain): RecipeEntity {
    const recipeEntity = new RecipeEntity();
    recipeEntity.description = recipe.description;
    recipeEntity.imageUrl = recipe.image;
    recipeEntity.ingredients = recipe.ingredients;
    recipeEntity.instructions = recipe.instructions;
    recipeEntity.title = recipe.title;
    // recipeEntity.user = recipe.userId ?? null;
    recipeEntity.title = recipe.title;
    const userStub = new UserEntity();
    userStub.id =
      typeof recipe.userId === "string"
        ? recipe.userId
        : recipe.userId.toString();
    recipeEntity.user = userStub;

    return recipeEntity;
  }
}
