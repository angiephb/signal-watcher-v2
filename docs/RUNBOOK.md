# RUNBOOK - Signal Watcher

Guía operativa para el mantenimiento y resolución de problemas del sistema.

## Configuración del Entorno

### Backend
1. Archivo `.env` con `DATABASE_URL` y `GEMINI_API_KEY`.
2. Generar cliente Prisma: `npx prisma generate`.
3. Ejecutar servidor: `npm run dev`.

### Frontend
1. Archivo `.env.local` con `NEXT_PUBLIC_API_URL`.
2. Ejecutar servidor: `npm run dev`.

## Resolución de Problemas (Troubleshooting)

### 1. Monitoreo de Errores de IA
Si el sistema responde con "UNKNOWN":
- Verificar que la `GEMINI_API_KEY` sea una versión activa.
- Verificar que tanto el frontend como el backend estén recibiendo y enviando el objeto JSON correctamente.
- Revisar los logs del backend para identificar si el formato de respuesta de Gemini ha cambiado.
- Confirmar que el modelo `gemini-2.5-flash` sigue disponible.

### 2. Error "Failed to Fetch"
- Asegurarse de que el backend esté corriendo en el puerto 3001.
- Verificar el archivo `.env.local` del frontend (usar `127.0.0.1` en vez de `localhost` si hay problemas de resolución).
- Revisar las políticas de CORS en `src/app.ts` del backend.

### 3. Base de Datos
- Si hay errores de conexión, verificar el estado del proyecto en Supabase.
- Asegurarse de que el puerto 5432 esté abierto para conexiones entrantes.
