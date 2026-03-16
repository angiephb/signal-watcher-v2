"use client";

import { useEffect, useState } from "react";
import { type Signal } from "@/lib/api";
import { SignalForm } from "@/components/SignalForm";
import Background from "@/components/Background";
import CardAnalysis from "@/components/CardAnalysis";
import CardRecommendedAction from "@/components/CardRecommendedAction";


export default function Home() {
	const [currentSignal, setCurrentSignal] = useState<Signal | null>(null);
	const [inputText, setInputText] = useState("");

	useEffect(() => {
		if (inputText === "") {
			setCurrentSignal(null);
		}
	}, [inputText]);

	return (
		<main>
			<Background />
			<article className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto w-full items-center z-10">
				<div className="h-full py-8">
					<SignalForm 
						onAnalysisComplete={(signal) => setCurrentSignal(signal)} 
						onTextChange={(text) => setInputText(text)}
					/>
				</div>
				<div className="flex flex-col gap-8 py-8 h-full">
					<CardAnalysis 
						currentSignal={currentSignal}
					/>
					<CardRecommendedAction
						currentSignal={currentSignal}
					/>
				</div>
			</article>
		</main>
	);
}
