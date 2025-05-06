import { DataSource, Repository } from "typeorm";
import { ErrorMessage } from "../../../controllers/types";
import { User as UserDomain } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserEntity } from "../entities";

export default class UserTypeOrmRepository implements IUserRepository {
  private userEntityRepository: Repository<UserEntity>;

  constructor(dataSource: DataSource) {
    this.userEntityRepository = dataSource.getRepository(UserEntity);
  }
  async findByEmail(email: string): Promise<UserDomain | null> {
    try {
      if (!email) throw new Error(`No se pasó un email.`);

      const userEntity = await this.userEntityRepository.findOne({
        where: { email },
      });

      if (!userEntity) return null;

      return userEntity.toDomain();
    } catch (error: ErrorMessage) {
      console.error(`Error al buscar usuario por email: ${error.message}`);
      return null;
    }
  }

  async findById(id: string): Promise<UserDomain | null> {
    try {
      if (!id) throw new Error(`No se pasó un id.`);

      const userEntity = await this.userEntityRepository.findOne({
        where: { id },
      });

      if (!userEntity) return null;

      return userEntity.toDomain();
    } catch (error: ErrorMessage) {
      console.error(`Error al buscar usuario por id: ${error.message}`);
      return null;
    }
  }

  async save(user: UserDomain): Promise<UserDomain> {
    try {
      // Convertir la entidad de dominio a una entidad de persistencia
      const userEntity = UserEntity.fromDomain(user);

      // Guardar la entidad
      const savedEntity = await this.userEntityRepository.save(userEntity);

      // Convertir la entidad guardada de vuelta a dominio
      return savedEntity.toDomain();
    } catch (error: ErrorMessage) {
      console.error(`Error al guardar usuario: ${error.message}`);
      throw new Error(`Error al guardar usuario: ${error.message}`);
    }
  }

  async findAll(): Promise<UserDomain[]> {
    try {
      const userEntities = await this.userEntityRepository.find();

      // Mapear todas las entidades a objetos de dominio
      return userEntities.map((entity) => entity.toDomain());
    } catch (error: ErrorMessage) {
      console.error(`Error al buscar todos los usuarios: ${error.message}`);
      return [];
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.userEntityRepository.delete(id);
      return true;
    } catch (error: ErrorMessage) {
      console.error(`Error al eliminar usuario: ${error.message}`);
      return false;
    }
  }
}


