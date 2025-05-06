export interface IAuthService {
  /**
   * Verifica credenciales y devuelve un JWT.
   * @param email    Email del usuario
   * @param password Contraseña en texto plano
   * @throws Error si las credenciales son inválidas
   */
  authenticate(email: string, password: string): Promise<string>;
}
