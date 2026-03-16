'use server'

export interface Signal {
  id: string;
  originalText: string;
  aiSummary: string | null;
  severity: string;
  suggestedAction: string | null;
  correlationId: string;
  createdAt: string;
}

export type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function createSignalAction(text: string): Promise<ActionResponse<Signal>> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/signals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalText: text }),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Fallo en el servidor');
    }

    const data = await response.json();
    return { success: true, data };

  } catch (error) {
    console.error("Error en Action:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error de conexión'
    };
  }
}