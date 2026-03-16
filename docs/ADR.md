# Architecture Decision Records (ADR)

Este documento registra las decisiones técnicas clave tomadas durante el desarrollo del proyecto.

## ADR 0: Modelo MVC y Estrategia Backend-First

- **Contexto**: El proyecto requería una arquitectura clara, escalable y modular para separar la lógica de negocio de la interfaz de usuario y asegurar la persistencia de datos desde el inicio.
- **Decisión**: Adopción del patrón **MVC (Model-View-Controller)**. El flujo de trabajo se inició desarrollando el **Backend** completo:
  1. **Modelado**: Definición del esquema Prisma (`Signal`).
  2. **Servicios**: Implementación de `SignalService` y `AIService` (IA-First).
  3. **Controladores**: Gestión de la lógica de petición/respuesta.
  4. **Rutas**: Exposición de endpoints REST.
- **Consecuencia**: Estructura de carpetas altamente organizada (`/src/config`, `/src/controllers`, `/src/services`, `/src/routes`). Facilita la escalabilidad y asegura que el frontend consuma datos validados y enriquecidos.

## ADR 1: Uso de Next.js Server Actions para el Frontend

- **Contexto**: Necesitába una forma limpia de comunicarnos con el backend evitando problemas de CORS en desarrollo.
- **Decisión**: Implementar `createSignalAction` como una Server Action en `lib/api.ts`.
- **Consecuencia**: Centraliza la lógica de fetch y permite tipado estricto compartido.

## ADR 2: Integración con Google Gemini (AI) en el Backend

- **Contexto**: Se requería un motor de análisis de lenguaje natural para categorizar logs y sugerir acciones. Se había iniciado inicialmente con OpenAI.
- **Decisión**: Se optó por cambiar OpenAI por **Google Gemini** (usando la SDK `@google/generative-ai` y el modelo `gemini-2.5-flash`).
- **Justificación**: La decisión se tomó debido a la excelente implementación de su SDK y al beneficio significativo de su **Free Tier**, lo que permite un desarrollo y pruebas sin costes asociados, manteniendo un alto rendimiento en el procesamiento de señales.
- **Consecuencia**: Análisis rápido y preciso con respuesta en formato JSON estructurado, eliminando barreras de pago durante la fase de evaluación técnica.

## ADR 3: PostgreSQL con Prisma ORM e Integración en Supabase

- **Contexto**: Almacenamiento persistente de las señales analizadas.
- **Decisión**: Usar Prisma con el adaptador de driver para PostgreSQL (`@prisma/adapter-pg`) para conectar directamente a Supabase.
- **Consecuencia**: Esquema de base de datos robusto y fácil de extender sin depender de conectores externos pesados.
