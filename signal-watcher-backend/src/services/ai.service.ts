import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyCgwoqZK_1bwzEILp_aS8n1iWdHjUsjFnI");

export interface AIAnalysis {
    aiSummary: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'UNKNOWN';
    suggestedAction: string;
}

export class AIService {
    static async analyzeSignal(text: string): Promise<AIAnalysis> {
        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                generationConfig: { responseMimeType: "application/json" }
            });

            const prompt = `Analiza detalladamente este log o señal de seguridad: "${text}". 
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
            }`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const content = response.text().trim();

            const jsonMatch = content.match(/\{[\s\S]*\}/);
            const cleanContent = jsonMatch ? jsonMatch[0] : content;
            const parsed = JSON.parse(cleanContent);

            // Normalización para prevenir errores de case-sensitivity o valores inesperados
            const validSeverities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
            const normalizedSeverity = (parsed.severity || 'UNKNOWN').toUpperCase();
            
            return {
                ...parsed,
                severity: validSeverities.includes(normalizedSeverity) ? normalizedSeverity : 'UNKNOWN'
            };

        } catch (error) {
            console.error("Error en AIService:", error);
            return {
                aiSummary: "Fallo en el motor de análisis: No se pudo procesar la señal",
                severity: "UNKNOWN",
                suggestedAction: "Realizar triaje manual y verificar logs crudos."
            };
        }



    }
}

