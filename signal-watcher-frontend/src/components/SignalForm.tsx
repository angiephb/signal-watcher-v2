"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createSignalAction, type Signal } from "@/lib/api";

interface SignalFormProps {
  onAnalysisComplete: (signal: Signal) => void;
  onTextChange?: (text: string) => void;
}

export function SignalForm({ onAnalysisComplete, onTextChange }: SignalFormProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const result = await createSignalAction(text);
    
    if (result.success) {
      onAnalysisComplete(result.data); // Aquí guardas la respuesta de Gemini
    } else {
      setError(result.error || "An unknown error occurred");
    }
    
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl h-full flex flex-col items-stretch">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}
        <div className="flex-1 bg-zinc-50/50 rounded-3xl border border-zinc-100 p-4">
          <textarea
            value={text}
            onChange={(e) => {
              const newValue = e.target.value;
              setText(newValue);
              onTextChange?.(newValue);
            }}
            placeholder="Paste your security signals, logs, or event descriptions here..."
            className="w-full h-full min-h-[400px] resize-none bg-transparent text-zinc-800 placeholder:text-zinc-400 focus:outline-none text-lg leading-relaxed p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="mt-8 py-5 bg-[#0047ff] hover:bg-[#0037cc] text-white rounded-2xl font-bold text-lg tracking-wider uppercase transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            "Analyze Signal with IA"
          )}
        </button>
      </form>
    </div>
  );
}
