"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
class UserTypeOrmRepository {
    constructor(dataSource) {
        this.userEntityRepository = dataSource.getRepository(entities_1.UserEntity);
    }
    async findByEmail(email) {
        try {
            if (!email)
                throw new Error(`No se pasó un email.`);
            const userEntity = await this.userEntityRepository.findOne({
                where: { email },
            });
            if (!userEntity)
                return null;
            return userEntity.toDomain();
        }
        catch (error) {
            console.error(`Error al buscar usuario por email: ${error.message}`);
            return null;
        }
    }
    async findById(id) {
        try {
            if (!id)
                throw new Error(`No se pasó un id.`);
            const userEntity = await this.userEntityRepository.findOne({
                where: { id },
            });
            if (!userEntity)
                return null;
            return userEntity.toDomain();
        }
        catch (error) {
            console.error(`Error al buscar usuario por id: ${error.message}`);
            return null;
        }
    }
    async save(user) {
        try {
            // Convertir la entidad de dominio a una entidad de db
            const userEntity = entities_1.UserEntity.fromDomain(user);
            // Guardar la entidad
            const savedEntity = await this.userEntityRepository.save(userEntity);
            // Convertir la entidad guardada de vuelta a dominio
            return savedEntity.toDomain();
        }
        catch (error) {
            console.error(`Error al guardar usuario: ${error.message}`);
            throw new Error(`Error al guardar usuario: ${error.message}`);
        }
    }
    async findAll() {
        try {
            const userEntities = await this.userEntityRepository.find();
            // Mapear todas las entidades a objetos de dominio
            return userEntities.map((entity) => entity.toDomain());
        }
        catch (error) {
            console.error(`Error al buscar todos los usuarios: ${error.message}`);
            return [];
        }
    }
    async delete(id) {
        try {
            const result = await this.userEntityRepository.delete(id);
            return true;
        }
        catch (error) {
            console.error(`Error al eliminar usuario: ${error.message}`);
            return false;
        }
    }
}
exports.default = UserTypeOrmRepository;
