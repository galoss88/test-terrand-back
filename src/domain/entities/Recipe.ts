export class RecipeDomain {
  constructor(
    public readonly id: number | string,
    public readonly title: string,
    public readonly description: string,
    public readonly ingredients: string[],
    public readonly instructions: string[],
    public readonly image: string
  ) {}

  public static create({
    id,
    title,
    description,
    ingredients,
    instructions,
    image,
  }: {
    id: number | string;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    image: string;
  }) {
    return new RecipeDomain(
      id,
      title,
      description,
      ingredients,
      instructions,
      image
    );
  }
}
