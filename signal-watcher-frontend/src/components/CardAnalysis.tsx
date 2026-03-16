import { type Signal } from "@/lib/api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardAnalysisProps {
    currentSignal: Signal | null;
}

export default function CardAnalysis({ currentSignal }: CardAnalysisProps) {
    function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
    }
    return (
        <div className="cardStyle">
            <span className="flex items-center gap-2 text-cyan-400 font-mono text-xl mb-6 pb-4 border-b border-white/5">
                <span className="opacity-70">{`>_`}</span>
                SEVERITY_ANALYSIS
            </span>
            {currentSignal ? (
                <div className="flex-1 flex flex-col gap-6 animate-in fade-in duration-500">
                    <div className={cn(
                        "self-start px-6 py-2 rounded-full border flex items-center gap-3 font-mono font-bold text-xl transition-all duration-300",
                        currentSignal.severity === 'CRITICAL' && "bg-red-500/10 border-red-500/50 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]",
                        currentSignal.severity === 'HIGH' && "bg-orange-500/10 border-orange-500/50 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]",
                        currentSignal.severity === 'MEDIUM' && "bg-yellow-500/10 border-yellow-500/50 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]",
                        currentSignal.severity === 'LOW' && "bg-emerald-500/10 border-emerald-500/50 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
                        !['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].includes(currentSignal.severity) && "bg-zinc-500/10 border-zinc-500/50 text-zinc-400"
                    )}>
                        <span className="text-2xl">
                            {currentSignal.severity === 'CRITICAL' && "☢️"}
                            {currentSignal.severity === 'HIGH' && "🚨"}
                            {currentSignal.severity === 'MEDIUM' && "⚠️"}
                            {currentSignal.severity === 'LOW' && "✅"}
                            {!['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].includes(currentSignal.severity) && "❓"}
                        </span>
                        {currentSignal.severity}
                    </div>


                    <div className="space-y-4 font-mono text-sm uppercase tracking-wide">
                        <p className="flex gap-2">
                            <span className="text-white/40">SUMMARY:</span>
                            <span className="text-white/90">{currentSignal.aiSummary}</span>
                        </p>
                        <p className="flex gap-2">
                            <span className="text-white/40">Correlation_ID:</span>
                            <span className="text-white/90">{currentSignal.correlationId.slice(0, 16)}</span>
                        </p>
                        <p className="flex gap-2">
                            <span className="text-white/40">Timestamp:</span>
                            <span className="text-white/90">{new Date(currentSignal.createdAt).toLocaleString()}</span>
                        </p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5 font-mono text-sm">
                        <span className="text-emerald-500">root@gemini_core</span>
                        <span className="text-white/40">:~#</span>
                        <span className="ml-2 w-2 h-4 bg-white/60 inline-block animate-pulse align-middle"></span>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-white/20 font-mono text-xs uppercase tracking-[0.2em] animate-pulse italic">
                        Awaiting system signal input...
                    </p>
                </div>
            )}
        </div>
    );
}