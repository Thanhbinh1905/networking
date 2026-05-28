"use client";

import { CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";
import { concepts } from "@/data/concepts";
import { useProgressStore } from "@/store/useProgressStore";

export default function ConceptsPage() {
	const { completedConcepts } = useProgressStore();

	const completedCount = completedConcepts.length;
	const totalConcepts = concepts.length;
	const progressPercentage = Math.round((completedCount / totalConcepts) * 100);

	return (
		<div className="max-w-5xl mx-auto p-12 lg:p-16">
			<div className="mb-12">
				<h1 className="text-5xl font-semibold tracking-[-1.5px] text-charcoal mb-4">
					Networking Concepts
				</h1>
				<p className="text-lg text-muted max-w-2xl leading-relaxed">
					Master networking fundamentals through interactive visual models. A
					deliberate, step-by-step journey through how data actually moves
					across the wire.
				</p>

				<div className="mt-10 bg-cream border border-border-subtle rounded-xl p-6">
					<div className="flex justify-between items-center mb-3">
						<span className="text-sm font-medium text-charcoal/83">
							Learning Progress
						</span>
						<span className="text-xs font-bold text-muted uppercase tracking-wider">
							{completedCount} / {totalConcepts} ({progressPercentage}%)
						</span>
					</div>
					<div className="w-full bg-charcoal/5 rounded-full h-1.5">
						<div
							className="bg-charcoal h-1.5 rounded-full transition-all duration-500"
							style={{ width: `${progressPercentage}%` }}
						></div>
					</div>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{concepts.map((concept) => {
					const isCompleted = completedConcepts.includes(concept.id);

					return (
						<Link
							key={concept.id}
							href={`/concepts/${concept.slug}`}
							className="group block border border-border-subtle rounded-xl p-6 bg-cream hover:border-charcoal/40 transition-all duration-200"
						>
							<div className="flex items-start justify-between mb-4">
								<div className="flex flex-col gap-1">
									<span className="text-[10px] font-bold text-muted uppercase tracking-widest">
										Concept {concept.order}
									</span>
									<h2 className="text-xl font-medium text-charcoal leading-tight">
										{concept.title}
									</h2>
								</div>
								{isCompleted ? (
									<CheckCircle2 className="w-5 h-5 text-charcoal/83" />
								) : (
									<Circle className="w-5 h-5 text-charcoal/10" />
								)}
							</div>
							<p className="text-sm text-muted line-clamp-2 leading-relaxed group-hover:text-charcoal/82 transition-colors">
								{concept.summary}
							</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
