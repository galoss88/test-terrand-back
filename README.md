# 📚 Backend - Test Terrand

Este README cubre exclusivamente la API backend de **Test Terrand**, construida con **Node.js**, **Express**, **TypeScript** y **TypeORM** sobre **PostgreSQL**.

---

## 🛠 Tecnologías

* Node.js 18
* Express 5
* TypeScript
* TypeORM
* JWT para autenticación
* Base de datos: PostgreSQL (Deploy en Railway)

---

## 🚀 Instalación y Desarrollo Local

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/galoss88/test-terrand-back.git
   cd test-terrand-back
   ```

2. **Instala dependencias**

   ```bash
   pnpm install
   # o npm install / yarn install
   ```

3. **Variables de entorno**

   Crea un archivo `.env` en la raíz con:

   ```dotenv
   DATABASE_URL=postgres://postgres:78914526@localhost:5432/terrand_db
   DB_SYNC=true
   DB_LOGGING=false

   JWT_SECRET=9f5bc83a0d71d1e9d3a5e6b412f8e3c7d6b9a2e4f7c0b5d8a1e3f6c9b2d5a8e7
   JWT_EXPIRES_IN=1d

   API_PREFIX=/api
   PORT=3003
   NODE_ENV=development
   ```

4. **Levanta el servidor en modo desarrollo**

   ```bash
   pnpm dev
   ```

   Luego abre [http://localhost:3003/api/v1/health](http://localhost:3003/api/v1/health) para probar.

---

## 🏗️ Scripts disponibles

| Comando      | Descripción                                   |
| ------------ | --------------------------------------------- |
| `pnpm dev`   | Ejecuta con `ts-node-dev` para desarrollo     |
| `pnpm build` | Transpila TypeScript a `dist/`                |
| `pnpm start` | Arranca `node dist/server.js` para producción |

---

## ☁️ Despliegue en Railway

1. Conecta tu repo de GitHub en Railway.
2. En **Deploy** configura:

   * **Pre-deploy**: `pnpm install && pnpm run build`
   * **Start Command**: `pnpm start`
3. En **Variables** del servicio (solo Service Variables), agrega:

   ```text
   DATABASE_URL    ${{ Postgres.URL_DE_BASE_DE_DATOS }}
   DB_SYNC         false
   DB_LOGGING      false
   JWT_SECRET      9f5bc83a0d71d1e9d3a5e6b412f8e3c7d6b9a2e4f7c0b5d8a1e3f6c9b2d5a8e7
   JWT_EXPIRES_IN  1d
   API_PREFIX      /api
   PORT            3003
   NODE_ENV        production
   ```
4. Redeploy y revisa logs. La línea de debug `console.log("DATABASE_URL:", process.env.DATABASE_URL);` mostrará la conexión.

---

## 🔗 Endpoints Principales

* `POST /api/v1/public/auth/register` → Registrar usuario
* `POST /api/v1/public/auth/login` → Login y obtención de JWT
* `GET  /api/v1/private/recipes` → Lista de recetas del usuario (JWT requerido)
* `POST /api/v1/private/recipes` → Crear receta (JWT requerido)

---

## 📖 Uso

1. Registra un usuario con `POST /public/auth/register`.
2. Obtén token con `POST /public/auth/login`.
3. Incluye header `Authorization: Bearer <token>` para rutas `/private/...`.

---

## 🔗 Enlaces

* **Repo Backend**: [https://github.com/galoss88/test-terrand-back](https://github.com/galoss88/test-terrand-back)
