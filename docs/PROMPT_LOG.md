# PROMPT LOG – Uso de IA en el Desarrollo de Signal Watcher

Historial de interacciones y prompts utilizados para configurar la IA y la evolución del proyecto.

## Configuración Inicial de Gemini
**Fecha**: 2026-03-15
**Modelo**: `gemini-2.5-flash`

### Prompt de Análisis de Señales
```text
Analiza detalladamente este log o señal de seguridad: "${text}". 
Determina la severidad siguiendo estos criterios:
- CRITICAL: Ataque en curso, compromiso total, robo de datos confirmado.
- HIGH: Intento de ataque claro, vulnerabilidad explotable detectada, múltiples fallos de acceso.
- MEDIUM: Actividad sospechosa, anomalía en el tráfico, configuración insegura.
- LOW: Eventos informativos, escaneos menores, actividad normal del sistema.

Responde ÚNICAMENTE con un objeto JSON (sin bloques de código markdown) con este formato EXACTO:
{
    "aiSummary": "Breve resumen ejecutivo (máx 15 palabras)",
    "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
    "suggestedAction": "Acción técnica inmediata y específica"
}
```

## Evolución del Prompt
1.  **Versión 1**: Se solicitaba "summary" pero el backend esperaba "aiSummary". Corregido.
2.  **Versión 2**: Gemini incluía bloques de markdown en la respuesta. Se añadió lógica de limpieza con regex `match(/\{[\s\S]*\}/)`.
3.  **Versión 3**: Se actualizaron los criterios de severidad para ser más específicos en ataques de red y se mejoró la descripción de acciones técnicas.

## Historial de Sesión y Conversación

El desarrollo se llevó a cabo en una sesión continua siguiendo este flujo:

1. **Backend Foundation**: Configuración de Node.js + TS + Prisma 7. Se resolvió la configuración del Driver Adapter para PostgreSQL (Supabase).
2. **AI Integration**: Cambio de OpenAI a **Google Gemini** para aprovechar el rendimiento del modelo `gemini-2.5-flash`.
3. **Frontend Setup**: Creación de la estructura Next.js 15 independiente.
4. **UI Design (The "Blueprint" Phase)**:
   - Se refactorizó el CSS para replicar una estética técnica de terminal/blueprint.
   - Implementación de cuadrícula técnica y métricas simuladas.
5. **Connectivity & Logic**:
   - Implementación de **Next.js Server Actions**.
   - Resolución de errores de fetch (localhost vs 127.0.0.1).
6. **Troubleshooting & Compilación**: 
   - Resolución de conflictos en el `tsconfig.json` del backend.
   - Ajuste de `moduleResolution` y desactivación de `verbatimModuleSyntax` para asegurar la compatibilidad con Express y evitar errores durante el proceso de compilación (`build`) para despliegue.
