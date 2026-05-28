"use client";

import {
	ArrowLeft,
	ArrowRight,
	Bookmark,
	BookOpen,
	CheckCircle2,
	Code,
	Info,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { DiagramRenderer } from "@/components/diagram/DiagramRenderer";
import { conceptContent } from "@/data/conceptContent";
import { concepts } from "@/data/concepts";
import { getDiagramForConcept } from "@/data/diagrams";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/store/useProgressStore";

export default function ConceptPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = use(params);
	const [currentStep, setCurrentStep] = useState(0);
	const [viewMode, setViewMode] = useState<"beginner" | "developer">(
		"beginner",
	);

	const {
		completedConcepts,
		bookmarkedConcepts,
		toggleCompletion,
		toggleBookmark,
	} = useProgressStore();

	const concept = concepts.find((c) => c.slug === slug);

	// Reset step when navigating to a new concept
	useEffect(() => {
		setCurrentStep(0);
	}, []);

	if (!concept) return notFound();

	const diagram = getDiagramForConcept(slug);
	const content = conceptContent[slug];
	const isCompleted = completedConcepts.includes(concept.id);
	const isBookmarked = bookmarkedConcepts.includes(concept.id);

	const currentIndex = concepts.findIndex((c) => c.id === concept.id);
	const prevConcept = currentIndex > 0 ? concepts[currentIndex - 1] : null;
	const nextConcept =
		currentIndex < concepts.length - 1 ? concepts[currentIndex + 1] : null;

	return (
		<div className="flex flex-col h-full bg-cream">
			{/* Header */}
			<header className="flex-none p-8 lg:px-12 border-b border-border-subtle bg-cream z-10">
				<div className="flex justify-between items-start">
					<div>
						<div className="flex items-center gap-4 mb-2">
							<span className="text-[10px] font-bold text-muted uppercase tracking-widest bg-charcoal/5 px-2 py-0.5 rounded">
								Concept {concept.order}
							</span>
							<h1 className="text-3xl font-semibold tracking-tight text-charcoal">
								{concept.title}
							</h1>
						</div>
						<p className="text-muted leading-relaxed max-w-2xl">
							{concept.summary}
						</p>
					</div>
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={() => toggleBookmark(concept.id)}
							className={cn(
								"p-2.5 border border-charcoal-40 rounded-md transition-all duration-200",
								isBookmarked
									? "bg-charcoal text-off-white btn-inset-shadow"
									: "text-charcoal hover:bg-charcoal/3",
							)}
							title="Bookmark"
						>
							<Bookmark
								className={cn("w-5 h-5", isBookmarked && "fill-current")}
							/>
						</button>
						<button
							type="button"
							onClick={() => toggleCompletion(concept.id)}
							className={cn(
								"flex items-center gap-2 px-5 py-2.5 rounded-md font-medium transition-all duration-200",
								isCompleted
									? "bg-charcoal text-off-white btn-inset-shadow"
									: "border border-charcoal-40 text-charcoal hover:bg-charcoal/3",
							)}
						>
							<CheckCircle2
								className={cn("w-5 h-5", isCompleted && "text-off-white")}
							/>
							{isCompleted ? "Completed" : "Mark Complete"}
						</button>
					</div>
				</div>

				<div className="flex gap-1 mt-8 bg-charcoal/3 p-1 rounded-lg w-fit">
					<button
						type="button"
						onClick={() => setViewMode("beginner")}
						className={cn(
							"flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-all",
							viewMode === "beginner"
								? "bg-cream text-charcoal shadow-sm"
								: "text-muted hover:text-charcoal",
						)}
					>
						<BookOpen className="w-4 h-4" />
						Beginner
					</button>
					<button
						type="button"
						onClick={() => setViewMode("developer")}
						className={cn(
							"flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-all",
							viewMode === "developer"
								? "bg-cream text-charcoal shadow-sm"
								: "text-muted hover:text-charcoal",
						)}
					>
						<Code className="w-4 h-4" />
						Developer
					</button>
				</div>
			</header>

			{/* Main Content Area */}
			<div className="flex-1 p-8 lg:p-12 flex flex-col xl:flex-row gap-12 overflow-hidden">
				{/* Visualizer */}
				<div className="flex-1 xl:w-2/3 h-[500px] xl:h-full min-h-0 relative rounded-2xl border border-border-subtle bg-cream overflow-hidden">
					<DiagramRenderer
						initialNodes={diagram.nodes}
						initialEdges={diagram.edges}
						steps={diagram.steps}
						currentStep={currentStep}
						onStepChange={setCurrentStep}
					/>
				</div>

				{/* Explanation Panel */}
				<div className="w-full xl:w-1/3 xl:h-full overflow-y-auto pr-4 custom-scrollbar space-y-10">
					<section>
						<h3 className="text-xl font-semibold flex items-center gap-2.5 mb-5 text-charcoal">
							<Info className="w-5 h-5 text-charcoal/40" />
							How It Works
						</h3>
						<div
							className={cn(
								"text-charcoal-82 leading-relaxed max-w-none space-y-4",
								viewMode === "developer" ? "text-sm" : "text-base",
							)}
						>
							{viewMode === "beginner" ? (
								<>
									<p>{content?.beginner}</p>
									<p>
										Use the diagram steps to follow the exact handoff: which
										device starts, which connection carries the message, and
										what decision happens before the next hop.
									</p>
								</>
							) : (
								<>
									<div className="font-mono bg-charcoal/3 p-4 rounded-lg border border-border-subtle text-xs mb-6">
										{`// Technical Definition: ${concept.title}`}
										<br />
										Layer:{" "}
										{concept.order <= 4
											? "Link Layer (L2)"
											: concept.order <= 14
												? "Network Layer (L3)"
												: "Transport/App Layer"}
									</div>
									<p>{content?.developer}</p>
									<ul className="space-y-2 list-none pl-0">
										{content?.tips.map((tip) => (
											<li key={tip} className="flex gap-2 items-start">
												<span className="text-charcoal/20 select-none">•</span>{" "}
												{tip}
											</li>
										))}
									</ul>
								</>
							)}
						</div>
					</section>

					<section className="bg-charcoal/3 p-6 rounded-xl border border-border-subtle">
						<h4 className="font-semibold text-charcoal mb-3">
							Tips and Tricks
						</h4>
						<ul className="space-y-2 text-sm text-charcoal-82 leading-relaxed">
							{content?.tips.map((tip) => (
								<li key={tip} className="flex gap-2">
									<span className="text-charcoal/30">•</span>
									<span>{tip}</span>
								</li>
							))}
						</ul>
					</section>

					<section>
						<h4 className="font-semibold flex items-center gap-2.5 mb-4 text-charcoal">
							<Code className="w-5 h-5 text-charcoal/40" />
							Developer Toolbox
						</h4>
						<div className="bg-charcoal text-off-white p-5 rounded-xl font-mono text-[11px] btn-inset-shadow leading-relaxed overflow-x-auto">
							<div className="flex justify-between mb-4 border-b border-off-white/10 pb-2">
								<span className="opacity-50 uppercase tracking-widest text-[9px] font-bold">
									Terminal Output
								</span>
								<span className="opacity-50">bash</span>
							</div>
							<div className="space-y-1">
								<p className="opacity-40"># Investigating {concept.title}</p>
								{content?.terminal.map((command) => (
									<p key={command} className="text-off-white/90">
										$ {command}
									</p>
								))}
								<p className="text-off-white/40 mt-4">
									{/* Diagnostics complete */}
								</p>
							</div>
						</div>
					</section>

					<nav className="pt-10 flex items-center justify-between border-t border-border-subtle pb-12">
						{prevConcept ? (
							<Link
								href={`/concepts/${prevConcept.slug}`}
								className="flex items-center gap-2 text-sm font-medium text-muted hover:text-charcoal transition-colors group"
							>
								<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
								{prevConcept.title}
							</Link>
						) : (
							<div />
						)}
						{nextConcept ? (
							<Link
								href={`/concepts/${nextConcept.slug}`}
								className="flex items-center gap-2 text-sm font-medium text-muted hover:text-charcoal transition-colors group"
							>
								{nextConcept.title}
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</Link>
						) : (
							<div />
						)}
					</nav>
				</div>
			</div>
		</div>
	);
}
