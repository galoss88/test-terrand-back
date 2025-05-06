import { User } from "../../domain/entities/User";

export interface IAuthService {
  /**
   * Verifica credenciales y devuelve un JWT.
   * @param email    Email del usuario
   * @param password Contraseña en texto plano
   * @throws Error si las credenciales son inválidas
   */
  authenticate(email: string, password: string): Promise<string>;

  /**
   * Devuelve el usuario registrado.
   * @param name    Nombre y Apellido del usuario como texto plano   *
   * @param email    Email del usuario
   * @param password Contraseña en texto plano
   * @throws Error si falla el registro del usuario.
   */
  register({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<User>;
}
