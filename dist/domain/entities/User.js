"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, passwordHash, email) {
        this.id = id;
        this.name = name;
        this.passwordHash = passwordHash;
        this.email = email;
    }
    static create({ id, name, passwordHash, email, }) {
        return new User(id ?? null, name, passwordHash, email);
    }
    setName(name) {
        return new User(this.id, name, this.passwordHash, this.email);
    }
    setEmail(email) {
        return new User(this.id, this.name, this.passwordHash, email);
    }
    setPasswordHash(passwordHash) {
        return new User(this.id, this.name, passwordHash, this.email);
    }
}
exports.User = User;
