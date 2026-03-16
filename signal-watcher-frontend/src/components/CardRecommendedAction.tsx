import { type Signal } from "@/lib/api";

interface CardRecommendedActionProps {
    currentSignal: Signal | null;
}

export default function CardRecommendedAction({ currentSignal }: CardRecommendedActionProps) {
    return (
        <div className="cardStyle">
            <div className="flex items-center gap-2 text-yellow-500 font-mono text-xl mb-6 pb-4 border-b border-white/5">
                <span className="opacity-70">{`>_`}</span>RECOMMENDED_ACTION
            </div>
            {currentSignal ? (
                <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom duration-500">
                    <div className="space-y-4 font-mono text-sm text-white/80 leading-relaxed">
                        {currentSignal.suggestedAction?.includes('1.') ? (
                            <div className="whitespace-pre-line">{currentSignal.suggestedAction}</div>
                        ) : (
                            <div className="flex gap-4 items-start">
                                <span className="text-yellow-500">01.</span>
                                <p>{currentSignal.suggestedAction || "Proceed with manual forensic analysis of all involved nodes."}</p>
                            </div>
                        )}
                        <div className="flex gap-4 items-start opacity-60">
                            <span className="text-white/40">02.</span>
                            <p>Isolate affected segments and trigger secondary validation.</p>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 font-mono text-[10px] text-white/20 uppercase text-right tracking-[0.3em]">
                        Analysis_ready_
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <div className="h-0.5 w-12 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500/20 w-1/3 animate-[loading_2s_infinite]"></div>
                    </div>
                </div>
            )}
        </div>
    );
}