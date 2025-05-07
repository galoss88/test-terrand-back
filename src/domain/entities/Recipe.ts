export class RecipeDomain {
  constructor(
    public readonly id: number | string | null,
    public readonly userId: number | string,
    public readonly title: string,
    public readonly description: string,
    public readonly ingredients: string[],
    public readonly instructions: string[],
    public readonly image: string
  ) {}

  public static create(data: {
    id?: number | string;
    userId: number | string;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    image: string;
  }): RecipeDomain {
    return new RecipeDomain(
      data.id ?? null,
      data.userId,
      data.title,
      data.description,
      data.ingredients,
      data.instructions,
      data.image
    );
  }
}
