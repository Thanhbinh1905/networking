"use client";

import { ArrowRight, Route, Terminal } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DiagramRenderer } from "@/components/diagram/DiagramRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { concepts } from "@/data/concepts";
import { journeys } from "@/data/journeys";
import { cn } from "@/lib/utils";

export default function JourneysPage() {
	const [selectedJourneyId, setSelectedJourneyId] = useState(journeys[0].id);
	const [currentStep, setCurrentStep] = useState(0);

	const selectedJourney = useMemo(
		() =>
			journeys.find((journey) => journey.id === selectedJourneyId) ??
			journeys[0],
		[selectedJourneyId],
	);

	const selectedConcepts = selectedJourney.conceptSlugs
		.map((slug) => concepts.find((concept) => concept.slug === slug))
		.filter(Boolean);

	function selectJourney(journeyId: string) {
		setSelectedJourneyId(journeyId);
		setCurrentStep(0);
	}

	return (
		<div className="flex h-full flex-col bg-background">
			<header className="flex-none border-b bg-card px-8 py-6 lg:px-12">
				<div className="flex max-w-4xl flex-col gap-4">
					<div className="flex flex-wrap items-center gap-3">
						<Badge variant="secondary" className="w-fit font-mono">
							Journey mode
						</Badge>
						<Badge variant="outline" className="w-fit font-mono">
							{journeys.length} real-world flows
						</Badge>
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-display-lg text-foreground">
							Practice complete network journeys.
						</h1>
						<p className="max-w-3xl text-body-md text-muted-foreground">
							Move beyond isolated concepts by following how packets, routes,
							protocols, and security layers work together during common
							developer tasks.
						</p>
					</div>
				</div>
			</header>

			<div className="grid min-h-0 flex-1 gap-6 overflow-hidden p-6 lg:grid-cols-[280px_minmax(0,1fr)_360px] lg:p-8">
				<ScrollArea className="min-h-0">
					<div className="flex flex-col gap-3 pr-3">
						{journeys.map((journey) => {
							const isActive = journey.id === selectedJourney.id;

							return (
								<button
									key={journey.id}
									type="button"
									onClick={() => selectJourney(journey.id)}
									className={cn(
										"flex min-h-32 cursor-pointer flex-col gap-3 rounded-xl border bg-card p-4 text-left shadow-level-2 transition-colors",
										isActive
											? "border-ring ring-2 ring-ring/20"
											: "hover:border-ring",
									)}
								>
									<div className="flex items-center justify-between gap-3">
										<Route
											className={cn(
												"text-muted-foreground",
												isActive && "text-primary",
											)}
										/>
										<Badge variant={isActive ? "default" : "secondary"}>
											{journey.conceptSlugs.length} concepts
										</Badge>
									</div>
									<div className="flex flex-col gap-1">
										<span className="text-body-sm font-medium text-foreground">
											{journey.title}
										</span>
										<span className="line-clamp-3 text-body-sm text-muted-foreground">
											{journey.summary}
										</span>
									</div>
								</button>
							);
						})}
					</div>
				</ScrollArea>

				<Card className="min-h-[560px] overflow-hidden bg-card p-0 shadow-level-3">
					<DiagramRenderer
						initialNodes={selectedJourney.diagram.nodes}
						initialEdges={selectedJourney.diagram.edges}
						steps={selectedJourney.diagram.steps}
						currentStep={currentStep}
						onStepChange={setCurrentStep}
						slug={`journey-${selectedJourney.id}`}
					/>
				</Card>

				<ScrollArea className="min-h-0">
					<div className="flex flex-col gap-5 pr-3 pb-8">
						<Card className="shadow-level-2">
							<CardHeader>
								<CardTitle className="text-display-sm">
									{selectedJourney.title}
								</CardTitle>
								<CardDescription className="text-body-sm">
									{selectedJourney.summary}
								</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col gap-3">
								{selectedConcepts.map((concept, index) =>
									concept ? (
										<Button
											key={concept.slug}
											variant="outline"
											className="h-auto justify-between py-3"
											render={<Link href={`/concepts/${concept.slug}`} />}
											nativeButton={false}
										>
											<span className="flex min-w-0 items-center gap-3">
												<Badge variant="secondary" className="font-mono">
													{index + 1}
												</Badge>
												<span className="truncate">{concept.title}</span>
											</span>
											<ArrowRight data-icon="inline-end" />
										</Button>
									) : null,
								)}
							</CardContent>
						</Card>

						<Card className="shadow-level-2">
							<CardHeader>
								<CardTitle className="text-display-sm">
									What to watch.
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="flex list-none flex-col gap-2 pl-0 text-body-sm text-muted-foreground">
									{selectedJourney.tips.map((tip) => (
										<li key={tip} className="flex gap-2">
											<span className="text-muted-foreground">•</span>
											<span>{tip}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>

						<Card className="bg-primary text-primary-foreground shadow-level-4">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-display-sm">
									<Terminal />
									Developer probes.
								</CardTitle>
								<CardDescription className="text-primary-foreground/70">
									Useful terminal checks for this journey.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col gap-3 overflow-x-auto rounded-md border border-primary-foreground/10 bg-primary p-4 text-code">
									<div className="flex justify-between gap-4 border-b border-primary-foreground/10 pb-2 text-primary-foreground/50">
										<span>Terminal</span>
										<span>bash</span>
									</div>
									<div className="flex flex-col gap-1">
										{selectedJourney.terminal.map((command) => (
											<p key={command}>$ {command}</p>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
