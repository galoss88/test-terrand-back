export class User {
  constructor(
    public readonly id: string | null,
    public readonly name: string,
    public readonly passwordHash: string,
    public readonly email: string
  ) {}

  static create({
    id,
    name,
    passwordHash,
    email,
  }: {
    id?: string;
    name: string;
    passwordHash: string;
    email: string;
  }) {
    return new User(id ?? null, name, passwordHash, email);
  }

  setName(name: string) {
    return new User(this.id, name, this.passwordHash, this.email);
  }

  setEmail(email: string) {
    return new User(this.id, this.name, this.passwordHash, email);
  }

  setPasswordHash(passwordHash: string) {
    return new User(this.id, this.name, passwordHash, this.email);
  }
}
