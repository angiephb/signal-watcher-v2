# Signal Watcher - Backend

Sistema de monitoreo y análisis de señales de seguridad utilizando IA (Gemini).

## Requisitos Previos

- Node.js v18+
- PostgreSQL (Supabase)
- Google Gemini API Key

## Configuración

1.  Copia el archivo de ejemplo de variables de entorno:
    ```bash
    cp .env.example .env
    ```
2.  Completar las variables en `.env` con las credenciales reales.

## Instalación y Ejecución Local

1.  Instalar las dependencias:
    ```bash
    npm install
    ```
2.  Generar el cliente de Prisma:
    ```bash
    npx prisma generate
    ```
3.  Ejecutar las migraciones (opcional si la DB ya existe):
    ```bash
    npx prisma db push
    ```
4.  Iniciar el servidor de desarrollo:
    ```bash
    npm run dev
    ```

El backend estará disponible en `http://localhost:3001`.

## Despliegue

**Backend API (Render):** [https://signal-watcher-v2.onrender.com]
