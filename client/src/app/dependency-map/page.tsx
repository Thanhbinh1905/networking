"use client";

import { ArrowRight, GitBranch, Network } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
import { dependencyGroups, dependencyMapDiagram } from "@/data/dependencyMap";

export default function DependencyMapPage() {
	const [currentStep, setCurrentStep] = useState(0);

	return (
		<div className="flex h-full flex-col bg-background">
			<header className="flex-none border-b bg-card px-8 py-6 lg:px-12">
				<div className="flex max-w-4xl flex-col gap-4">
					<div className="flex flex-wrap items-center gap-3">
						<Badge variant="secondary" className="w-fit font-mono">
							Dependency map
						</Badge>
						<Badge variant="outline" className="w-fit font-mono">
							{concepts.length} concepts
						</Badge>
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-display-lg text-foreground">
							See the learning graph.
						</h1>
						<p className="max-w-3xl text-body-md text-muted-foreground">
							Use this map to understand prerequisites, choose the next useful
							lesson, and connect isolated topics into a full networking mental
							model.
						</p>
					</div>
				</div>
			</header>

			<div className="grid min-h-0 flex-1 gap-6 overflow-hidden p-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:p-8">
				<Card className="min-h-[640px] overflow-hidden bg-card p-0 shadow-level-3">
					<DiagramRenderer
						initialNodes={dependencyMapDiagram.nodes}
						initialEdges={dependencyMapDiagram.edges}
						steps={dependencyMapDiagram.steps}
						currentStep={currentStep}
						onStepChange={setCurrentStep}
						slug="concept-dependency-map"
					/>
				</Card>

				<ScrollArea className="min-h-0">
					<div className="flex flex-col gap-5 pr-3 pb-8">
						<Card className="shadow-level-2">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-display-sm">
									<GitBranch className="text-muted-foreground" />
									Reading rule.
								</CardTitle>
								<CardDescription className="text-body-sm">
									An arrow means the target concept is easier to understand
									after the source concept.
								</CardDescription>
							</CardHeader>
						</Card>

						{dependencyGroups.map((group) => (
							<Card key={group.label} className="shadow-level-2">
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-display-sm">
										<Network className="text-muted-foreground" />
										{group.label}
									</CardTitle>
									<CardDescription>
										{group.conceptSlugs.length} related concepts
									</CardDescription>
								</CardHeader>
								<CardContent className="flex flex-col gap-2">
									{group.conceptSlugs.map((slug) => {
										const concept = concepts.find((item) => item.slug === slug);
										if (!concept) return null;

										return (
											<Button
												key={slug}
												variant="outline"
												className="h-auto justify-between py-3"
												render={<Link href={`/concepts/${slug}`} />}
												nativeButton={false}
											>
												<span className="flex min-w-0 items-center gap-3">
													<Badge variant="secondary" className="font-mono">
														{concept.order}
													</Badge>
													<span className="truncate">{concept.title}</span>
												</span>
												<ArrowRight data-icon="inline-end" />
											</Button>
										);
									})}
								</CardContent>
							</Card>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
