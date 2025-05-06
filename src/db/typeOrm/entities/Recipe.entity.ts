import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("recipes")
export class Recipe extends BaseEntity {
  @PrimaryColumn()
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
}
